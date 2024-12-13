import * as yup from 'yup'

export const CreateDndOptionSchema = yup.object({
    option: yup.string().required("This field is required")
})

export type CreateDndOptionType = yup.InferType<typeof CreateDndOptionSchema>