import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { Alert, Card, DataGrid } from "../../../../../../../components";
import {
  useBusinessQueryContext,
  useDialogContext,
} from "../../../../../../../contexts";
import { useColumns } from "../../../../../../../hooks";

export const CreateCategoryBlock: React.FC = () => {
  const { businessQuerySelectAllCategories, businessQueryDeleteCategory } =
    useBusinessQueryContext();
  const { openDialog } = useDialogContext();
  const { mutateAsync } = businessQueryDeleteCategory();
  const { data, isLoading, refetch } = businessQuerySelectAllCategories([
    "selectAllCategories",
  ]);

  const categoryTypes = ["PRICING", "REPORT ISSUE", "CLIENT NEEDS", "CONTENT AREA", "COGNITIVE LEVEL", "CONTACT CONCERN"]

  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        headerName: "ID",
        sortable: true,
        width: 300,
      },
      {
        field: "categoryName",
        headerName: "Category",
        sortable: false,
        width: 150,
      },
      {
        field: "categoryDescription",
        headerName: "Category Description",
        sortable: false,
        width: 250,
      },
      {
        field: "categoryType",
        headerName: "Type",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          const { categoryType: categoryIndex } = params.row
          return <Chip variant="filled" size="small" label={categoryTypes[categoryIndex]} />;
        },
      },
      {
        field: "",
        headerName: "Action",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          return (
            <Box>
              <Button
                variant="text"
                onClick={async () => await deleteCategory(params.row.id)}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    ],
  });

  return (
    <Box data-testid="category-block">
      <Container>
        <Alert
          severity="info"
          title="Category Management"
          description="You can create your category for the entire application."
        />
        <Button
          sx={{ float: "right", mt: 2, mb: 2 }}
          onClick={() => openDialog("category_form", "Category Form")}
        >
          Create
        </Button>
        <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
          <Typography variant="body1">Category List</Typography>
          <hr />
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={data ?? []}
            isLoading={isLoading}
          />
        </Card>
      </Container>
    </Box>
  );

  async function deleteCategory(id: string) {
    await mutateAsync(id);
    refetch();
  }
};
