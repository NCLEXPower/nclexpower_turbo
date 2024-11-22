import React, { useMemo } from "react";
import {
  PaymentManagementSteps,
  PaymentMangementStepProps,
  PaymentSettingsTypeStep,
} from "./PaymentSteps";
import { useWizardForm, WizardFormMap } from "core-library/hooks";

export const usePaymentWizardSteps = () => {
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

  const { renderStep } = useWizardForm<
    PaymentManagementSteps,
    {},
    PaymentMangementStepProps
  >(steps, formWizardValues, "BasicInformation");

  return {
    renderStep,
    steps,
  };
};
