/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

interface Props {
  value: number;
  size: number;
  color: string;
  thickness?: number;
  trackColor?: string;
  sx?: SxProps<Theme>;
}

export const ProgressRing: React.FC<Props> = ({
  value,
  size,
  color,
  thickness = 5,
  trackColor = "#E6E6EC",
  sx = {},
}) => (
  <Box sx={{ position: "relative", display: "inline-flex", ...sx }}>
    <CircularProgress
      variant="determinate"
      value={100}
      size={size}
      thickness={thickness}
      sx={{
        color: trackColor,
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "butt",
        },
      }}
    />

    <CircularProgress
      variant="determinate"
      value={value}
      size={size}
      thickness={thickness}
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        color,
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "butt",
        },
      }}
    />
  </Box>
);
