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
import { Button, TextField } from '../../..'
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
            const response = await mutateAsync(values)
            if (response.data === 409) {
                executeToast(
                    "Inclusion already exist",
                    'top-right',
                    true,
                    { type: 'error' })
            }
            reset()
            closeDialog()
            queryClient.invalidateQueries("getAllInclusionApi")
        }
        catch {
            executeToast('Somethin went wrong. Please try again later', 'top-right', true, { type: 'error' })
        }
    }

    return (
        <Box display="flex" data-testid="inclusion-edit-form" alignItems="end" gap={3}>
            <TextField label="Inclusion" control={control} name="option" />
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Box>

    )
}