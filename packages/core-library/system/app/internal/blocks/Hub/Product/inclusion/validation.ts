import * as yup from "yup";

export const InclusionSchema = yup.object({
    option: yup.string().required().default("")
})

export type InclusionType = yup.InferType<typeof InclusionSchema> 