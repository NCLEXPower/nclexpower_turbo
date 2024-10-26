import withAuth from "../../../core/utils/withAuth";
import {
  HubBlock,
  LoginFormBlock,
  SettingsManagementPageBlock,
  QuestionApprovalBlock,
  EmailVerificationBlock,
  PasswordChangeBlock,
  InternalUsersBlock,
  ViewUserBlock,
  CreatePricingBlock,
  CreateProductBlock,
  QuestionManagementPageBlock,
  ReportedIssuesBlock,
  CreateCategoryBlock,
  CreateRegularQuestionTypeBlock,
  InclusionBlock,
  ChatbotManagementBlock
} from "./blocks";

import { ParseBlocksProps } from "./types";

const ParseBlocks: React.FC<ParseBlocksProps> = (props) => {
  const { blocks } = props;

  switch (blocks) {
    case "LoginFormBlock":
      return <LoginFormBlock />;
    case "HubOverviewBlock":
      const { cards } = props as ParseBlocksProps<"HubOverviewBlock">;
      return <HubBlock cards={cards} />;
    case "SettingsBlock":
      return <SettingsManagementPageBlock />;
    case "QuestionApprovalBlock":
      return <QuestionApprovalBlock />;
    case "EmailVerificationBlock":
      return <EmailVerificationBlock />;
    case "PasswordChangeBlock":
      return <PasswordChangeBlock />;
    case "ViewUserBlock":
      return <ViewUserBlock />;
    case "InternalUsersBlock":
      return <InternalUsersBlock />;
    case "CreatePricingBlock":
      return <CreatePricingBlock />;
    case "CreateProductBlock":
      return <CreateProductBlock />;
    case "QuestionManagementPageBlock":
      return <QuestionManagementPageBlock />;
    case "ReportedIssuesBlock":
      return <ReportedIssuesBlock />;
    case "CreateRegularQuestionTypeBlock":
      return <CreateRegularQuestionTypeBlock />;
    case "CreateCategoryBlock":
      return <CreateCategoryBlock />;
    case "InclusionBlock":
      return <InclusionBlock />;
    case "ChatbotManagement":
      return <ChatbotManagementBlock />;
    default:
      return null;
  }
};

export default withAuth(ParseBlocks);
