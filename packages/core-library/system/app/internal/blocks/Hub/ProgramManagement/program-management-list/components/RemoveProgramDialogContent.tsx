/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, TextField } from "../../../../../../../../components";
import { RemoveProgramFormType, removeProgramSchema } from "../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface RemoveProgramDialogContentProps {
  onSubmit: (values: RemoveProgramFormType) => void;
  closeModal: () => void;
  programTitle: string;
}

export const RemoveProgramDialogContent: React.FC<
  RemoveProgramDialogContentProps
> = ({ closeModal, programTitle, onSubmit }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(removeProgramSchema),
    defaultValues: removeProgramSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "#D40000",
          px: 4,
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: "18px",
            color: "white",
          }}
        >
          Delete Topic
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 4,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: "18px",
            color: "#393939",
            textAlign: "center",
          }}
        >
          Are you sure you want to delete this topic? <br /> [{programTitle}]
        </Typography>
        <Box sx={{ px: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "regular",
                fontFamily: "'PT Sans Narrow', sans-serif",
                fontSize: "14px",
                color: "#393939",
                textAlign: "center",
                mt: 4,
                py: 2,
                userSelect: "none",
                cursor: "not-allowed",
              }}
              onCopy={(e) => e.preventDefault()}
            >
              In order to delete this topic, type{" "}
              <strong>[{programTitle}]</strong> in the text below to confirm.
            </Typography>

            <TextField
              name="program"
              control={control}
              placeholder="Program Topic"
              sx={{ borderRadius: "10px", width: "100%" }}
              inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
            />
            <Stack direction="row" spacing={4} mt={4}>
              <Button
                sx={{
                  background: "#B0B0B0",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#3090dc",
                  },
                }}
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Delete
              </Button>
              <Button
                sx={{
                  background: "#D40000",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  },
                }}
                fullWidth
                variant="contained"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
