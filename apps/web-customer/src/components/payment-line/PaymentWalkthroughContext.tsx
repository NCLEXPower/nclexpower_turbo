import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useApi,
  useApiCallback,
  useFormDirtyState,
  useSensitiveInformation,
  useValidateToken,
} from "core-library/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { PaymentTerms, paymentTermsSchema } from "./validation";
import {
  CreatePaymentIntentParams,
  CustomerTokenizeInformations,
  OrderSummaryResponse,
} from "core-library/api/types";
import {
  useAccountId,
  useCheckoutIntent,
  usePaid,
  usePaymentIntentId,
  useSecretClient,
} from "core-library/contexts/auth/hooks";
import {
  useAuthContext,
  useBusinessQueryContext,
  useExecuteToast,
} from "core-library/contexts";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

interface Props {
  publishableKey: string;
}

export interface UsePaymentWizardFormContextValue {
  form: UseFormReturn<PaymentTerms>;
  isDirty: boolean;
  setIsDirty: (values: boolean) => void;
  basicInformation: CustomerTokenizeInformations | undefined;
  orderSummary: OrderSummaryResponse | undefined;
  loading: boolean;
  clientSecret: string | undefined;
  paymentIntentId: string | undefined;
  stripePromise: Promise<Stripe | null> | null;
  execute(params: PaymentExecutionProps): Promise<void>;
}

const PaymentWizardFormContext =
  createContext<UsePaymentWizardFormContextValue>({
    form: {} as UseFormReturn<PaymentTerms>,
    isDirty: false,
    setIsDirty: () => null,
    basicInformation: {} as CustomerTokenizeInformations,
    orderSummary: {} as OrderSummaryResponse,
    loading: false,
    clientSecret: undefined,
    paymentIntentId: undefined,
    stripePromise: null,
    execute: async ({ stripe, elements }) => {
      return;
    },
  });

export interface PaymentExecutionProps {
  stripe: Stripe | null;
  elements: StripeElements;
}

export const usePaymentWalkthroughFormContext = () =>
  useContext(PaymentWizardFormContext);

export const PaymentWizardFormContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, publishableKey }) => {
  const { businessQueryCreatePaymentIntent } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreatePaymentIntent();
  const { customer, loading: coreload } = useSensitiveInformation();
  const { isAuthenticated } = useAuthContext();
  const [accountId] = useAccountId();
  const [, setCheckoutIntent] = useCheckoutIntent();
  const [clientSecret, setClientSecret] = useSecretClient();
  const [paymentIntentId, setPaymentIntentId] = usePaymentIntentId();
  const [, setIsPaid] = usePaid();
  const { tokenValidated, loading: validateLoading } = useValidateToken();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const changePaymentStatusCb = useApiCallback(
    async (api, accountId: string | undefined) =>
      await api.web.changePaymentStatus(accountId)
  );
  const toast = useExecuteToast();
  const form = useForm<PaymentTerms>({
    resolver: yupResolver(paymentTermsSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues: paymentTermsSchema.getDefault(),
  });

  useEffect(() => {
    if (publishableKey) {
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey]);

  const getOrderSummary = useApi((api) => api.web.getOrderSummary(accountId));

  const { isDirty, setIsDirty } = useFormDirtyState(form.formState);

  useEffect(() => {
    async function initializeCreatePaymentIntent() {
      try {
        const order = getOrderSummary.result?.data;
        const params = {
          accountId: accountId,
          amount: order?.price,
          currency: order?.currency,
          pricingId: order?.pricingId,
          productDescription: order?.productDescription,
          productId: order?.productId,
          productName: order?.productName,
          programTitle: order?.programTitle,
        } as CreatePaymentIntentParams;
        const result = await mutateAsync({ ...params });
        setCheckoutIntent(result.data.paymentIntentId);
        setClientSecret(result.data.clientSecret);
        setPaymentIntentId(result.data.paymentIntentId);
      } catch (error) {
        console.error(
          `Something went wrong while creating payment intent: ${error}`
        );
        return;
      }
    }
    if (
      !isAuthenticated ||
      typeof paymentIntentId !== "undefined" ||
      typeof clientSecret !== "undefined"
    )
      return;
    initializeCreatePaymentIntent();
  }, [
    paymentIntentId,
    clientSecret,
    getOrderSummary.result?.data,
    isAuthenticated,
  ]);

  async function executeChangePaymentStatus(params: PaymentExecutionProps) {
    try {
      const result = await changePaymentStatusCb.execute(accountId);
      if (result.status === 200) {
        await executePayment({ ...params });
      }
    } catch (error) {}
  }

  async function executePayment(params: PaymentExecutionProps) {
    try {
      const { stripe, elements } = params;
      if (!stripe || !elements) return;
      if (tokenValidated) {
        setIsPaid(true);
        // create another API to insert the page url in open pages with 1 authorization and [Authorized] Annotation.
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/hub`,
            payment_method_data: {
              billing_details: {
                email: customer?.email,
                name: customer?.firstname,
              },
            },
          },
        });

        if (error) {
          // create another API call to count payment failed -> more than 3 then -> logout
          toast.showToast("Payment failed. Please try again.", "error");
          return;
        }
      }
    } catch (error) {
      console.error(
        `Something went wrong while payment is processing. ${error}`
      );
      toast.showToast(
        `Something went wrong while payment is processing.`,
        "error"
      );
      return;
    }
  }

  return (
    <FormProvider {...form}>
      <PaymentWizardFormContext.Provider
        value={useMemo(
          () => ({
            form,
            isDirty,
            setIsDirty,
            basicInformation: customer,
            orderSummary: getOrderSummary.result?.data,
            loading:
              getOrderSummary.loading ||
              coreload ||
              isLoading ||
              validateLoading ||
              changePaymentStatusCb.loading,
            clientSecret,
            paymentIntentId,
            stripePromise,
            execute: executeChangePaymentStatus,
          }),
          [
            form,
            isDirty,
            form.watch("IsAgree"),
            customer,
            getOrderSummary.result?.data,
            getOrderSummary.loading,
            coreload,
            clientSecret,
            paymentIntentId,
            publishableKey,
            stripePromise,
          ]
        )}
      >
        {stripePromise && clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, loader: "auto" }}
          >
            {children}
          </Elements>
        ) : (
          <>{children}</>
        )}
      </PaymentWizardFormContext.Provider>
    </FormProvider>
  );
};
