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
