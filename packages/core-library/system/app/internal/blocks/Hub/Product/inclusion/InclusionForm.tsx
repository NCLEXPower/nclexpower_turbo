/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from 'react'
import { InclusionSchema, InclusionType } from './validation'
import { Button, Card, TextField } from '../../../../../../../components'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useKeyDown } from '../../../../../../../hooks/useKeyDown'

type InclusionFormPropsType = {
    onSubmit: (value: InclusionType) => void
}

export const InclusionForm: React.FC<InclusionFormPropsType> = ({ onSubmit }) => {
    const form = useForm<InclusionType>({
        resolver: yupResolver(InclusionSchema)
    })

    const { control, handleSubmit, reset } = form
    const handleSubmitForm = () => {
        handleSubmit(onSubmit)()
        reset()
    }

    useKeyDown("Enter", () => handleSubmitForm());

    return (
        <Card sx={{ width: 1, height: "fit-content" }}>
            <Box display="flex" gap={2} alignItems="end">
                <TextField control={control} name='option' label="Add Inclusion" />
                <Button onClick={handleSubmitForm} sx={{ fontSize: 'small' }}>
                    Add Inclusion
                </Button>
            </Box>
        </Card>
    )
}
