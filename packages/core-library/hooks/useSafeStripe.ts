import { useElements, useStripe } from "@stripe/react-stripe-js";

export function useSafeStripe() {
  try {
    const stripe = useStripe();
    const elements = useElements();
    const isStripeReady = !!stripe && !!elements;

    if (!stripe || !elements) {
      throw new Error("Stripe Elements context not found.");
    }
    return { stripe, elements, error: null, isStripeReady };
  } catch (error) {
    return { stripe: null, elements: null, error, isStripeReady: false }; // Return false when there's an error
  }
}
