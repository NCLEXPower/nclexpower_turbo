import React from 'react'
import { DNDAnswerOptionType } from '../../../../../../types'
import { Card } from '../../../../../../../../../../../../../../../../components'
import { Box } from '@mui/material'

type Props = {
    answers: DNDAnswerOptionType[]
}

export const DNDSummary: React.FC<Props> = ({ answers }) => {
    return (
        <Card>
            <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                {answers.length > 0 && answers.map((answer) => (
                    <Card key={answer.value} sx={{ p: 2, borderRadius: 5 }}>{answer.label}</Card>))}
            </Box>
        </Card>
    )
}
