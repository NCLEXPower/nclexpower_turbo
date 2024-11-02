import React from "react";
import { Box, Container } from "@mui/material";
import { useDateFormat, useSystemProduct } from "../core/hooks";
import { useColumns } from '../../../../../../hooks';
import { useBusinessQueryContext } from '../../../../../../contexts';
import { Alert, DataGrid } from '../../../../../../components';

export function ReportedIssuesBlock() {
  const { businessQueryGetAllReportedIssues } = useBusinessQueryContext();
  const { data } = businessQueryGetAllReportedIssues(["getAllReportedIssues"]);
  const { getSystemProductLabel } = useSystemProduct();
  const { getFormattedDate } = useDateFormat();

  const { columns } = useColumns({
    columns: [
      {
        field: "ticketNumber",
        headerName: "Ticket No.",
        sortable: true,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Customer Email",
        flex: 1,
        sortable: true,
      },
      {
        field: "categoryId",
        headerName: "Category ID",
        flex: 1,
        sortable: true,
      },
      {
        field: "systemProduct",
        headerName: "System Product",
        flex: 2,
        sortable: true,
        valueGetter: (systemProduct) => getSystemProductLabel(systemProduct),
      },
      {
        field: "dateReported",
        headerName: "Date Reported",
        flex: 1,
        sortable: true,
        valueGetter: (date) => getFormattedDate(date),
      },
      {
        field: "description",
        headerName: "Description",
        sortable: true,
        flex: 2,
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Reported Issues"
          description="Get lists all reported issues with their details for efficient tracking and management."
        />
        <Box bgcolor="white" pt={2}>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            isLoading={false}
            initPageSize={10}
            getRowHeight={() => "auto"}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ReportedIssuesBlock;
