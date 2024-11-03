import React from "react";
import { Box, Card, Container } from "@mui/material";
import { useDateFormat } from '../../core/hooks';
import { useBusinessQueryContext } from '../../../../../../../contexts';
import { useColumns } from '../../../../../../../hooks';
import { Alert, DataGrid } from '../../../../../../../components';

export function ViewUserBlock() {
  const { businessQueryGetAllInternalAccount } = useBusinessQueryContext();
  const { data } = businessQueryGetAllInternalAccount([
    "getAllInternalAccount",
  ]);
  const { getFormattedDate } = useDateFormat();

  const { columns } = useColumns({
    columns: [
      {
        field: "tokenizeInformation.email",
        headerName: "Email",
        minWidth: 250,
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.email;
        },
      },
      {
        field: "tokenizeInformation.firstname",
        headerName: "First Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.firstname;
        },
      },
      {
        field: "tokenizeInformation.middlename",
        headerName: "Middle Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.middlename;
        },
      },
      {
        field: "tokenizeInformation.lastname",
        headerName: "Last Name",
        flex: 1,
        renderCell: (rows) => {
          const { tokenizeInformation } = rows.row;
          return tokenizeInformation.lastname;
        },
      },
      {
        field: "accessGroup.accessLevel",
        headerName: "Access Level",
        flex: 1,
        renderCell: (params) => {
          const { accessGroup } = params.row;
          return (
            <span className="flex justify-center">
              {accessGroup.accessLevel}
            </span>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        sortable: true,
        minWidth: 200,
        valueGetter: (date) => getFormattedDate(date),
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Manage Internal Users"
          description="Get lists all internal users with their details for efficient tracking and management."
        />
        <Card sx={{ mt: 5, width: "100%", padding: 4 }} elevation={5}>
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={data ?? []}
            isLoading={false}
            data-testid="data-grid"
          />
        </Card>
      </Container>
    </Box>
  );
}
