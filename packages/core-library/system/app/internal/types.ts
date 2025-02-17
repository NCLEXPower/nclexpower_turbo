/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ReactNode } from "react";
import { DashboardCardType } from "./blocks/Hub/types";
import {
  ContainedCaseStudyQuestionType,
  DNDAnswersType,
} from "./blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import {
  DNDAnswerOptionType,
  HCPNAnswerOptionType,
} from "./blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";
import { SsrTypes } from "../../../types/global";

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
  | "AnnouncementManagementBlock"
  | "ComingSoonManagementBlock"
  | "CaseNameManagementBlock";

type BlockProps = {
  LoginFormBlock: {};
  HubOverviewBlock: { cards: DashboardCardType[] };
  SettingsBlock: { fileRoutes: string[] };
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
  InclusionBlock: { data: SsrTypes };
  DuplicateSessionBlock: {};
  ChatbotManagement: {};
  ContactUsManagementBlock: {};
  SalesManagement: {};
  AnnouncementManagementBlock: {};
  ComingSoonManagementBlock: {};
  CaseNameManagementBlock: {};
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

export type TablePropType = {
  ColumnField: MCQColumnType[];
  RowField: MCQRowType[];
  rowIndex?: number;
  questionIndex: number;
};

export type MCQChoiceType = {
  value: boolean;
  choiceId?: number;
};

export type MCQRowType = {
  rowId?: number;
  rowTitle: string;
  choices: MCQChoiceType[];
};

export type MCQColumnType = {
  label: string;
};

export type BowtieItemType = {
  value: string;
  container: string;
  isAnswer: boolean;
};

export type Columns = {
  label: string;
};

export type Row = {
  rowId: number;
  rowTitle: string;
  choices: {
    choiceId: number;
    value: boolean;
  }[];
};

export type QuestionnaireItem = {
  [x: string]: any;
  maxPoints: number;
  seqNum: number;
  questionType:
    | "DDC"
    | "SATA"
    | "MRSN"
    | "DDT"
    | "BOWTIE"
    | "MCQGROUP"
    | "HCP"
    | "MCQNOGROUP"
    | "DND";
  itemNum: number;
  itemStem: string;
  transitionHeader: string;
  maxAnswer: number | undefined;
  leftLabelName: string | undefined;
  centerLabelName: string | undefined;
  rightLabelName: string | undefined;
  rightSection: BowtieItemType[] | undefined;
  centerSection: BowtieItemType[] | undefined;
  leftSection: BowtieItemType[] | undefined;
  column?: Columns[];
  row?: Row[];
  dndAnswer: DNDAnswersType[] | undefined;
  hcpContent: string | undefined;
  answers:
    | DDClozeTableAnswerOption[]
    | HCPNAnswerOptionType[]
    | DNDAnswerOptionType[];
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
