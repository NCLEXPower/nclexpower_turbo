import * as yup from 'yup';

export const comingSoonSchema = yup.object().shape({
  email: yup.string()
  .email("Field must contain email field")
  .required("Email field is required."),
});

export type ComingSoonType = yup.InferType<typeof comingSoonSchema>;