/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import {
  useBusinessQueryContext,
  useDialogContext,
  useExecuteToast,
} from "../../../../contexts";
import { useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { UpdateInclusionSchema, UpdateInclusionType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { Button, TextField, TextAreaField } from "../../..";
import { useQueryClient } from "react-query";
import { InclusionIdAtom } from "./useAtomic";

export const InclusionEditForm = () => {
  const Inclusion = useAtomValue(InclusionIdAtom);
  const { businessQueryUpdateInclusion } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryUpdateInclusion();
  const { closeDialog } = useDialogContext();
  const { executeToast } = useExecuteToast();
  const queryClient = useQueryClient();

  const defaultValues: UpdateInclusionType = {
    id: Inclusion?.id,
    option: Inclusion?.option || "",
    description: (Inclusion as any)?.description || "",
  };

  const form = useForm<UpdateInclusionType>({
    resolver: yupResolver(UpdateInclusionSchema),
    defaultValues,
  });
  const { control, handleSubmit, reset } = form;
  async function onSubmit(values: UpdateInclusionType) {
    try {
      const params = {
        ...values,
        id: values.id || "",
      };

      const response = await mutateAsync(params as any);
      if (response.data === 409) {
        executeToast("Inclusion already exist", "top-right", true, {
          type: "error",
        });
      }
      reset();
      closeDialog();
      queryClient.invalidateQueries("getAllInclusionApi");
    } catch {
      executeToast(
        "Somethin went wrong. Please try again later",
        "top-right",
        true,
        { type: "error" }
      );
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      data-testid="inclusion-edit-form"
      gap={3}
    >
      <TextField label="Inclusion" control={control} name="option" />
      <TextAreaField label="Description" control={control} name="description" />
      <Box alignSelf="flex-end">
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </Box>
    </Box>
  );
};
