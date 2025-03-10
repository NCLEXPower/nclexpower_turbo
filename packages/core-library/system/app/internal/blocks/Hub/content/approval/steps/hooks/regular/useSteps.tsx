import React, { useMemo } from "react";
import { WizardFormMap } from "../../../../../../../../../../hooks";
import {
  ApprovalSelectionSettingsSteps,
  ApprovalSelectionStepProps,
  ApprovalSelectionTypeStep,
  CSApprovalSelectionSettingsSteps,
  CSApprovalSelectionTypeStep,
} from "../../stepsconfig/regular/ApprovalSelectionSettings";

export const useApprovalSelectionWizardSteps = () => {
  return useMemo(() => {
    return {
      ...ApprovalSelectionTypeStep,
    } as WizardFormMap<
      Partial<ApprovalSelectionSettingsSteps>,
      {},
      ApprovalSelectionStepProps
    >;
  }, []);
};

export const useCSApprovalSelectionWizardSteps = () => {
  return useMemo(() => {
    return {
      ...CSApprovalSelectionTypeStep,
    } as WizardFormMap<
      Partial<CSApprovalSelectionSettingsSteps>,
      {},
      ApprovalSelectionStepProps
    >;
  }, []);
};
