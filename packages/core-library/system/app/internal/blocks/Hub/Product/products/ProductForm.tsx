import { Box, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { productSchema, ProductFormType } from "./validation";
import React from "react";
import { useBusinessQueryContext } from '../../../../../../../contexts';
import { useFormFocusOnError } from '../../../../../../../hooks';
import { Button, GenericSelectField, MultipleSelectField, SelectOption, TextField } from '../../../../../../../components';

type Props = {
  onSubmit: (values: ProductFormType) => void;
  submitLoading?: boolean;
};

export const ProductForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { businessQueryGetAllPricing, businessQuerySelectAllCategories } =
    useBusinessQueryContext();
  const { data, isLoading } = businessQueryGetAllPricing(["selectAllPricing"]);
  const { data: categoryData } = businessQuerySelectAllCategories([
    "selectAllCategories",
  ]);
  const form = useForm<ProductFormType>({
    mode: "all",
    resolver: yupResolver(productSchema),
    defaultValues: productSchema.getDefault(),
  });
  const { control, handleSubmit, clearErrors, setFocus, formState } = form;
  useFormFocusOnError<ProductFormType>(formState.errors, setFocus);

  // mock inclusions
  const inclusions: SelectOption[] = [
    {
      label: "Inclusions 1 test",
      value: "Inclusions 1 test",
    },
    {
      label: "Inclusions 2 test",
      value: "Inclusions 2 test",
    },
  ];

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <TextField<ProductFormType>
            control={control}
            name="productName"
            label="Product name"
            onBlur={() => clearErrors()}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField<ProductFormType>
            control={control}
            name="productDescription"
            label="Product description"
            onBlur={() => clearErrors()}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <GenericSelectField
        control={control}
        name="categoryId"
        options={categoryData ?? []}
        label="Category"
      />
      <GenericSelectField
        control={control}
        name="pricingId"
        options={data ?? []}
        label="Pricing"
      />
      <GenericSelectField
        control={control}
        name="programType"
        options={[
          {
            label: "Standard 23Days",
            value: 0,
          },
          {
            label: "Fast Track 8Days",
            value: 1,
          },
        ]}
        label="Program type"
      />
      <GenericSelectField
        control={control}
        name="programTitle"
        options={[
          {
            label: "Registered Nurse | RN",
            value: 0,
          },
          {
            label: "Practical Nurse | PN",
            value: 1,
          },
        ]}
        label="Program type"
      />
      <MultipleSelectField
        control={control}
        name="features"
        label="Inclusions"
        options={inclusions}
        multiple
        sx={{ mt: 3, width: "100%" }}
      />
      <Box sx={{ float: "right" }} mt={5} mb={5}>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};
