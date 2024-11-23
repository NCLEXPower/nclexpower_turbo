import React, { useMemo } from "react";
import { TextField } from "../../../forms/TextField";
import { Button } from "../../../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CategoryFormType, categorySchema } from "./validation";
import { useFormFocusOnError } from "../../../../hooks";
import { Box, Grid } from "@mui/material";
import { GenericSelectField } from "../../../Textfield/GenericSelectField";
import { useBusinessQueryContext } from '../../../../contexts';

interface Props {
  onSubmit: (values: CategoryFormType) => void;
  submitLoading?: boolean;
}

export const CategoryForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { businessQueryGetAllCategory } = useBusinessQueryContext()
  const { data } = businessQueryGetAllCategory(["GetAllCategoryApi"])

  const categoryList = useMemo(() => data ? data?.map((value) => ({
    label: value.categoryTypeName,
    value: value.categoryTypeName
  })) : []
    , [data])


  const { control, handleSubmit, clearErrors, setFocus, formState } =
    useForm<CategoryFormType>({
      mode: "all",
      resolver: yupResolver(categorySchema),
      defaultValues: categorySchema.getDefault(),
    });

  useFormFocusOnError<CategoryFormType>(formState.errors, setFocus);

  return (
    <Grid data-testid="category-dialog-form" container direction="column" rowSpacing={4} gap={2}>
      <Grid item md={6} lg={4}>
        <TextField<CategoryFormType>
          name="categoryName"
          control={control}
          label="Category name"
          onBlur={() => clearErrors()}
        />
      </Grid>
      <Grid item md={6} lg={4}>
        <TextField<CategoryFormType>
          name="categoryDescription"
          control={control}
          label="Category description"
          multiline
          rows={4}
          onBlur={() => clearErrors()}
        />
      </Grid>
      <Grid item md={6} lg={4}>
        <GenericSelectField
          control={control}
          name="categoryType"
          options={categoryList}
          label="Select Category type"
        />
      </Grid>
      <Box marginTop={5}>
        <Button
          sx={{ float: "right" }}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          loading={submitLoading}
          disabled={submitLoading}
        >
          Create
        </Button>
      </Box>
    </Grid>
  );
};
