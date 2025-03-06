import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ImageUploaderProps {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
}

export const IssueImageUploader: React.FC<ImageUploaderProps> = ({ selectedImage, setSelectedImage }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const triggerFileInput = () => {
    const input = document.getElementById("image-upload-input") as HTMLInputElement;
    if (input) {
      input.value = "";
      input.click();
    }
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item sm="auto">
        <Typography
          variant="body2"
          sx={{ 
            mr: 2, 
            fontFamily: '"PT Sans Narrow", sans-serif', 
            fontWeight: 700 
          }}
        >
          Attach Proof of Resolution:
        </Typography>
      </Grid>
      <Grid item sm="auto">
        {selectedImage ? (
          <Box
            data-testid="trigger-file-input"
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={triggerFileInput}
          >
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          <Box
            data-testid="trigger-file-input"
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "#D9D9D9",
              position: "relative",
            }}
            onClick={triggerFileInput}
          >
            <Box
              sx={{
                width: "18px",
                height: "18px",
                border: "3px solid #666666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
              }}
            >
              <AddIcon 
                sx={{
                  fontSize: 16,
                  color: "#666666",
                  stroke: "#666666",
                  strokeWidth: 2
                }}
              />
            </Box>
          </Box>
        )}
        <input
          type="file"
          id="image-upload-input"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>
  );
};