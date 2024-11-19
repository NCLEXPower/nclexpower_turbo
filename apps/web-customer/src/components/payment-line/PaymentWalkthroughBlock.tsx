import { useDesignVisibility } from "core-library/hooks";
import { PaymentWalkthroughForm } from "./PaymentWalkthroughForm";

export const PaymentWalkthroughBlock = () => {
  useDesignVisibility();

  return <PaymentWalkthroughForm />;
};
