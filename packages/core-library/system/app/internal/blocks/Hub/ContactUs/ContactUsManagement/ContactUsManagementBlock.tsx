 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { Alert, Card, DataGrid } from "../../../../../../../components";
import { useColumns } from "../../../../../../../hooks";
import { useDateFormat } from "../../core/hooks";

export const ContactUsManagementBlock: React.FC = () => {
  const { getFormattedDate } = useDateFormat();
  const { businessQueryGetContactUs } = useBusinessQueryContext();
  const { data } = businessQueryGetContactUs(["get-contact-us"]);

  const { columns } = useColumns({
    columns: [
      {
        field: "name",
        headerName: "Name",
        minWidth: 250,
        flex: 1,
        renderCell: (rows) => rows.row.name,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        renderCell: (rows) => rows.row.email,
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        renderCell: (rows) => rows.row.phone,
      },
      {
        field: "message",
        headerName: "Message",
        flex: 1,
        renderCell: (rows) => rows.row.message,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        sortable: true,
        minWidth: 200,
        valueGetter: (rows) => getFormattedDate(rows),
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
            rows={data ?? []}
            isLoading={false}
            data-testid="data-grid"
            />
          </Card>
        </Container>
      </Box>
    );
};
