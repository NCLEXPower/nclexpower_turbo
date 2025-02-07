import React, { useMemo } from "react";
import { Container, Box } from "@mui/material";
import {
  Alert,
  Button,
  Card,
  ConfirmationModal,
  CustomPopover,
  DataGrid,
  TextField,
} from "../../../../../../components";
import { useApi, useApiCallback, useColumns } from "../../../../../../hooks";
import { useForm } from "react-hook-form";
import { CaseNameFormType } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { caseNameSchema } from "./validation";
import {
  CaseNameParams,
  DeleteCaseNameParams,
} from "../../../../../../api/types";
import { useExecuteToast } from "../../../../../../contexts";
import { GridMoreVertIcon } from "@mui/x-data-grid";

export const CaseNameManagementBlock = () => {
  const getCaseNamesCb = useApi((api) => api.webbackoffice.getAllCaseNames());

  const createCaseNameCb = useApiCallback((api, args: CaseNameParams) =>
    api.webbackoffice.createCaseName(args)
  );

  const deleteCaseNameCb = useApiCallback((api, args: DeleteCaseNameParams) =>
    api.webbackoffice.deleteCaseName(args)
  );

  const form = useForm<CaseNameFormType>({
    resolver: yupResolver(caseNameSchema),
  });

  const isLoading =
    createCaseNameCb.loading ||
    deleteCaseNameCb.loading ||
    getCaseNamesCb.loading;

  const { control, handleSubmit } = form;
  const caseNames = useMemo(
    () => getCaseNamesCb.result?.data ?? [],
    [getCaseNamesCb.result]
  );
  const { showToast } = useExecuteToast();

  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        sortable: true,
        headerName: "ID",
        flex: 1,
      },
      {
        field: "caseName",
        sortable: true,
        headerName: "Case Name",
        flex: 1,
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
    <Box data-testid="casename-management-block">
      <Container>
        <Alert
          severity="info"
          title="Casename Management"
          description="You can create your Case Names for the Case Study Management"
        />
        <Box
          display="flex"
          width={1}
          justifyContent="space-between"
          alignItems="start"
          gap={4}
        >
          <Card sx={{ w: 1, flex: 1 }}>
            <Box sx={{ w: 1, display: "flex", alignItems: "end", gap: 2 }}>
              <TextField control={control} name="caseName" />
              <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Box>
          </Card>

          <Card sx={{ flex: 1, boxShadow: 1 }}>
            <DataGrid
              data-testid="data-grid-casename"
              sx={{ minHeight: "600px" }}
              isLoading={isLoading}
              initPageSize={10}
              rowSelection={false}
              disableColumnResize
              columns={columns}
              rows={caseNames ?? []}
            />
          </Card>
        </Box>
      </Container>
    </Box>
  );

  async function onSubmit(values: CaseNameFormType) {
    try {
      await createCaseNameCb.execute(values as CaseNameParams);
      getCaseNamesCb.execute();

      showToast("Succesfully Created!", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again later!", "error");
    }
  }

  async function onDelete(caseNameId: string) {
    try {
      await deleteCaseNameCb.execute({
        id: caseNameId,
      } as DeleteCaseNameParams);
      getCaseNamesCb.execute();

      showToast("Succesfully deleted!", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again later!", "error");
    }
  }
};
