import React from "react";
import { WizardFormMap } from "../../../../../../../../../../hooks";
import ContentReviewerBlock from "../../../blocks/rqc/ContentReviewer/ContentReviewerBlock";
import { ApprovalListViewBlock } from "../../content/regular/ApprovalListViewBlock";

export type ApprovalSelectionSettingsSteps =
  | "InitialViewList"
  | "ContentReviewerBlock";

export interface ApprovalSelectionStepProps {
  isLoading: boolean;
}

export const ApprovalSelectionTypeStep = {
  InitialViewList: {
    content: (props) => <ApprovalListViewBlock {...props} />,
    nextStep: "ContentReviewerBlock",
  },
  ContentReviewerBlock: {
    content: (props) => <ContentReviewerBlock {...props} />,
    previousStep: "InitialViewList",
  },
} as WizardFormMap<
  Partial<ApprovalSelectionSettingsSteps>,
  {},
  ApprovalSelectionStepProps
>;
