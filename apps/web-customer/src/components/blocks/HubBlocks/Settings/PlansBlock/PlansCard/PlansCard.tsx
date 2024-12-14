import { buttonSx, cardBgsx } from '@/components/blocks/HubBlocks/Settings/PlansBlock/content/planStyle'
import { PlanType } from '@/components/blocks/HubBlocks/Settings/type'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from 'core-library/components'
import React from 'react'

export type Props = {
    plan: PlanType
}

export const PlansCard: React.FC<Props> = ({ plan }) => {
    const { registered } = plan

    const colorTransition = (registered: boolean) => {
        return registered ? "#084A4E" : "#fff"
    }

    return (
        <Box sx={{
            ...cardBgsx,
            bgcolor: colorTransition(!registered),
            color: colorTransition(registered)
        }}>
            <Box p={3} display="flex" alignItems="center" justifyContent="space-between">
                <Box gap={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <span className='font-extrabold py-1 text-4xl border-r pr-2'>{plan.abbr}</span>
                        {plan.planName}
                    </Box>
                    <Typography fontSize={16} ><span className='capitalize'>{plan.duration}</span> ({plan.planType === 0 ? "Fast Track" : "Standard"})</Typography>
                </Box>
                <Box>
                    <Typography fontSize={20} fontWeight={700}>{plan.currency}{plan.price}/Days</Typography>
                </Box>
            </Box>
            <Box m={3}>
                {registered ?
                    <Button sx={{
                        ...buttonSx,
                        backgroundColor: '#084A4E',
                    }}> Cancel Subscription</Button>
                    : <Box display="flex" gap={4} alignItems="center">
                        <Button sx={{
                            ...buttonSx,
                            color: colorTransition(!registered),
                            backgroundColor: colorTransition(registered)
                        }}>
                            Upgrade
                        </Button>
                        <Typography variant='body2'>
                            Learn more about this plan
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}
