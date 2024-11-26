import React from "react";
import { TextField } from "../../../forms/TextField";
import { Button } from "../../../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CategoryFormType, categorySchema } from "./validation";
import { useFormFocusOnError } from "../../../../hooks";
import { Box, Grid } from "@mui/material";
import { GenericSelectField } from "../../../Textfield/GenericSelectField";

interface Props {
  onSubmit: (values: CategoryFormType) => void;
  submitLoading?: boolean;
}

export const CategoryForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { control, handleSubmit, clearErrors, setFocus, formState } =
    useForm<CategoryFormType>({
      mode: "all",
      resolver: yupResolver(categorySchema),
      defaultValues: categorySchema.getDefault(),
    });

  useFormFocusOnError<CategoryFormType>(formState.errors, setFocus);

  return (
    <Grid container direction="column" rowSpacing={4} gap={2}>
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
          options={[
            { label: "PRICING", value: 0 },
            { label: "REPORT ISSUE", value: 1 },
            { label: "CLIENT NEEDS", value: 2 },
            { label: "CONTENT AREA", value: 3 },
            { label: "COGNITIVE LEVEL", value: 4 },
          ]}
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
