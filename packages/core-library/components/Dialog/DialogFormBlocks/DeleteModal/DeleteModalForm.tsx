/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EvaIcon } from "../../../EvaIcon";
import { DeleteConfirmationSchema, DeleteConfirmationType } from "./validation";
import { TextField, Button } from "../../../../components";

interface Props {
  handleDelete: () => void;
  data: DeleteConfirmationType;
}

export const DeleteConfirmationForm: React.FC<Props> = ({
  handleDelete,
  data,
}) => {
  const form = useForm({
    mode: "all",
    resolver: yupResolver(DeleteConfirmationSchema),
    defaultValues: {
      id: data.id,
      text: data.text,
    },
  });

  const { control, formState } = form;
  const { isValid } = formState;

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="24px"
    >
      <EvaIcon
        name="alert-triangle-outline"
        width={75}
        height={75}
        ariaHidden
        fill="#D44333"
      />
      <Typography data-testId="text-content">
        This will permanently delete the <b>{data.text}</b>
      </Typography>
      <Box width="50%">
        <Typography
          data-testId="render-text"
          sx={{ userSelect: "none", mb: 1 }}
        >
          Type text below to delete <br />"<b>{data.text}</b>"
        </Typography>
        <TextField
          control={control}
          name="inputText"
          inputProps={{ "data-testid": "delete-input" }}
          sx={{ width: "100%" }}
        />
      </Box>
      <Button
        onClick={handleDelete}
        width="50%"
        disabled={!isValid}
        sx={{ mt: 2 }}
      >
        Confirm
      </Button>
    </Box>
  );
};
