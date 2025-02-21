import React from "react";
import { useWizardForm } from "../../../../../../../../../hooks";
import {
  useApprovalSelectionWizardSteps,
  useCSApprovalSelectionWizardSteps,
} from "../../steps/hooks/regular/useSteps";
import {
  ApprovalSelectionStepProps,
  CSApprovalSelectionSettingsSteps,
} from "../../steps/stepsconfig/regular/ApprovalSelectionSettings";

export const CSQuestionContentsBlock: React.FC = () => {
  const steps = useCSApprovalSelectionWizardSteps();

  const formWizardValues = (
    prev: Partial<{}> | undefined,
    values: Partial<{}>
  ): Partial<{}> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    CSApprovalSelectionSettingsSteps,
    {},
    ApprovalSelectionStepProps
  >(steps, formWizardValues, "CSInitialViewList");

  return <React.Fragment>{renderStep({ isLoading: false })}</React.Fragment>;
};
