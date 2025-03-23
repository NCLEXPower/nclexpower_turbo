import { Box, SxProps } from "@mui/material";
import React, { useRef } from "react";
import { Button } from "./Button";

interface Props {
  name: string;
  acceptTypes?: string[];
  isDisabled?: boolean;
  onUpload(files: FileList | null): void;
  text: string;
  sx?: SxProps;
}

export const FileUploadButton: React.FC<Props> = ({
  name,
  isDisabled,
  acceptTypes,
  onUpload,
  text,
  sx
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <input
        hidden
        id={name}
        name={name}
        ref={ref}
        type="file"
        accept={acceptTypes?.map((t) => `.${t}`).join(",")}
        data-testid="hidden-upload-input"
        multiple={false}
        disabled={isDisabled}
        value={""}
        onChange={(e) => !isDisabled && onUpload(e.target.files)}
      />
      <Button
        data-testid="upload-button"
        onClick={handleClick}
        disabled={isDisabled}
        sx={sx}
      >
        <Box
          component="label"
          htmlFor={name}
          sx={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          {text}
        </Box>
      </Button>
    </React.Fragment>
  );

  function handleClick() {
    ref.current?.focus();
    ref.current?.click();
  }
};
