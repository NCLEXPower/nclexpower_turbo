import * as yup from "yup";

export const productSelectionSchema = yup.object({
  programTitle: yup.number(),
});

export type ProductSelectionFormType = yup.InferType<
  typeof productSelectionSchema
>;
