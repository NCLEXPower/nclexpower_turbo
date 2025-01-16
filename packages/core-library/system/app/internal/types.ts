/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ReactNode } from "react";
import { DashboardCardType } from "./blocks/Hub/types";

export type Blocks =
  | "LoginFormBlock"
  | "HubOverviewBlock"
  | "SettingsBlock"
  | "QuestionApprovalBlock"
  | "EmailVerificationBlock"
  | "PasswordChangeBlock"
  | "ViewUserBlock"
  | "InternalUsersBlock"
  | "CreatePricingBlock"
  | "CreateProductBlock"
  | "QuestionManagementPageBlock"
  | "ReportedIssuesBlock"
  | "CreateRegularQuestionTypeBlock"
  | "CreateCategoryBlock"
  | "InclusionBlock"
  | "DuplicateSessionBlock"
  | "ChatbotManagement"
  | "ContactUsManagementBlock"
  | "SalesManagement"
  | "AnnouncementManagementBlock";

type BlockProps = {
  LoginFormBlock: {};
  HubOverviewBlock: { cards: DashboardCardType[] };
  SettingsBlock: {};
  QuestionApprovalBlock: {};
  EmailVerificationBlock: {};
  PasswordChangeBlock: {};
  ViewUserBlock: {};
  InternalUsersBlock: {};
  CreatePricingBlock: {};
  CreateProductBlock: {};
  QuestionManagementPageBlock: {};
  ReportedIssuesBlock: {};
  CreateRegularQuestionTypeBlock: {};
  CreateCategoryBlock: {};
  InclusionBlock: {};
  DuplicateSessionBlock: {};
  ChatbotManagement: {};
  ContactUsManagementBlock: {};
  SalesManagement: {};
  AnnouncementManagementBlock: {};
};

export type ParseBlocksProps<B extends Blocks = Blocks> = {
  blocks: B;
} & BlockProps[B];

export interface SectionContent {
  seqNum: number;
  seqContent: string;
}

export interface CaseStudyData {
  nurseNotes: SectionContent[];
  hxPhy: SectionContent[];
  labs: SectionContent[];
  orders: SectionContent[];
}

export type SectionKey = keyof CaseStudyData;

export type AnswerOption = {
  answer: string;
  answerKey: boolean;
};

export interface DDClozeTableAnswerOption extends AnswerOption {
  optionName: string;
  options: {
    answer: string;
    answerKey: boolean;
  }[];
}

export type BowtieItemType = {
  value: string;
  container: string;
  isAnswer: boolean;
};

export type QuestionnaireItem = {
  [x: string]: any;
  maxPoints: number;
  seqNum: number;
  questionType: "DDC" | "SATA" | "MRSN" | "DDT"| "BOWTIE";
  itemNum: number;
  itemStem: string;
  transitionHeader: string;
  maxAnswer: number | undefined;
  answers: DDClozeTableAnswerOption[];
  leftLabelName: string | undefined;
  centerLabelName: string | undefined;
  rightLabelName: string | undefined;
  rightSection: BowtieItemType[] | undefined;
  centerSection: BowtieItemType[] | undefined;
  leftSection: BowtieItemType[] | undefined;
};

export type CaseStudyDataType = {
  nurseNotes: SectionContent[];
  hxPhy: SectionContent[];
  labs: SectionContent[];
  orders: SectionContent[];
  questionnaires: QuestionnaireItem[];
};

export type EnvironmentFormType = {
  [key: string]: string;
};
