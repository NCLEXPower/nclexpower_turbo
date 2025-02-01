import { RegistrationFormType } from "core-library/system";

export type RegistrationSteps =
  | "EnterYourFullName"
  | "EnterYourEmailAndCreateASecurePasswordToRegister"
  | "CompleteTheFinalAgreementStep"

export interface RegistrationStepProps {
  isLoading: boolean;
  next: () => void;
  previous: () => void;
  reset: () => void;
  resetStep: () => void;
  values: Partial<RegistrationFormType>;
}
