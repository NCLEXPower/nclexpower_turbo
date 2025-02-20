import React from "react";
import { Box, Container } from "@mui/material";
import { useDateFormat, useSystemProduct } from "../core/hooks";
import { useColumns } from '../../../../../../hooks';
import { useBusinessQueryContext } from '../../../../../../contexts';
import { 
  Alert, 
  DataGrid, 
  ConfirmationModal,
  CustomPopover, 
} from '../../../../../../components';
import {
  DeleteReportIssuesParams,
} from "../../../../../../api/types";
import { useApiCallback, useApi } from "../../../../../../hooks";
import { useExecuteToast } from "../../../../../../contexts";
import { GridMoreVertIcon } from "@mui/x-data-grid";

export function ReportedIssuesBlock() {
  const { businessQueryGetAllReportedIssues } = useBusinessQueryContext();
  const { data, refetch } = businessQueryGetAllReportedIssues(["getAllReportedIssues"]);
  const { getSystemProductLabel } = useSystemProduct();
  const { getFormattedDate } = useDateFormat();

  const deleteReportedIssuesCb = useApiCallback((api, args: DeleteReportIssuesParams) => 
    api.webbackoffice.deleteReportIssue(args)
  )

  const isLoading = deleteReportedIssuesCb.loading;

  const { showToast } = useExecuteToast();

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
      {
        field: "",
        sortable: true,
        width: 100,
        renderCell: ({ row }) => {
          return (
            <Box display="flex" alignItems="center" height={1}>
              <CustomPopover
                open
                withIcon={true}
                label="Actions"
                iconButton={<GridMoreVertIcon fontSize="small" />}
              >
                <ConfirmationModal
                  customButton={"ListDeleteButton"}
                  dialogContent="Are you sure you want to delete this item?"
                  isLoading={false}
                  handleSubmit={() => onDelete(row.id)}
                />
              </CustomPopover>
            </Box>
          );
        },
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
            isLoading={isLoading}
            initPageSize={10}
            getRowHeight={() => "auto"}
          />
        </Box>
      </Container>
    </Box>
  );
  async function onDelete(reportedIssueId: string){ 
    try {
      await deleteReportedIssuesCb.execute({
        id: reportedIssueId,
      } as DeleteReportIssuesParams)
      refetch()
      showToast("Succesfully deleted!", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again later!", "error");
    }
  }
}

export default ReportedIssuesBlock;
