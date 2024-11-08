import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { PricingFormBlock } from "./pricing/PricingFormBlock";
import { useBusinessQueryContext } from '../../../../../../contexts';
import { Alert, Card, DataGrid } from '../../../../../../components';
import { useColumns } from '../../../../../../hooks';

export const CreatePricingBlock: React.FC = () => {
  const { businessQueryGetAllPricing } = useBusinessQueryContext();
  const { data, isLoading } = businessQueryGetAllPricing(["getAllPricing"]);
  const { columns } = useColumns({
    columns: [
      {
        field: "id",
        headerName: "ID",
        sortable: true,
        width: 120,
      },
      {
        field: "price",
        headerName: "Price",
        sortable: false,
        width: 80,
      },
      {
        field: "currency",
        headerName: "Currency",
        sortable: false,
        width: 80,
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Pricing Management"
          description="You can create your pricing for the entire application."
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
              <Typography variant="button">Create Pricing</Typography>
              <PricingFormBlock />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
              <Typography variant="button">Pricing List</Typography>
              <DataGrid
                columns={columns}
                rows={data ?? []}
                initPageSize={10}
                isLoading={isLoading}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
