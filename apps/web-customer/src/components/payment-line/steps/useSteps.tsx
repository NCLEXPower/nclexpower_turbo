import React, { useMemo } from "react";
import {
  PaymentManagementSteps,
  PaymentMangementStepProps,
} from "./PaymentSteps";
import {
  useActiveSteps,
  useResolution,
  useWizardForm,
  WizardFormMap,
} from "core-library/hooks";
import { MobileStepper, ProgressStepper } from "core-library/components";
import {
  CreditCard as CreditCardIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Troubleshoot as TroubleshootIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FileOpenOutlined as FileOpenOutlinedIcon,
} from "@mui/icons-material";
import {
  BasicInformation,
  ProductInformation,
  StripePaymentPage,
  TermsCondition,
  WelcomePage,
} from "./content";
import { PaymentTerms } from "../validation";

export const usePaymentWizardSteps = (onSubmit: VoidFunction) => {
  const { isMobile } = useResolution();

  const steps = useMemo(() => {
    return {
      BasicInformation: {
        content: (props) => <BasicInformation {...props} />,
        nextStep: "ProductInformation",
      },
      ProductInformation: {
        content: (props) => <ProductInformation {...props} />,
        nextStep: "TermsCondition",
        previousStep: "BasicInformation",
      },
      TermsCondition: {
        content: (props) => <TermsCondition onSave={onSubmit} {...props} />,
        nextStep: "StripePayment",
        previousStep: "ProductInformation",
      },
      StripePayment: {
        content: (props) => <StripePaymentPage {...props} />,
        nextStep: "WelcomePage",
        previousStep: "TermsCondition",
      },
      WelcomePage: {
        content: (props) => <WelcomePage {...props} />,
        previousStep: "StripePayment",
      },
    } as WizardFormMap<
      Partial<PaymentManagementSteps>,
      PaymentTerms,
      PaymentMangementStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<PaymentTerms> | undefined,
    values: Partial<PaymentTerms>
  ): Partial<PaymentTerms> => ({
    ...prev,
    ...values,
    IsAgree: prev?.IsAgree || values.IsAgree,
  });

  const { renderStep, reset } = useWizardForm<
    PaymentManagementSteps,
    PaymentTerms,
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
        return <CreditCardIcon key={index} />;
      case "WelcomePage":
        return <CheckCircleOutlineIcon key={index} />;
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
        ) : (
          <ProgressStepper
            steps={stepLabels}
            activeStep={activeStep}
            onStepChange={next}
            icons={icons}
          />
        )}
        {renderStep({ isLoading: false, next, previous, resetStep, reset })}
      </div>
    ),
  };
};
