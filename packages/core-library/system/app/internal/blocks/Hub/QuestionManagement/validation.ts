import * as yup from "yup";

export const regularQuestionSchema = yup.object({
  question: yup.string().required().default(""),
  type: yup.string().required().default(""),
});

export const caseNameSchema = yup.object({
  caseName: yup.string().required("Case name is requuired"),
});
