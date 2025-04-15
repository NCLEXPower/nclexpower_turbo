import React from "react";
import { Typography } from "@mui/material";
import { DescriptionBoxStyle } from "./style";

interface IssueDescriptionBoxProps {
  description?: string;
  "data-testid"?: string; 
}

export const IssueDescriptionBox: React.FC<IssueDescriptionBoxProps> = (props) => {
  
  return (
    <DescriptionBoxStyle>
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
        [{props.description ?? "No description available."}]
      </Typography>
    </DescriptionBoxStyle>
  );
};