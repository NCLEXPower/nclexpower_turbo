import React, { useMemo } from "react";
import {
  PaymentManagementSteps,
  PaymentMangementStepProps,
  PaymentSettingsTypeStep,
} from "./PaymentSteps";
import { useActiveSteps, useResolution, useWizardForm, WizardFormMap } from "core-library/hooks";
import { MobileStepper, ProgressStepper } from "core-library/components";
import {
  CreditCard as CreditCardIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Troubleshoot as TroubleshootIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FileOpenOutlined as FileOpenOutlinedIcon,
} from '@mui/icons-material';

export const usePaymentWizardSteps = () => {
  const { isMobile } = useResolution();

  const steps = useMemo(() => {
    return {
      ...PaymentSettingsTypeStep,
    } as WizardFormMap<
      Partial<PaymentManagementSteps>,
      {},
      PaymentMangementStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<{}> | undefined,
    values: Partial<{}>
  ): Partial<{}> => ({});

  const { renderStep, reset } = useWizardForm<
    PaymentManagementSteps,
    {},
    PaymentMangementStepProps
  >(steps, formWizardValues, "BasicInformation");

  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  const {
    activeStep,
    next,
    previous,
    reset: resetStep,
  } = useActiveSteps(stepLabels.length);

  const icons = stepKeys.map((step, index) => {
    switch (step) {
      case "BasicInformation":
        return <FileOpenOutlinedIcon key={index} />;
      case "ProductInformation":
        return <ShoppingCartOutlinedIcon key={index} />;
      case "TermsCondition":
        return <TroubleshootIcon key={index} />;
      case "StripePayment":
        return (
          <CreditCardIcon key={index} />
        );
      case "WelcomePage":
        return (
          <CheckCircleOutlineIcon key={index} />
        );
      default:
        return null;
    }
  });

  return {
    render: (
      <div className="w-full h-full flex items-center justify-center flex-col">
        {!isMobile ? (
          <MobileStepper
            steps={stepLabels}
            activeStep={activeStep}
            onStepChange={next}
            icons={icons}
          />
        ) : <ProgressStepper
          steps={stepLabels}
          activeStep={activeStep}
          onStepChange={next}
          icons={icons}
        />}
        {renderStep({ isLoading: false, next, previous, resetStep, reset })}
      </div>
    ),
  };
};
