export type RefundModalTypeSteps = "RefundPolicy" | "RefundPayment";

export interface RefundModalStepProps {
  next: () => void;
  previous: () => void;
  closeModal: () => void;
}
