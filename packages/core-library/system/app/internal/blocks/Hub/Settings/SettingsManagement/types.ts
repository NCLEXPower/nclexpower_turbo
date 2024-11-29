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
  | "MAINTENANCE";
export type SettingsSelectionOptions =
  | "DBEXCEL"
  | "QM"
  | "DEFAULTREVIEWER"
  | "RESOURCEMANAGEMENT"
  | "IARM"
  | "WEB_C";
export type QuestionSelectionOptions = "Regular" | "Case Study";
export type RegularQuestionSelectionOptions = "MCQ" | "SATA";
export type MenuType = "Main" | "SubMenu" | null;
export type CaseStudyQuestionSelectionOptions = "DDC" | "DND" | "SATA" | "MRSN";

export type EnvironmentItem = {
  id: number;
  label: string;
};
