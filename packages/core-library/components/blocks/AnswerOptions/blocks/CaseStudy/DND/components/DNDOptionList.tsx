import { Box, Typography } from '@mui/material'
import React from 'react'
import { DndOptionsResponseType } from '../../../../../../../api/types'
import { IconButton } from '../../../../../../Button/IconButton'
import { EvaIcon } from '../../../../../../EvaIcon'

type Props = {
    optionList: DndOptionsResponseType[]
    deleteDndOption: (optionId: string) => void;
}

export const DNDOptionList: React.FC<Props> = ({ optionList, deleteDndOption }) => {
    return (
        <Box data-testid="dnd-option-list" gap={2} overflow="auto" height={1}>
            {optionList.length > 0 && optionList.map((option, index) =>
                <Box sx={{
                    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.3)',
                    textAlign: 'center',
                    backgroundColor: "#fff",
                    my: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                    p: 3
                }} key={option.id}>
                    <Typography variant='body1'>
                        {option.label}
                    </Typography>
                    <IconButton onClick={() => deleteDndOption(option.id)}>
                        <EvaIcon name='close-outline' width={13} height={13} />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}
