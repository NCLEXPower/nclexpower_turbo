import React from "react";
import { Typography } from "@mui/material";
import { DescriptionBoxStyle } from "./DescriptionBoxStyle";

interface CustomDescriptionBoxProps {
  description?: string;
  "data-testid"?: string; 
}

export const IssueDescriptionBox: React.FC<CustomDescriptionBoxProps> = (props) => {
  const { description, "data-testid": testId } = props;

  return (
    <DescriptionBoxStyle>
      <Typography
        data-testid={testId}
        variant="body2"
        sx={{
          backgroundColor: "transparent",
          color: "#3B0086",
          fontSize: "12px",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        [{description || "No description available."}]
      </Typography>
    </DescriptionBoxStyle>
  );
};