"use client";
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
  useCountryFromIp,
  useFormDirtyState,
} from "core-library/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { PaymentTerms, paymentTermsSchema } from "./validation";
import {
  AccountReferenceResponse,
  CreatePaymentIntentParams,
  OrderSummaryResponse,
} from "core-library/api/types";
import {
  useAccountReference,
  useCheckoutIntent,
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
import { useRouter } from "core-library";
import { config } from "core-library/config";

interface Props {
  publishableKey: string;
}

export interface UsePaymentWizardFormContextValue {
  form: UseFormReturn<PaymentTerms>;
  isDirty: boolean;
  setIsDirty: (values: boolean) => void;
  basicInformation: AccountReferenceResponse["customerInfo"] | undefined;
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
    basicInformation: {} as AccountReferenceResponse["customerInfo"],
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
  const { isAuthenticated } = useAuthContext();
  const [reference] = useAccountReference();
  const [, setCheckoutIntent] = useCheckoutIntent();
  const [clientSecret, setClientSecret] = useSecretClient();
  const [paymentIntentId, setPaymentIntentId] = usePaymentIntentId();
  const { geoData } = useCountryFromIp(config.value.APIIPKEY);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const changePaymentStatusCb = useApiCallback(
    async (api, accountId: string | undefined) =>
      await api.web.changePaymentStatus(accountId)
  );

  const getOrderSummary = useApi((api) => api.web.getOrderSummary(reference));

  const accountReference = useApi((api) =>
    api.auth.accountReference(reference)
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

  const { isDirty, setIsDirty } = useFormDirtyState(form.formState);

  useEffect(() => {
    async function initializeCreatePaymentIntent() {
      try {
        const order = getOrderSummary.result?.data;
        const params = {
          amount: order?.price,
          currency: order?.currency,
          pricingId: order?.pricingId,
          productDescription: order?.productDescription,
          productId: order?.productId,
          productName: order?.productName,
          programTitle: order?.programTitle,
        } as CreatePaymentIntentParams;
        const result = await mutateAsync({ ...params });
        console.log("result", result);
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
    geoData,
  ]);

  async function executeChangePaymentStatus() {
    try {
      // const result = await changePaymentStatusCb.execute(accountId);
    } catch (error) {}
  }

  async function executePayment(params: PaymentExecutionProps) {
    try {
      const { stripe, elements } = params;
      if (!stripe || !elements || !isAuthenticated) return;
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/hub`,
          payment_method_data: {
            billing_details: {
              email: accountReference.result?.data.customerInfo.email,
              name: accountReference.result?.data.customerInfo.firstname,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        toast.showToast("Payment failed. Please try again.", "error");
        return;
      } else {
        await executeChangePaymentStatus();
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
            basicInformation: accountReference.result?.data.customerInfo,
            orderSummary: getOrderSummary.result?.data,
            loading:
              getOrderSummary.loading ||
              isLoading ||
              changePaymentStatusCb.loading ||
              accountReference.loading,
            clientSecret,
            paymentIntentId,
            stripePromise,
            execute: executePayment,
          }),
          [
            form,
            isDirty,
            form.watch("IsAgree"),
            accountReference.result?.data,
            getOrderSummary.result?.data,
            getOrderSummary.loading,
            clientSecret,
            paymentIntentId,
            publishableKey,
            stripePromise,
            changePaymentStatusCb.loading,
            isLoading,
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
