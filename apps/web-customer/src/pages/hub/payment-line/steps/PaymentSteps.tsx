import { WizardFormMap } from "core-library/hooks";
import { BasicInformation } from "./content";

export type PaymentFormSteps = "BasicInformation";

export type PaymentManagementSteps =
  | PaymentFormSteps
  | "ProductInformation"
  | "StripePayment";

export interface PaymentMangementStepProps {
  isLoading: boolean;
}

export const PaymentSettingsTypeStep = {
  BasicInformation: {
    content: (props) => <BasicInformation {...props} />,
    nextStep: "BasicInformation",
  },
} as WizardFormMap<
  Partial<PaymentManagementSteps>,
  {},
  PaymentMangementStepProps
>;
