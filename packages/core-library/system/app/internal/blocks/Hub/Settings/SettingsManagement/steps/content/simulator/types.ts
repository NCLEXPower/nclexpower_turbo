import * as yup from "yup";
import {
  containedRegularQuestionSchema,
  containedCaseStudyQuestionSchema,
  ddcAnswerOptionsSchema,
  dndAnswerOptionsSchema,
  defaultOptionSchema,
  bowtieAnswerOptionsSchema,
  mcqGroupAnswerSchema,
  hcpOptionSchema,
  dndAnswersSchema,
} from "./validation";

export type ContainedRegularQuestionType = yup.InferType<
  typeof containedRegularQuestionSchema
>;

export type ContainedCaseStudyQuestionType = yup.InferType<
  typeof containedCaseStudyQuestionSchema
>;

export type BowtieAnswerOption = yup.InferType<
  typeof bowtieAnswerOptionsSchema
>;

export type DDCAnswerOptionType = yup.InferType<typeof ddcAnswerOptionsSchema>;

export type SATAAnswerOptionType = yup.InferType<typeof defaultOptionSchema>;

export type DNDAnswerOptionType = yup.InferType<typeof dndAnswerOptionsSchema>;

export type DNDAnswersType = yup.InferType<typeof dndAnswersSchema>

export type MCQNoGroupAnswerOptionType = yup.InferType<
  typeof mcqGroupAnswerSchema
>;
export type HCPNAnswerOptionType = yup.InferType<typeof hcpOptionSchema>;

export type tabsTypes = "nurseNotes" | "hxPhy" | "labs" | "orders";
