import { useState, useEffect } from 'react'
import { Container, Box, Typography } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Alert, Card, DataGrid } from '../../../../../../components';
import { useColumns, useModal, useApiCallback } from "../../../../../../hooks";
import { useExecuteToast } from '../../../../../../contexts';
import { StatusBadge } from "./StatusBadge";
import { IssueDetailsModal } from "./IssueDetailsModal";
import { StyledModal } from './StyledModal';
import { alertStyle, tableStyle, titleStyle, rowStyle } from './style';
import { getStatusLabel } from "./statusHelpers";

interface Ticket {
  id: string;
  email: string;
  reference: string;
  description: string;
  dateCreated: string;
  status: number;
}

export const IssueTrackingManagementBlock = () => {
  const [rows, setRows] = useState<Ticket[]>([]);
  const modal = useModal<Ticket>();
  const { showToast } = useExecuteToast();

  const isLoading = false;

  const getIssueReportCb = useApiCallback((api) =>
    api.webbackoffice.getIssueReport()
  );

  const handleStatusChange = (reference: string, newStatus: number) => {
    const mappedStatus = statusMapping[newStatus] ? newStatus : 0;
    
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.reference === reference
          ? { ...row, status: mappedStatus }
          : row
      )
    );
  };

  const statusMapping: Record<number, string> = {
    0: "To Be Reviewed",
    1: "In Review",
    2: "Resolved",
  };

  const fetchTickets = async () => {
    try {
      const response = await getIssueReportCb.execute();
      console.log("API RESPONSE: ", response);
  
      const mappedData: Ticket[] = response.data.map((item) => ({
        id: item.id,                
        reference: item.refNo,       
        description: item.message,   
        dateCreated: item.createdAt, 
        status: item.status ?? 0,
        email: item.email,           
      }));
  
      setRows(mappedData);
    } catch (error) {
      showToast("Error fetching tickets:", "error");
    }
  };

  useEffect(() => {
    fetchTickets(); 

    const intervalId = setInterval(() => {
      fetchTickets();
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

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
              ...rowStyle,
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
              ...rowStyle,
              fontWeight: "700",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "13px",
            }}
          >
            [<span className="w-[370px] truncate">{params.value}</span>]
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
              ...rowStyle,
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
            <StatusBadge status={getStatusLabel(params.value)} />
          </div>
        ),
      },
    ],
  });

  return (
    <Box data-testid="issue-tracking-block">
      <Container>
        <Box
          sx={alertStyle}
        >
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
          >
          </Alert>
        </Box>
        <Typography
          sx={{
            fontSize: "30px",
            marginTop: "30px",
            ...titleStyle
          }}
        >Issue Tracking Management
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            marginTop: "40px",
            ...titleStyle
          }}
        >Issue List
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            ...titleStyle
          }}
        >Total: [ {rows.length} ] Concerns
        </Typography>
        <Card sx={{ mt: 5, width: "100%" }} elevation={0}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id} 
            initPageSize={10}
            isLoading={isLoading}
            disableColumnResize
            disableVirtualization 
            sx={tableStyle}
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
          fetchTickets={fetchTickets}   // debug
        />
      </StyledModal>
    </Box>
  )
}