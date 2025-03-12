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
import { useMediaQuery } from "@mui/material";

export const useRegisterWizardSteps = () => {

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery('(max-width:1024px)');

  const steps = useMemo(() => {
    return {
      EnterYourFullName: {
        content: (props) => <InformationRegistration {...props} />,
        nextStep: "EnterYourEmailAndCreateASecurePasswordToRegister",
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
            sx={{
              width: "100%", px: 0,
              "& .MuiGrid-root label": {
                fontSize: {
                  xs: "clamp(1px, 3.72092vw, 16px)",
                  md: "clamp(1px,1.36852vw,36px)",
                  lg: "clamp(1px, 0.9375vw, 36px)"
                }
              },
              "& .css-1x0yzl6": {
                width: {
                  xs: "clamp(1px,3.49vw,15px)",
                  md: "clamp(1px,1.565vw,40px)",
                  lg: "clamp(1px,1.042vw,40px)"
                },
                height: {
                  xs: "clamp(1px,3.49vw,15px)",
                  md: "clamp(1px,1.565vw,40px)",
                  lg: "clamp(1px,1.042vw,40px)"
                }
              },
              "& .MuiStepContent-root": {
                marginLeft: {
                  xs: "clamp(1px,1.744185vw,20px)",
                  sm: "clamp(1px,0.520834vw,20px)"
                },
                paddingLeft: {
                  sm: "clamp(1px,1.041665vw,40px)"
                }
              },
              "& .MuiStepConnector-root": {
                marginLeft: {
                  xs: "clamp(1px,1.744185vw,20px)",
                  sm: "clamp(1px,0.520834vw,20px)"
                },
              }
            }}
            labelStyle={{
              fontSize: isMobile
                ? 'clamp(1px, 4.18604vw, 18px)'
                : isTablet
                  ? 'clamp(1px, 1.56403vw, 40px)'
                  : 'clamp(1px, 1.041665vw, 40px)'
              ,
              fontWeight: "bold",
              fontFamily: "PT Sans",
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
