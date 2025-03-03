import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

interface CustomDescriptionBoxProps {
  description?: string;
}

export const IssueDescriptionBox: React.FC<CustomDescriptionBoxProps> = ({ description }) => {
  const StyledDiv = styled("div")({
    marginTop: "16px",
    width: "100%",
    height: "90px",
    maxHeight: "170px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#F2F2F2",
    color: "#3B0086",
    outline: "none",
    resize: "none",
    overflowY: "auto",
    "&::placeholder": {
      color: "#3B0086", 
      opacity: 2, 
    },
    "&::-webkit-scrollbar": {
      width: "8px",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#d9d3db",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#8F6FB7", 
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#7A5C9F", 
    },
  });

  return (
    <StyledDiv>
      <Typography
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
    </StyledDiv>
  );
};