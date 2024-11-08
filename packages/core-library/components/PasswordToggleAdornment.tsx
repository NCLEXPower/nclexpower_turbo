/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Box } from "@mui/material";
import { IconButton, EvaIcon } from "../components";

interface PasswordToggleAdornmentProps {
  showPassword: boolean;
  onClick: () => void;
};

export const PasswordToggleAdornment: React.FC<PasswordToggleAdornmentProps> = ({
  showPassword,
  onClick,
}) => {
  return (
    <IconButton aria-label="toggle password visibility" onClick={onClick} size="small" edge="end">
      <Box
        sx={{
          position: "relative",
          "#open-icon": {
            display: showPassword ? "flex" : "none",
          },
          "#close-icon": {
            display: showPassword ? "none" : "flex",
          },
        }}
      >
        <EvaIcon id="close-icon" name="eye-off-outline" width={30} height={30} aria-hidden="true" />
        <EvaIcon id="open-icon" name="eye-outline" width={30} height={30} aria-hidden="true" />
      </Box>
    </IconButton>
  );
};