import * as yup from 'yup'

export const UpdateInclusionSchema = yup.object({
    id: yup.string().required().default(''),
    option: yup.string().required().default('')
})

export type UpdateInclusionType = yup.InferType<typeof UpdateInclusionSchema>