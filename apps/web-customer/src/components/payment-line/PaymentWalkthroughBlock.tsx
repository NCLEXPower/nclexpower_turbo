import { useDesignVisibility } from "core-library/hooks";
import { PaymentWalkthroughForm } from "./PaymentWalkthroughForm";
import { PaymentWizardFormContextProvider } from "./PaymentWalkthroughContext";
import { useStripeConfig } from "core-library";

export const PaymentWalkthroughBlock = () => {
  useDesignVisibility();
  const { publishableKey } = useStripeConfig();

  return (
    <PaymentWizardFormContextProvider publishableKey={publishableKey}>
      <PaymentWalkthroughForm />
    </PaymentWizardFormContextProvider>
  );
};
