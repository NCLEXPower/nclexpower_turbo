import { useMemo } from "react";
import {
  useActiveSteps,
  useWizardForm,
  WizardFormMap,
} from "../../../../../../../../../hooks";
import { RefundModalStepProps, RefundModalTypeSteps } from "./RefundModalTypes";
import { RefundPaymentBlock } from "./contents/RefundPaymentBlock";
import { RefundPolicyBlock } from "./contents/RefundPolicyBlock";
import { Stepper } from "../../../../../../../../../components";

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

  const formWizardValues = (
    prev: Partial<{}> | undefined,
    values: Partial<{}>
  ): Partial<{}> => ({
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
          sx={{
            marginX: "auto",
            gap: "10px",
            paddingX: "20px",
            paddingBottom: "40px",
            justifyContent: "center",

            "& .MuiBox-root:has(.MuiTypography-root)": {
              width: "unset",
            },

            "& .MuiStepConnector-root": {
              width: "100%",
              maxWidth: "120px",
            },

            "& .MuiTypography-root": {
              fontSize: "clamp(12px,2vw,20px)",
            },
          }}
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
