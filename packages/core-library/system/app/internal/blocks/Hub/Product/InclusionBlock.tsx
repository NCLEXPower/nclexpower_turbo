import React from 'react'
import { useBusinessQueryContext, useDialogContext, useExecuteToast } from '../../../../../../contexts'
import { useColumns } from '../../../../../../hooks'
import { Alert, Card, ConfirmationModal, DataGrid } from '../../../../../../components'
import { Box, Container, ListItemButton } from '@mui/material'
import { InclusionType } from './inclusion/validation'
import { InclusionForm } from './inclusion/InclusionForm'
import { CustomPopover } from '../../../../../../components/Popover/Popover'
import { GridMoreVertIcon } from '@mui/x-data-grid'
import { atom, useAtom } from 'jotai'
import { EditInclusionParams, GetAllInclusionResponse } from '../../../../../../api/types'

export const InclusionIdAtom = atom<EditInclusionParams>()

export const InclusionBlock: React.FC = () => {
    const [, setId] = useAtom(InclusionIdAtom)
    const { openDialog } = useDialogContext()
    const { businessQueryGetAllInclusion, businessQueryCreateInclusion, businessQueryDeleteInclusion } = useBusinessQueryContext()
    const { data, isLoading, refetch } = businessQueryGetAllInclusion(["getAllInclusionApi"])
    const { mutateAsync: createInclusion } = businessQueryCreateInclusion()
    const { executeToast } = useExecuteToast()
    const { mutateAsync: deleteInclusion } = businessQueryDeleteInclusion()

    async function onDelete(row: GetAllInclusionResponse) {
        await deleteInclusion(row.id)
        refetch()
    }

    const handleEdit = (row: EditInclusionParams) => {
        setId(row)
        openDialog(
            "inclusion-edit-form",
            "Update Inclusion",
            [],
            "xl"
        );
    }

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
            {
                field: "",
                sortable: true,
                width: 100,
                renderCell: ({ row }) => {
                    return (
                        <Box display="flex" alignItems="center" height={1}>
                            <CustomPopover open withIcon={true} label='Actions' iconButton={<GridMoreVertIcon fontSize="small" />}>
                                <ListItemButton
                                    sx={{ color: 'black' }}
                                    onClick={() => handleEdit(row)}>
                                    Edit
                                </ListItemButton>
                                <ConfirmationModal
                                    customButton={'ListDeleteButton'}
                                    dialogContent="Are you sure you want to delete this item?"
                                    isLoading={false}
                                    handleSubmit={() => onDelete(row)}
                                />
                            </CustomPopover>
                        </Box>
                    )
                }
            },
        ]
    })

    async function onSubmit(value: InclusionType) {
        try {
            await createInclusion(value)
            refetch()
        }
        catch {
            executeToast(
                "Inclusion already exist",
                'top-right',
                true,
                { type: 'error' })
        }
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