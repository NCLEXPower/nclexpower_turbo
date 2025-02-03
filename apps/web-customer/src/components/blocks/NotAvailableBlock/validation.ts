import * as yup from 'yup';

export const notAvailableSchema = yup.object().shape({
  email: yup.string()
  .email("Field must contain email field")
  .required("Email field is required."),
});

export type DeniedCountryType = yup.InferType<typeof notAvailableSchema>;