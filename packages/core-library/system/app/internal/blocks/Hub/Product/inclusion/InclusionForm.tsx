/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from 'react'
import { InclusionSchema, InclusionType } from './validation'
import { Button, Card, TextField, TextAreaField } from '../../../../../../../components'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useKeyDown } from '../../../../../../../hooks/useKeyDown'

type InclusionFormPropsType = {
    onSubmit: (value: InclusionType) => void
}

export const InclusionForm: React.FC<InclusionFormPropsType> = ({ onSubmit }) => {
    const form = useForm<InclusionType>({
        resolver: yupResolver(InclusionSchema),
        defaultValues: {
            option: '',
            description: ''
        }
    })

    const { control, handleSubmit, reset } = form
    const handleSubmitForm = () => {
        handleSubmit((data) => {
            onSubmit(data)
            reset({ option: '', description: '' })
        })()
    }

    useKeyDown("Enter", () => handleSubmitForm());

    return (
        <Card sx={{ width: 1, height: "fit-content", p: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField 
                    control={control} 
                    name='option' 
                    label="Add Inclusion"
                />
                <TextAreaField
                    control={control}
                    name='description'
                    label="Add Description"
                />
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={handleSubmitForm} sx={{ fontSize: 'small' }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}
