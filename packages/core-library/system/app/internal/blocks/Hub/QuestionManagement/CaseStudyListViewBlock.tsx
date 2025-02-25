import React, { useEffect, useMemo } from "react";
import {
  useApi,
  useApiCallback,
  useColumns,
  useSensitiveInformation,
} from "../../../../../../hooks";
import { Alert, Card, DataGrid } from "../../../../../../components";
import { useAccountId } from "../../../../../../contexts/auth/hooks";
import { Box, Container, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { CaseListChip } from "./CaseListChip";
import { useDateFormat } from "../core/hooks";

export const CaseStudyListViewBlock = () => {
  const { internal } = useSensitiveInformation();
  const { getFormattedDate } = useDateFormat();

  const caseStudyListCb = useApi(
    (api) =>
      api.webbackoffice.caseStudyList({
        TokenizeInformationId: internal?.id ?? "",
      }),
    [internal?.id]
  );

  const caseStudyLists = useMemo(
    () => caseStudyListCb.result?.data ?? [],
    [caseStudyListCb.result]
  );

  const { columns } = useColumns({
    columns: [
      {
        field: "caseNum",
        sortable: true,
        headerName: "Case No.",
        flex: 1,
      },
      {
        field: "caseName",
        sortable: true,
        headerName: "Case Name",
        flex: 1,
      },
      {
        field: "status",
        sortable: true,
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          return <CaseListChip status={params.value} />;
        },
      },
      {
        field: "dateCreated",
        sortable: true,
        headerName: "Created At",
        flex: 1,
        renderCell: (params) => {
          return (
            <Box sx={{ verticalAlign: "center" }}>
              {getFormattedDate(params.value)}
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
          title="Case Lists"
          description="Create and Manage your Inclusion for your products"
        />
        <Box
          data-testid="case-list-block"
          display="flex"
          width={1}
          justifyContent="space-between"
          gap={4}
        >
          <Card sx={{ width: 1, boxShadow: 1 }}>
            <DataGrid
              isLoading={caseStudyListCb.loading}
              sx={{ minHeight: "600px" }}
              initPageSize={10}
              rowSelection={false}
              columns={columns}
              rows={caseStudyLists ?? []}
              slots={{ toolbar: GridToolbar }}
            />
          </Card>
        </Box>
      </Container>
    </Box>
  );
};
