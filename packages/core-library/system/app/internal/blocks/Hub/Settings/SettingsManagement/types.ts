/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import * as yup from "yup";
import {
  uploadFormSchema,
  settingsSelectionSchema,
  setDefaultReviewerSchema,
} from "./validation";

export type SectionType = "leftSection" | "centerSection" | "rightSection";

export type UploadFormType = yup.InferType<ReturnType<typeof uploadFormSchema>>;
export type SettingsSelectionType = yup.InferType<
  typeof settingsSelectionSchema
>;
export type SetDefaultReviewerType = yup.InferType<
  typeof setDefaultReviewerSchema
>;
export type ChooseSettingsOptions =
  | "CONFIG"
  | "AUTOMATION"
  | "CMS"
  | "ROUTER"
  | "MAINTENANCE"
  | "CHATBOT";
export type SettingsSelectionOptions =
  | "DBEXCEL"
  | "QM"
  | "DEFAULTREVIEWER"
  | "RESOURCEMANAGEMENT"
  | "IARM"
  | "WEBCUSTOMER";
export type QuestionSelectionOptions = "Regular" | "Case Study";
export type RegularQuestionSelectionOptions = "MCQ" | "SATA";
export type MenuType = "Main" | "SubMenu" | null;
export type CaseStudyQuestionSelectionOptions =
  | "DDC"
  | "DND"
  | "SATA"
  | "MRSN"
  | "HCP"
  | "MCQGROUP"
  | "MCQNOGROUP"
  | "DDT"
  | "BOWTIE";

export type ActiveSession = {
  device: string;
  location: string;
  lastActive: string;
  icon: React.ReactNode;
};

export type PlanType = {
  abbr: string;
  planName: string;
  planType: "Standard" | "Fast Track";
  duration: number;
  price: number;
  currency: string;
  registered: boolean;
};

export type LatestPaymentItem = {
  id: number;
  label: "Payment Date" | "Type of Plan" | "Card Used to Pay" | "Total Payment";
  value?: string;
  icon?: string;
};

export type Payment = {
  paymentDate: string;
  planType: string;
  cardUsed: string;
  totalPayment: number;
};

export type BillingHistoryItem = {
  orderId: string;
  date: string;
};

export type PasswordAndSecurityItem = {
  id: number;
  label: string;
  subLabel?: string;
  icon?: string;
  isBtn?: boolean;
  btnLabel?: string;
};
