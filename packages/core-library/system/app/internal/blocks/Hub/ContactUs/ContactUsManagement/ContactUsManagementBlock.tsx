/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { Container, Box } from "@mui/material";
import { Alert, Card, DataGrid } from "../../../../../../../components";
import { useColumns, useApi } from "../../../../../../../hooks";
import { ContactResponseType } from "../../../../../../../api/types";

export const ContactUsManagementBlock: React.FC = () => {

    const getContacts = useApi((api) => api.webbackoffice.getAllContacts());

    const contacts = (getContacts.result?.data as unknown as ContactResponseType[]) ?? [];
  
    const { columns } = useColumns({
      columns: [
        {
          field: "name",
          headerName: "Name",
          minWidth: 250,
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "phone",
          headerName: "Phone",
          flex: 1,
        },
        {
          field: "message",
          headerName: "Message",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "Created At",
          flex: 1,
          sortable: true,
          minWidth: 200,
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
              rows={contacts}
              isLoading={getContacts.loading}
              data-testid="data-grid"
              disableColumnResize
            />
          </Card>
        </Container>
      </Box>
    );
};
