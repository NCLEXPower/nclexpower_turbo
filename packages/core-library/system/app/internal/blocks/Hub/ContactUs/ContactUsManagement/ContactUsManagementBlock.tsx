 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { Alert, Card, DataGrid } from "core-library/components";
import { useColumns } from "core-library/hooks";
import { useDateFormat } from "../../core/hooks";

export const ContactUsManagementBlock: React.FC = () => {
    const { getFormattedDate } = useDateFormat();
  
    const { columns } = useColumns({
      columns: [
        {
          field: "tokenizeInformation.name",
          headerName: "Name",
          minWidth: 250,
          flex: 1,
          renderCell: (rows) => {
            const { tokenizeInformation } = rows.row;
            return tokenizeInformation.name;
          },
        },
        {
          field: "tokenizeInformation.email",
          headerName: "Email",
          flex: 1,
          renderCell: (rows) => {
            const { tokenizeInformation } = rows.row;
            return tokenizeInformation.email;
          },
        },
        {
          field: "tokenizeInformation.phone",
          headerName: "Phone",
          flex: 1,
          renderCell: (rows) => {
            const { tokenizeInformation } = rows.row;
            return tokenizeInformation.phone;
          },
        },
        {
          field: "tokenizeInformation.message",
          headerName: "Message",
          flex: 1,
          renderCell: (rows) => {
            const { tokenizeInformation } = rows.row;
            return tokenizeInformation.message;
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
            title="Contact Us Management"
            description="Access a comprehensive list of all internal users along with their details for streamlined tracking and effective management."
          />
          <Card sx={{ mt: 5, width: "100%", padding: 4 }} elevation={5}>
            <DataGrid
              columns={columns}
              initPageSize={10}
              rows={[]}
              isLoading={false}
              data-testid="data-grid"
            />
          </Card>
        </Container>
      </Box>
    );
};
