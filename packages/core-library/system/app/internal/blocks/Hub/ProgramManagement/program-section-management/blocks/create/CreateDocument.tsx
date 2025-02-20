/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import {
  Button,
  ComponentLoader,
  FileUploadField,
  TextField,
} from "../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { documentSchema, SectionFormType } from "../../validation";
import { formatSectionTitle } from "../../../../../../../../../utils";
import { useFileUpload } from "../../../../../../../../../hooks";

interface CreateDocumentProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType, reset: () => void) => void;
  isLoading?: boolean;
}

export const CreateDocument: React.FC<CreateDocumentProps> = ({
  section,
  contentLoader,
  onSubmit,
  isLoading,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(documentSchema),
    defaultValues: documentSchema.getDefault(),
  });

  const { control, handleSubmit, watch, setValue, reset } = form;
  const { handleFileChange } = useFileUpload(setValue);

  const linkValue = watch("link");

  if (contentLoader) {
    return <ComponentLoader />;
  }

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
          Create {formatSectionTitle(section)} item
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
            <Typography sx={{ color: "#3B0086" }}>Link*:</Typography>
            <Box sx={{ display: "flex", alignItems: "left", lineHeight: 0 }}>
              <FileUploadField
                acceptTypes={[
                  section === "document" ? "pdf" : "zip",
                  "x-zip-compressed",
                  "x-rar-compressed",
                  "x-7z-compressed",
                  "x-tar",
                  "gzip",
                ]}
                triggerLabel={linkValue?.[0]?.name || "Upload Document"}
                control={control}
                name="link"
                onUpload={(fileList) => handleFileChange("link", fileList)}
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
            loading={isLoading}
            onClick={handleSubmit((values) => onSubmit(values, reset))}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
