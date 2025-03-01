import * as yup from "yup";

const subSectionSchema = yup.object().shape({
  subSectionId: yup.string().required("Subsection is required"),
  subSectionTitle: yup.string().required("Subsection title is required"),
  subSectionContent: yup.string().required("Subsection content is required"),
});

export const policySchema = yup.object().shape({
  sectionId: yup.string().required("Section is required"),
  sectionTitle: yup.string().required("Section title is required"),
  subSection: yup.array().of(subSectionSchema),
});

export type PolicyType = yup.InferType<typeof policySchema>;
