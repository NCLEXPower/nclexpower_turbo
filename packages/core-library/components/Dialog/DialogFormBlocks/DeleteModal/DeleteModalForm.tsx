/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
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
  });

  const { control, setValue, formState } = form;

  const { isValid } = formState;
  useEffect(() => {
    setValue("id", data.id);
    setValue("text", data.text);
  }, []);

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
      <Box>
        <EvaIcon
          name="alert-triangle-outline"
          width={75}
          height={75}
          ariaHidden
          fill="#D44333"
        />
      </Box>
      <Typography data-testId="text-content">
        This will permanently delete the <b>{data.text}</b>
      </Typography>
      <Box width="50%">
        <Typography
          data-testId="render-text"
          sx={{
            userSelect: "none",
          }}
        >
          Type text below to delete
        </Typography>
        <Typography
          data-testId="render-test-text"
          sx={{
            userSelect: "none",
          }}
        >
          "<b>{data.text}</b>"
        </Typography>
        <TextField
          control={control}
          name="inputText"
          inputProps={{ "data-testid": "delete-input" }}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        display="flex"
        width="50%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={handleDelete} width="100%" disabled={!isValid}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};
