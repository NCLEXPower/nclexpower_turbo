import { useState } from 'react'
import { Container, Box, Typography, Backdrop } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { InfoCard, Card, DataGrid } from '../../../../../../components';
import { useColumns, useModal } from "../../../../../../hooks";
import { StatusBadge } from "./StatusBadge";
import { IssueDetailsModal } from "./IssueDetailsModal";
import { mockRows } from './IssueTrackingMock';
import { StyledModal } from './StyledModal';

export const IssueTrackingManagementBlock = () => {
  const modal = useModal<{ 
    email: string;
    reference: string; 
    description: string; 
    dateCreated: string; 
    status: string; 
  }>();

  const [rows, setRows] = useState(mockRows);
  const isLoading = false;

  const handleStatusChange = (reference: string, newStatus: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.reference === reference ? { ...row, status: newStatus } : row
      )
    );
  };

  const truncateByWords = (text: string, wordLimit: number): string => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const titleStyles = {
    color: "#3B0086",
    fontFamily: '"PT Sans Narrow", sans-serif',
    fontWeight: "bold",
    marginLeft: "10px",
  };

  const { columns } = useColumns({
    columns: [
      {
        field: "icon",
        headerName: " ",
        sortable: false,
        width: 100,
        renderCell: () => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              height: "100%",
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
        width: 200,
        renderCell: (params) => (
          <Typography
            sx={{ 
              display: "flex",
              alignItems: "center", 
              height: "100%",
              color: "#707070", 
              fontWeight: "500", 
              fontFamily: '"Poppins", sans-serif',
              fontSize: "16px",
              cursor: "pointer" 
            }}
            onClick={() => modal.open(params.row)} 
            data-testid={`reference-cell-${params.row.reference}`}
          >
            [{params.value}]
          </Typography>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        sortable: false,
        width: 450,
        renderCell: (params) => (
          <Typography
            sx={{ 
              display: "flex",
              alignItems: "center", 
              height: "100%",
              color: "#707070", 
              fontWeight: "700", 
              fontFamily: '"Poppins", sans-serif',
              fontSize: "13px",
            }}
          >
            [{truncateByWords(params.value as string, 10)}]
          </Typography>
        ),
      },
      {
        field: "dateCreated",
        headerName: "Date Created",
        sortable: true,
        width: 200,
        renderCell: (params) => (
          <Typography
            sx={{ 
              display: "flex",
              alignItems: "center", 
              height: "100%",
              color: "#707070", 
              fontWeight: "400", 
              fontFamily: '"PT Sans Narrow", sans-serif',
              fontSize: "16px",
            }}
          >
            [{params.value}]
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: false,
        width: 180,
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
        <InfoCard
          title="Issue Tracking Management"
          description="You can view and manage concerns or issues raised from customers."
        />
        <Typography
          sx={{
            fontSize: "30px",
            marginTop: "30px",
            ...titleStyles
          }}
        >Issue Tracking Management
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            marginTop: "40px",
            ...titleStyles
          }}
        >Issue List
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            ...titleStyles
          }}
        >Total: [ {rows.length} ] Concerns
        </Typography>
        <Card sx={{ mt: 5, width: "100%" }} elevation={0}>
          <DataGrid
            rows={rows}
            columns={columns}
            initPageSize={10}
            isLoading={isLoading}
            disableColumnResize
            disableVirtualization 
            sx={{
              backgroundColor: "#fff",
              [`& .MuiDataGrid-cell:focus, 
                & .MuiDataGrid-cell:focus-within, 
                & .MuiDataGrid-columnHeader:focus, 
                & .MuiDataGrid-columnHeader:focus-within, 
                & .MuiButtonBase-root:focus, 
                & .MuiButtonBase-root:focus-visible`]: {
                outline: "none !important",
                boxShadow: "none",
              },
              "& .MuiDataGrid-row": {
                minHeight: "60px !important", 
                maxHeight: "60px !important", 
                "--height": "60px !important",
                position: "relative",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "8px",
                backgroundColor: "#0000000A",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#E6E6E6",
                },
              },
              "& .MuiDataGrid-row:first-of-type": {
                marginTop: "20px",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: "#8C8C8C",
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 400,
                fontSize: "16px",
                borderBottom: "3px solid #C9C9C9",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                justifyContent: "left",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "nowrap",
              },
            
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-row": {
                backgroundColor: "transparent",
                borderRadius: "0px",
              },
            }}
          />
        </Card>
      </Container>

      <StyledModal
        isOpen={modal.props.isOpen}
        onClose={modal.close}
        ariaLabelledBy="issue-details-title"
      >
        <IssueDetailsModal
          modal={modal.props}
          onClose={modal.close}
          onStatusChange={handleStatusChange}
          data-testid="issue-details-modal"
        />
      </StyledModal>
    </Box>
  )
}