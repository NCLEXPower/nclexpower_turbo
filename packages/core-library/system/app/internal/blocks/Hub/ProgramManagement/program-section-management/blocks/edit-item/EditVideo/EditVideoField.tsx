/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Button,
  ControlledRichTextEditor,
  FileUploadField,
  TextField,
} from "../../../../../../../../../../components";
import { formatSectionTitle } from "../../../../../../../../../../utils";
import { Control } from "react-hook-form";
import Image from "next/image";
import { noVideoImage } from "../../../../../../../../../../assets";
import ReactPlayer from "react-player";

interface EditVideoFieldProps {
  section?: string;
  control: Control<{
    title: string;
    link: File[];
    videoPlaceholder: File[];
    authorName: string;
    authorImage: File[];
    description: string;
  }>;
  onSave: () => void;
  videoFileName: string;
  videoLink: File[];
  videoPlaceholderFileName: string;
  videoPlaceholderLink: File[];
  authorImageFileName: string;
  authorImageLink: File[];
  isLoading?: boolean;
}

export const EditVideoField: React.FC<EditVideoFieldProps> = ({
  section,
  control,
  onSave,
  videoFileName,
  videoLink,
  videoPlaceholderFileName,
  videoPlaceholderLink,
  authorImageFileName,
  authorImageLink,
  isLoading,
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
          sx={{
            padding: 4,
            borderBottom: "2px solid #3B0086",
            color: "#3B0086",
          }}
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
                <ReactPlayer
                  url={
                    videoFileName
                      ? videoFileName.startsWith("http")
                        ? videoFileName
                        : URL.createObjectURL(videoLink[0])
                      : noVideoImage
                  }
                  playing
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
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
                  acceptTypes={["mp4", "webm", "ogg", "avi", "mov", "mkv"]}
                  triggerLabel="Change Video"
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
                      ? videoPlaceholderFileName.startsWith("http")
                        ? videoPlaceholderFileName
                        : URL.createObjectURL(videoPlaceholderLink[0])
                      : noVideoImage
                  }
                  fill
                  alt="video placeholder"
                  style={{
                    objectFit: "cover",
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
                  acceptTypes={["png", "jpeg", "jpg", "gif", "webp"]}
                  triggerLabel="Change Video Placeholder"
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
                      ? authorImageFileName.startsWith("http")
                        ? authorImageFileName
                        : URL.createObjectURL(authorImageLink[0])
                      : noVideoImage
                  }
                  fill
                  alt="author image"
                  style={{
                    objectFit: "cover",
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
                  acceptTypes={["png", "jpeg", "jpg", "gif", "webp"]}
                  triggerLabel="Change Author Image"
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
            loading={isLoading}
            onClick={onSave}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
