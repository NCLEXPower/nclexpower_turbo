import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CreatePaymentIntentParams } from "../../api/types";
import { useBusinessQueryContext } from "../BusinessQuery";
import {
  useCheckoutIntent,
  useOrderNumber,
  usePaymentIntentId,
  useSecretClient,
} from "../auth/hooks";

interface Props {
  publishableKey: string;
}

const context = createContext<{
  stripePromise: Promise<Stripe | null> | null;
  clientSecret: string | undefined;
  paymentIntentId: string | undefined;
  isLoading: boolean;
  orderNumber: string | undefined;
  createPaymentIntentWithClientSecret(
    params: CreatePaymentIntentParams
  ): Promise<void>;
  getOrderNumber(): Promise<void>;
}>({} as any);

export const useStripeContext = () => {
  if (!context) {
    throw new Error("StripeContextProvider should be used.");
  }
  return useContext(context);
};

export const StripeContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ publishableKey, children }) => {
  const { businessQueryCreatePaymentIntent, businessQueryGetOrderNumber } =
    useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreatePaymentIntent();
  const [, setCheckoutIntent] = useCheckoutIntent();
  const {
    data: dataOrderNumber,
    refetch: refetchOrderNumber,
    isLoading: orderNumberLoading,
  } = businessQueryGetOrderNumber(["getOrderNumber"]);
  const [clientSecret, setClientSecret] = useSecretClient();
  const [paymentIntentId, setPaymentIntentId] = usePaymentIntentId();
  const [orderNumber, setOrderNumber] = useOrderNumber();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    if (publishableKey) {
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey]);

  async function createPaymentIntentWithClientSecret(
    params: CreatePaymentIntentParams
  ) {
    const result = await mutateAsync({ ...params });
    setCheckoutIntent(result.data.paymentIntentId);
    setClientSecret(result.data.clientSecret);
    setPaymentIntentId(result.data.paymentIntentId);
  }

  async function getOrderNumber() {
    if (!orderNumber) {
      await refetchOrderNumber();
    }
  }

  useEffect(() => {
    if (typeof dataOrderNumber === "undefined") return;
    setOrderNumber(dataOrderNumber);
  }, [dataOrderNumber]);

  const values = useMemo(
    () => ({
      stripePromise,
      clientSecret,
      paymentIntentId,
      getOrderNumber,
      createPaymentIntentWithClientSecret,
      orderNumber,
      isLoading: orderNumberLoading || isLoading,
    }),
    [
      clientSecret,
      paymentIntentId,
      stripePromise,
      publishableKey,
      orderNumber,
      isLoading,
      orderNumberLoading,
    ]
  );

  return (
    <context.Provider value={values}>
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
    </context.Provider>
  );
};
