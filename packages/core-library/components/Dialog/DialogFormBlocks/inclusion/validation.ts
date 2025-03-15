/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import * as yup from 'yup'

export const UpdateInclusionSchema = yup.object({
    id: yup.string().optional(),
    option: yup.string().required('Inclusion is required'),
    description: yup.string().required('Description is required')
}).required()

export type UpdateInclusionType = {
    id?: string;
    option: string;
    description: string;
}

