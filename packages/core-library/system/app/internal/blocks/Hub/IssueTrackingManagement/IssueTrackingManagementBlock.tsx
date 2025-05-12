/**
Property of the Arxon Solutions, LLC.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { useEffect, useMemo, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Alert, Card, DataGrid } from "../../../../../../components";
import { useColumns, useModal, useApi } from "../../../../../../hooks";
import { StatusBadge } from "./StatusBadge";
import { IssueDetailsModal } from "./IssueDetailsModal";
import { alertStyle, tableStyle, titleStyle, rowStyle } from "./styles/style";
import { formatDate } from "../../../../../../core";

export interface Ticket {
  id: string;
  email: string;
  reference: string;
  description: string;
  dateCreated: string;
  status: number;
}

export const IssueTrackingManagementBlock = () => {
  const [rows, setRows] = useState<Ticket[]>([]);
  const { open, close, props } = useModal<Ticket>();

  const getIssueReportCb = useApi(
    async (api) => await api.webbackoffice.getIssueReport()
  );

  const openModal = (data: Ticket) => {
    open(data);
  };

  const mappedData: Ticket[] = useMemo(() => {
    if (!getIssueReportCb.result?.data) return [];
    return getIssueReportCb.result.data.map((item) => ({
      id: item.id,
      reference: item.refNo,
      description: item.message,
      dateCreated: item.createdAt,
      status: item.status ?? 0,
      email: item.email,
    }));
  }, [getIssueReportCb.result]);

  useEffect(() => {
    if (rows.length === 0 && !!mappedData.length) {
      setRows(mappedData);
    }
  }, [mappedData, rows.length]);

  const handleStatusChange = (reference: string, newStatus: number) => {
    // const mappedStatus = statusMapping[newStatus] ? newStatus : 0;
    // setRows((prevRows) =>
    //   prevRows.map((row) =>
    //     row.reference === reference ? { ...row, status: mappedStatus } : row
    //   )
    // );
  };

  const { columns } = useColumns({
    columns: [
      {
        field: "icon",
        headerName: " ",
        sortable: false,
        width: 95,
        renderCell: () => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              height: "100%",
              width: "100%",
            }}
          >
            <MessageOutlinedIcon sx={{ color: "#3B0086", fontSize: "18px" }} />
          </div>
        ),
      },
      {
        field: "reference",
        headerName: "Reference Number",
        sortable: true,
        width: 260,
        renderCell: (params) => (
          <Typography
            sx={{
              ...rowStyle,
              fontWeight: "500",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => openModal(params.row)}
            data-testid={`reference-cell-${params.row.reference}`}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        sortable: false,
        width: 380,
        renderCell: (params) => (
          <Typography
            sx={{
              ...rowStyle,
              fontWeight: "700",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "13px",
            }}
          >
            <span className="truncate max-w-[330px] inline-block align-middle">
              {params.value}
            </span>
          </Typography>
        ),
      },
      {
        field: "dateCreated",
        headerName: "Date Created",
        sortable: true,
        width: 220,
        renderCell: (params) => (
          <Typography
            sx={{
              ...rowStyle,
              fontWeight: "400",
              fontFamily: '"PT Sans Narrow", sans-serif',
              fontSize: "16px",
            }}
          >
            {formatDate(new Date(params.value), "MMMM d, yyyy")}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: false,
        width: 175,
        renderCell: (params) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <StatusBadge status={params.value} />
          </div>
        ),
      },
    ],
  });

  return (
    <Box data-testid="issue-tracking-block">
      <Container>
        <Box sx={alertStyle}>
          <Alert
            severity="info"
            title="Issue Tracking Management"
            description="You can view and manage concerns or issues raised from customers."
            style={{
              backgroundColor: "#BD8FDB4F",
              color: "#3B0086A3",
              border: "1px solid #3B0086",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          ></Alert>
        </Box>
        <Typography
          sx={{
            fontSize: "30px",
            marginTop: "30px",
            ...titleStyle,
          }}
        >
          Issue Tracking Management
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            marginTop: "40px",
            ...titleStyle,
          }}
        >
          Issue List
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            ...titleStyle,
          }}
        >
          Total: [ {rows.length} ] Concerns
        </Typography>
        <Card sx={{ mt: 5, width: "100%" }} elevation={0}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            initPageSize={10}
            isLoading={getIssueReportCb.loading}
            disableColumnResize
            disableVirtualization
            autoHeight
            getRowHeight={() => 60}
            getRowSpacing={(params) => ({
              top: 0,
              bottom: params.isLastVisible ? 40 : 8,
            })}
            sx={tableStyle}
          />
        </Card>
      </Container>

      <IssueDetailsModal
        open={props.isOpen}
        onClose={close}
        data={props.context}
        // onStatusChange={handleStatusChange}
        data-testid="issue-details-modal"
      />
    </Box>
  );
};
