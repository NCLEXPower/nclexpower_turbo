import * as yup from "yup";
import { STRING_REGEX } from '../../../../../../../utils';

export const productSchema = yup.object({
  productName: yup.string().required("Product name is required").default("").matches(STRING_REGEX, "Special characters not allowed"),
  pricingId: yup.string().required("Select pricing").default(""),
  categoryId: yup.string().required("Select category").default(""),
  productDescription: yup.string().notRequired().default("").matches(STRING_REGEX, "Special characters not allowed"),
  programType: yup.number().required("Select program type").default(0),
  programTitle: yup.number().required("Select program title").default(0),
  features: yup
    .array()
    .min(1, "Please select atleast 1 feature")
    .required("Select atleast 1 feature")
    .default([]),
});

export type ProductFormType = yup.InferType<typeof productSchema>;
