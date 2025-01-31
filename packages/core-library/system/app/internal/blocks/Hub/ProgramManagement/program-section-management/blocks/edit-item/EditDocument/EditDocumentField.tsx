/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Button,
  FileUploadField,
  TextField,
} from "../../../../../../../../../../components";
import { formatSectionTitle } from "../../../../../../../../../../utils/FormatSectionTitles";
import { Control } from "react-hook-form";

interface EditDocumentFieldProps {
  section?: string;
  control: Control<{ title: string; link: File[] }>;
  onSave: (values: any) => void;
  linkValue?: string;
}

export const EditDocumentField: React.FC<EditDocumentFieldProps> = ({
  section,
  control,
  linkValue,
  onSave,
}) => {
  return (
    <Box
      sx={{
        mt: 8,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: 12,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(59, 0, 134, 0.05)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: 4, borderBottom: "2px solid #3B0086" }}
        >
          Edit {formatSectionTitle(section)} item
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#3B0086" }}>Title*:</Typography>
            <TextField
              name="title"
              control={control}
              placeholder="Enter title"
              sx={{
                borderRadius: "10px",
                width: "100%",
                background: "white",
              }}
              inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#3B0086", mb: 2 }}>Link*:</Typography>
            <Box sx={{ display: "flex", alignItems: "left", lineHeight: 0 }}>
              <FileUploadField
                triggerLabel={linkValue || "Upload Document"}
                control={control}
                name="link"
              />
            </Box>
          </Box>

          <Button
            sx={{
              mt: 4,
              alignSelf: "flex-end",
              width: "157px",
              background: "#3B0086",
              borderRadius: "10px",
              color: "white",
            }}
            onClick={onSave}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
