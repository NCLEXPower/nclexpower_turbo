import * as yup from "yup";

export const InclusionSchema = yup.object({
    option: yup.string().required("Inclusion is Required").default(""),
    description: yup.string().required("Description is Required").default("")
})

export type InclusionType = yup.InferType<typeof InclusionSchema> 