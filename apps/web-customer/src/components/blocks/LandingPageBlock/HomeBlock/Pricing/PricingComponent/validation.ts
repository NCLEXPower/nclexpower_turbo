import * as yup from "yup";

export const productSelectionSchema = yup.object({
  productId: yup.string(),
});

export type ProductSelectionFormType = yup.InferType<
  typeof productSelectionSchema
>;
