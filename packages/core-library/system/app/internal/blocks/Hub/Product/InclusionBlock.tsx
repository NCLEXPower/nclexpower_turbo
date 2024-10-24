import React from 'react'
import { useBusinessQueryContext } from '../../../../../../contexts'
import { useColumns } from '../../../../../../hooks'
import { Alert, Card, DataGrid } from '../../../../../../components'
import { Box, Container } from '@mui/material'
import { useForm } from 'react-hook-form'
import { InclusionSchema, InclusionType } from './inclusion/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InclusionForm } from './inclusion/InclusionForm'

export const InclusionBlock: React.FC = () => {
    const { businessQueryGetAllInclusion } = useBusinessQueryContext()
    const { data, isLoading } = businessQueryGetAllInclusion(["getAllInclusionApi"])


    const { columns } = useColumns({
        columns: [
            {
                field: "id",
                sortable: true,
                headerName: "ID",
                flex: 1,
            },
            {
                field: "option",
                sortable: true,
                headerName: "Options",
                flex: 1,
            },
        ]
    })

    async function onSubmit(value: InclusionType) {
        console.log(value)
    }

    return (
        <Box>
            <Container>
                <Alert
                    severity="info"
                    title="Inclusion Management"
                    description="Create and Manage your Inclusion for your products"
                />
                <Box display="flex" width={1} justifyContent="space-between" gap={4}>
                    <InclusionForm onSubmit={onSubmit} />
                    <Card sx={{ width: 1, boxShadow: 1 }}>
                        <DataGrid
                            sx={{ minHeight: "600px" }}
                            isLoading={isLoading}
                            initPageSize={5}
                            rowSelection={false}
                            columns={columns}
                            getRowHeight={() => "auto"}
                            rows={data ?? []} />
                    </Card>
                </Box>

            </Container>

        </Box >
    )
}
