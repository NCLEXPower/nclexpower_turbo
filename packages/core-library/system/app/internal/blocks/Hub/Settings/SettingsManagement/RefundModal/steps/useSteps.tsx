import { useMemo } from "react";
import {
  useActiveSteps,
  useWizardForm,
  WizardFormMap,
} from "../../../../../../../../../hooks";
import { RefundModalStepProps, RefundModalTypeSteps } from "./RefundModalTypes";
import { RefundPaymentBlock } from "./contents/RefundPaymentBlock/RefundPaymentBlock";
import { RefundPolicyBlock } from "./contents/RefundPolicyBlock/RefundPolicyBlock";
import { Stepper } from "../../../../../../../../../components";
import { stepperSx } from "../RefundModalStyles";

export const useRefundModalSteps = (closeModal: () => void) => {
  const steps = useMemo(() => {
    return {
      RefundPolicy: {
        previousStep: "RefundPolicy",
        nextStep: "RefundPayment",
        content: (props) => <RefundPolicyBlock {...props} />,
      },
      RefundPayment: {
        previousStep: "RefundPolicy",
        nextStep: "RefundPayment",
        content: (props) => <RefundPaymentBlock {...props} />,
      },
    } as WizardFormMap<Partial<RefundModalTypeSteps>, {}, RefundModalStepProps>;
  }, []);

  const formWizardValues = (prev: {} | undefined, values: {}): {} => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    RefundModalTypeSteps,
    {},
    RefundModalStepProps
  >(steps, formWizardValues, "RefundPolicy");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const { activeStep, next, previous } = useActiveSteps(stepLabels.length);

  return {
    render: (
      <>
        <Stepper
          activeStep={activeStep}
          steps={stepLabels}
          alternativeLabel={false}
          numberIcon
          sx={stepperSx}
        />
        {renderStep({
          next,
          previous,
          closeModal,
        })}
      </>
    ),
  };
};
