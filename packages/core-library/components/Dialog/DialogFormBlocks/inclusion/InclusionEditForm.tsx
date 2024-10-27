/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from 'react'
import { useBusinessQueryContext, useDialogContext, useExecuteToast } from '../../../../contexts'
import { useAtomValue } from 'jotai'
import { useForm } from 'react-hook-form'
import { UpdateInclusionSchema, UpdateInclusionType } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { TextField } from '../../../forms/TextField'
import { Button } from '../../../Button/Button'
import { useQueryClient } from 'react-query'
import { InclusionIdAtom } from './useAtomic'

export const InclusionEditForm = () => {
    const Inclusion = useAtomValue(InclusionIdAtom)
    const { businessQueryUpdateInclusion } = useBusinessQueryContext()
    const { mutateAsync } = businessQueryUpdateInclusion()
    const { closeDialog } = useDialogContext();
    const { executeToast } = useExecuteToast();
    const queryClient = useQueryClient()

    const form = useForm<UpdateInclusionType>({
        resolver: yupResolver(UpdateInclusionSchema),
        defaultValues: UpdateInclusionSchema.getDefault(),
        values: Inclusion
    })
    const { control, handleSubmit, reset } = form

    async function onSubmit(values: UpdateInclusionType) {
        try {
            await mutateAsync(values)
            reset()
            closeDialog()
            queryClient.invalidateQueries("getAllInclusionApi")
        }
        catch {
            executeToast('Inclusion Already Exist', 'top-right', true, { type: 'error' })
        }
    }

    return (
        <Box display="flex" data-testid="inclusion-edit-form" alignItems="end" gap={3}>
            <TextField label="Inclusion" control={control} name="option" />
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Box>

    )
}
