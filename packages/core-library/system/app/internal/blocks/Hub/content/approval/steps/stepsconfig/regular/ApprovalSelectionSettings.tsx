import { WizardFormMap } from "../../../../../../../../../../hooks";
import ContentReviewerBlock from "../../../blocks/rqc/ContentReviewer/ContentReviewerBlock";
import { CaseStudyApprovalListView } from "../../content/case-study/CaseStudyApprovalListView";
import { RegularApprovalListView } from "../../content/regular/RegularApprovalListView";

export type ApprovalSelectionSettingsSteps =
  | "InitialViewList"
  | "ContentReviewerBlock";

export type CSApprovalSelectionSettingsSteps =
  | "CSInitialViewList"
  | "CSContentReviewerBlock";

export interface ApprovalSelectionStepProps {
  isLoading: boolean;
}

export const ApprovalSelectionTypeStep = {
  InitialViewList: {
    content: (props) => <RegularApprovalListView {...props} />,
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

export const CSApprovalSelectionTypeStep = {
  CSInitialViewList: {
    content: (props) => <CaseStudyApprovalListView {...props} />,
    nextStep: "CSContentReviewerBlock",
  },
  CSContentReviewerBlock: {
    content: (props) => <ContentReviewerBlock {...props} />,
    previousStep: "CSInitialViewList",
  },
} as WizardFormMap<
  Partial<CSApprovalSelectionSettingsSteps>,
  {},
  ApprovalSelectionStepProps
>;
