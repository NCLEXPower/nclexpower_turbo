import React, { useMemo } from "react";
import {
  RegistrationSteps,
  RegistrationStepProps,
} from "./RegistrationSteps";
import {
  useActiveSteps,
  useWizardForm,
  WizardFormMap,
} from "core-library/hooks";
import {
  EmailAddressRegistration,
  InformationRegistration,
  AgreementRegistration,
  RegistrationFormType
} from "./content";
import { Stepper } from "core-library/components";

export const useRegisterWizardSteps = () => {
  const steps = useMemo(() => {
    return {
      EnterYourFullName: {
        content: (props) => <InformationRegistration {...props} />,
        nextStep: "EnterYourEmailAndCreateASecurePasswordToRegister",
        previousStep: "EnterYourFullName",
      },
      EnterYourEmailAndCreateASecurePasswordToRegister: {
        content: (props) => <EmailAddressRegistration {...props} />,
        nextStep: "CompleteTheFinalAgreementStep",
        previousStep: "EnterYourFullName",
      },
      CompleteTheFinalAgreementStep: {
        content: (props) => <AgreementRegistration {...props} />,
        previousStep: "EnterYourEmailAndCreateASecurePasswordToRegister",
      },
    } as WizardFormMap<
      Partial<RegistrationSteps>,
      RegistrationFormType,
      RegistrationStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<RegistrationFormType> | undefined,
    values: Partial<RegistrationFormType>
  ): Partial<RegistrationFormType> => ({
    ...prev,
    ...values,
  });

  const { renderStep, reset } = useWizardForm<
    RegistrationSteps,
    RegistrationFormType,
    RegistrationStepProps
  >(steps, formWizardValues, "EnterYourFullName");

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

  return {
    render: (
      <React.Fragment>
        <div className="w-full flex items-start justify-center gap-2">
          <Stepper
            activeStep={activeStep}
            alternativeLabel={false}
            orientation="vertical"
            steps={stepLabels}
            sx={{ width: "100%", px: 0 }}
            labelStyle={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              fontFamily: "PT Sans Narrow"
            }}
            stepContent={
              <React.Fragment>
                {renderStep({ isLoading: false, next, previous, resetStep, reset, values: {} })}
              </React.Fragment>
            }
          />
        </div>
      </React.Fragment>
    ),
  };
};
