/**
Property of the Arxon Solutions, LLC.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import React from "react";
import { Box, Typography } from "@mui/material";
import { DescriptionBoxStyle } from "./styles/style";

interface IssueDescriptionBoxProps {
  description?: string;
  "data-testid"?: string;
}

export const IssueDescriptionBox: React.FC<IssueDescriptionBoxProps> = (
  props
) => {
  return (
    <Box sx={DescriptionBoxStyle}>
      <Typography
        data-testid={props["data-testid"]}
        variant="body2"
        sx={{
          backgroundColor: "transparent",
          color: "#3B0086",
          fontSize: "12px",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        {props.description ?? "No description available."}
      </Typography>
    </Box>
  );
};
