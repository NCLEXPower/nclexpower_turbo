/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Fade, Grow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { useMapErrors } from '../../hooks'
import { Button } from '../Button/Button'

type ErrorMappingPropsType = {
    errors: FieldErrors
    parentPath?: string
}

export const ErrorMapping: React.FC<ErrorMappingPropsType> = ({ errors, parentPath }) => {
    const [displayErrorList, setDisplayErrorList] = useState(false)
    const errorMap = useMapErrors(errors, parentPath)

    if (!errorMap) return

    function displayValidationError() {
        setDisplayErrorList(true)
        setTimeout(() => {
            setDisplayErrorList(false)
        }, 5000)
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            {Object.keys(errorMap).length > 0 &&
                <Fade in={Object.keys(errorMap).length > 0}>
                    <Button sx={{
                        borderRadius: '10px', bgcolor: 'red', fontSize: '14px',
                        "&:hover": {
                            backgroundColor: "#d30000",
                        },
                    }} onClick={displayValidationError}>{Object.keys(errorMap).length} Errors Found</Button>
                </Fade>}
            {Object.keys(errorMap).length > 0 && displayErrorList && (
                <Box marginTop="10px">
                    <Box width="100%" sx={{ gap: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        {Object.keys(errorMap).map((key, index) => (
                            <Grow
                            key={index}
                                in={displayErrorList}
                                style={{ transformOrigin: '2 0 0' }}
                                {...(displayErrorList ? { timeout: 1000 } : {})}
                            >
                                <Box sx={{
                                    background: 'red', padding: '5px', borderRadius: '5px', "&:hover": {
                                        backgroundColor: "#d30000",
                                    },
                                }} key={index}>
                                    <Typography sx={{
                                        color: 'white', fontSize: '12px',
                                    }} >
                                        {errorMap[key]}
                                    </Typography>
                                </Box>
                            </Grow>))}
                    </Box>
                </Box>
            )}
        </Box >
    )
}
