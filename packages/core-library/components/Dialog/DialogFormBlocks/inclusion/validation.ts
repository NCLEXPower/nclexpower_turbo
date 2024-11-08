/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import * as yup from 'yup'

export const UpdateInclusionSchema = yup.object({
    id: yup.string().required().default(''),
    option: yup.string().required().default('')
})

export type UpdateInclusionType = yup.InferType<typeof UpdateInclusionSchema>

