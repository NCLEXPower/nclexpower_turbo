/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
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
  DuplicateSessionBlock,
  ChatbotManagementBlock,
  ContactUsManagementBlock,
  SalesManagementBlock,
  AnnouncementManagementBlock,
  ComingSoonManagementBlock,
  CaseNameManagementBlock,
} from "./blocks";

import { ParseBlocksProps } from "./types";

const ParseBlocks: React.FC<ParseBlocksProps> = (props) => {
  const { blocks } = props;

  switch (blocks) {
    case "LoginFormBlock":
      return <LoginFormBlock />;
    case "HubOverviewBlock":
      return <HubBlock />;
    case "SettingsBlock":
      const { fileRoutes } = props as ParseBlocksProps<"SettingsBlock">;
      return <SettingsManagementPageBlock fileRoutes={fileRoutes} />;
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
      const { data } = props as ParseBlocksProps<"InclusionBlock">;
      return <InclusionBlock data={data} />;
    case "DuplicateSessionBlock":
      return <DuplicateSessionBlock />;
    case "ChatbotManagement":
      return <ChatbotManagementBlock />;
    case "ContactUsManagementBlock":
      return <ContactUsManagementBlock />;
    case "SalesManagement":
      return <SalesManagementBlock />;
    case "AnnouncementManagementBlock":
      return <AnnouncementManagementBlock />;
    case "ComingSoonManagementBlock":
      return <ComingSoonManagementBlock />;
    case "CaseNameManagementBlock":
      return <CaseNameManagementBlock />;
    default:
      return null;
  }
};

export default ParseBlocks;
