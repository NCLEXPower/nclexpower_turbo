/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import {
  Button,
  ComponentLoader,
  ControlledRichTextEditor,
  FileUploadField,
  TextField,
} from "../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoSchema, SectionFormType } from "../../validation";
import { formatSectionTitle } from "../../../../../../../../../utils/FormatSectionTitles";
import Image from "next/image";
import { noVideoImage } from "../../../../../../../../../assets";
import { useFileUpload } from "../../../../../../../../../hooks";

interface CreateVideo {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

export const CreateVideo: React.FC<CreateVideo> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(videoSchema),
    defaultValues: videoSchema.getDefault(),
  });

  const { control, handleSubmit, watch, getValues, setValue } = form;
  const { handleFileChange } = useFileUpload(setValue);

  const videoLink = getValues("link");
  const videoFileName = videoLink && videoLink[0]?.name;

  const videoPlaceholderLink = getValues("videoPlaceholder");
  const videoPlaceholderFileName =
    videoPlaceholderLink && videoPlaceholderLink[0]?.name;

  const authorImageLink = getValues("authorImage");
  const authorImageFileName = authorImageLink && authorImageLink[0]?.name;

  const linkValue = watch("link");
  const authorImageValue = watch("authorImage");
  const videoPlaceholderValue = watch("videoPlaceholder");

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
          sx={{
            padding: 4,
            borderBottom: "2px solid #3B0086",
            color: "#3B0086",
          }}
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
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row", lg: "row" },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#3B0086", mb: 2 }}>
                Video Link*:
              </Typography>

              <Box
                sx={{
                  height: "250px",
                  width: "400px",
                  borderRadius: "10px",
                  background: "gray",
                  position: "relative",
                  border: "1px solid #3B0086",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={
                    videoFileName
                      ? URL.createObjectURL(videoLink[0])
                      : noVideoImage
                  }
                  alt="program thumbnail"
                  layout="fill"
                  objectFit="cover"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.58) 100%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    mixBlendMode: "multiply",
                  }}
                ></Box>
                <FileUploadField
                  triggerLabel={linkValue?.[0]?.name || "Upload Video"}
                  control={control}
                  name="link"
                  sx={{
                    boxShadow: "none",
                    fontSize: "12px",
                    fontWeight: "900",
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "transparent",
                    "&:hover": {
                      background: "transparent",
                      boxShadow: "none",
                    },
                  }}
                  onUpload={(fileList) => handleFileChange("link", fileList)}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#3B0086", mb: 2 }}>
                Video Placeholder*:
              </Typography>

              <Box
                sx={{
                  height: "250px",
                  width: "320px",
                  borderRadius: "10px",
                  background: "gray",
                  position: "relative",
                  border: "1px solid #3B0086",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={
                    videoPlaceholderFileName
                      ? URL.createObjectURL(videoPlaceholderLink[0])
                      : noVideoImage
                  }
                  alt="program thumbnail"
                  layout="fill"
                  objectFit="cover"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.58) 100%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    mixBlendMode: "multiply",
                  }}
                ></Box>
                <FileUploadField
                  triggerLabel={
                    videoPlaceholderValue?.[0]?.name ||
                    "Upload Video Placeholder"
                  }
                  control={control}
                  name="videoPlaceholder"
                  sx={{
                    boxShadow: "none",
                    fontSize: "12px",
                    fontWeight: "900",
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "transparent",
                    "&:hover": {
                      background: "transparent",
                      boxShadow: "none",
                    },
                  }}
                  onUpload={(fileList) =>
                    handleFileChange("videoPlaceholder", fileList)
                  }
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#3B0086", mb: 2 }}>
                Author Image*:
              </Typography>

              <Box
                sx={{
                  height: "250px",
                  width: "320px",
                  borderRadius: "10px",
                  background: "gray",
                  position: "relative",
                  border: "1px solid #3B0086",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={
                    authorImageFileName
                      ? URL.createObjectURL(authorImageLink[0])
                      : noVideoImage
                  }
                  alt="program thumbnail"
                  layout="fill"
                  objectFit="cover"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.58) 100%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    mixBlendMode: "multiply",
                  }}
                ></Box>
                <FileUploadField
                  triggerLabel={
                    authorImageValue?.[0]?.name || "Upload Author Image"
                  }
                  control={control}
                  name="authorImage"
                  sx={{
                    boxShadow: "none",
                    fontSize: "12px",
                    fontWeight: "900",
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "transparent",
                    "&:hover": {
                      background: "transparent",
                      boxShadow: "none",
                    },
                  }}
                  onUpload={(fileList) =>
                    handleFileChange("authorImage", fileList)
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "#3B0086" }}>Author Name*:</Typography>
            <TextField
              name="authorName"
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

          <Typography sx={{ color: "#3B0086" }}>Description*:</Typography>
          <Box
            sx={{
              background: "white",
              padding: "20px",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ControlledRichTextEditor
              control={control}
              editorFor="casestudy"
              placeholder="Add description..."
              name="description"
            />
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
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
