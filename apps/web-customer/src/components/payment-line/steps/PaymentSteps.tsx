import { WizardFormMap } from "core-library/hooks";
import {
  BasicInformation,
  ProductInformation,
  TermsCondition,
  WelcomePage,
  StripePaymentPage
} from "./content";

export type PaymentFormSteps = "BasicInformation";

export type PaymentManagementSteps =
  | PaymentFormSteps
  | "ProductInformation"
  | "TermsCondition"
  | "StripePayment"
  | "WelcomePage";

export interface PaymentMangementStepProps {
  isLoading: boolean;
  next: () => void;
  previous: () => void;
  reset: () => void;
  resetStep: () => void;
}

export const PaymentSettingsTypeStep = {
  BasicInformation: {
    content: (props) => <BasicInformation {...props} />,
    nextStep: "ProductInformation",
  },
  ProductInformation: {
    content: (props) => <ProductInformation {...props} />,
    nextStep: "TermsCondition",
    previousStep: "BasicInformation"
  },
  TermsCondition: {
    content: (props) => <TermsCondition {...props} />,
    nextStep: "StripePayment",
    previousStep: "ProductInformation"
  },
  StripePayment: {
    content: (props) => <StripePaymentPage {...props} />,
    nextStep: "WelcomePage",
    previousStep: "TermsCondition"
  },
  WelcomePage: {
    content: (props) => <WelcomePage {...props} />,
    previousStep: "StripePayment"
  }
} as WizardFormMap<
  Partial<PaymentManagementSteps>,
  {},
  PaymentMangementStepProps
>;
