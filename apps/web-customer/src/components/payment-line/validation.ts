import * as yup from "yup";

export const paymentTermsSchema = yup
  .object({
    IsAgree: yup.bool(),
  })
  .required();

export type PaymentTerms = yup.InferType<typeof paymentTermsSchema>;
