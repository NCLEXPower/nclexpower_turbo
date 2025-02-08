import * as yup from "yup";
import { caseNameSchema, regularQuestionSchema } from "./validation";

export type RegularQuestionFormType = yup.InferType<
  typeof regularQuestionSchema
>;

export type CaseNameFormType = yup.InferType<typeof caseNameSchema>;
