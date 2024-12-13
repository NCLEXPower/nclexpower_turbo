import * as yup from "yup";
import {
  containedRegularQuestionSchema,
  containedCaseStudyQuestionSchema,
  ddcAnswerOptionsSchema,
  dndAnswerOptionsSchema,
  defaultOptionSchema,
} from "./validation";

export type ContainedRegularQuestionType = yup.InferType<typeof containedRegularQuestionSchema>;

export type ContainedCaseStudyQuestionType = yup.InferType<typeof containedCaseStudyQuestionSchema>;

export type DDCAnswerOptionType = yup.InferType<typeof ddcAnswerOptionsSchema>;

export type SATAAnswerOptionType = yup.InferType<typeof defaultOptionSchema>;

export type DNDAnswerOptionType = yup.InferType<typeof dndAnswerOptionsSchema>;

export type tabsTypes = "nurseNotes" | "hxPhy" | "labs" | "orders";
