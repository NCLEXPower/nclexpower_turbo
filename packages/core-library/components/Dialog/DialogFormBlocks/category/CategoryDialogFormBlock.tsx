import React from "react";
import { CategoryForm } from "./CategoryDialogForm";
import { Box } from "@mui/material";
import { CategoryFormType } from "./validation";
import {
  useBusinessQueryContext,
  useDialogContext,
} from "../../../../contexts";

export function CategoryDialogFormBlock() {
  const { closeDialog } = useDialogContext();
  const { businessQueryCreateCategory, businessQuerySelectAllCategories } =
    useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreateCategory();
  const { refetch } = businessQuerySelectAllCategories(["selectAllCategories"]);

  async function onSubmit(values: CategoryFormType) {
    await mutateAsync({ ...values });
    closeDialog();
    refetch();
  }

  return (
    <Box data-testId="category-form">
      <CategoryForm onSubmit={onSubmit} submitLoading={isLoading} />
    </Box>
  );
}
