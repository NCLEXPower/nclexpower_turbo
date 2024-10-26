import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { ProductFormBlock } from "./products/ProductFormBlock";
import { useBusinessQueryContext, useExecuteToast } from '../../../../../../contexts';
import { useColumns } from '../../../../../../hooks';
import { Alert, Card, DataGrid } from '../../../../../../components';
import { ProductSetStatusParams } from '../../../../../../api/types';


export const CreateProductBlock: React.FC = () => {
  const { businessQueryGetAllProducts, businessQuerySetProductStatus } =
    useBusinessQueryContext();
  const { mutateAsync } = businessQuerySetProductStatus();
  const { data, refetch } = businessQueryGetAllProducts(["SelectAllProducts"]);
  const { executeToast } = useExecuteToast();
  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        sortable: true,
        headerName: "ID",
        width: 250,
      },
      {
        field: "productName",
        headerName: "Product",
        sortable: false,
        width: 150,
      },
      {
        field: "productDescription",
        headerName: "Description",
        sortable: false,
        width: 150,
      },
      {
        field: "programType",
        headerName: "Type",
        sortable: false,
        width: 190,
        renderCell: (params) => {
          if (params.row.programType === 0) {
            return <Chip label="STANDARD" variant="filled" size="small" />;
          }
          return <Chip label="FAST TRACK" variant="filled" size="small" />;
        },
      },
      {
        field: "productStatus",
        headerName: "Status",
        sortable: false,
        width: 90,
        renderCell: (params) => {
          if (params.row.productStatus === 1) {
            return (
              <Chip
                label="DISABLE"
                color="error"
                variant="outlined"
                size="small"
              />
            );
          }
          return (
            <Chip
              label="ACTIVE"
              color="success"
              variant="outlined"
              size="small"
            />
          );
        },
      },
      {
        field: "",
        headerName: "Actions",
        sortable: false,
        width: 150,
        renderCell: (params) => {
          if (params.row.productStatus === 1) {
            return (
              <Button
                onClick={async () =>
                  await updateProductStatus({
                    productId: params.row.id,
                    productStatus: 0,
                  })
                }
                color="success"
                variant="contained"
                size="small"
              >
                ACTIVATE
              </Button>
            );
          }
          return (
            <Button
              onClick={async () =>
                await updateProductStatus({
                  productId: params.row.id,
                  productStatus: 1,
                })
              }
              color="error"
              variant="contained"
              size="small"
            >
              DISABLE
            </Button>
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
          title="Product Management"
          description="You can create your product for the entire application."
        />
        <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
          <Typography variant="button">Create Product</Typography>
          <ProductFormBlock />
        </Card>
        <Card sx={{ mt: 5 }}>
          <Typography variant="button">Product list</Typography>
          <DataGrid
            columns={columns}
            initPageSize={10}
            isLoading={false}
            rows={data ?? []}
          />
        </Card>
      </Container>
    </Box>
  );

  async function updateProductStatus(params: ProductSetStatusParams) {
    const result = await mutateAsync({ ...params });
    if (result.data === 1019) {
      executeToast("You can't set more than 2 products", "top-right", true, {
        type: "error",
      });
    }
    executeToast("Successfully set to active", "top-right", true, {
      type: "success",
    });
    refetch();
  }
};
