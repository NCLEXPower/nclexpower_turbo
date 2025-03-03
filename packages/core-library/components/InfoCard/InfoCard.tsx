import React from "react";
import { Alert as MuiAlert, AlertTitle, Typography } from "@mui/material";
import { InfoIcon } from "./InfoIcon";

interface InfoCardProps {
  title: string;
  description: string;
  style?: React.CSSProperties;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, style }) => {
  return (
    <MuiAlert
      severity="info"
      icon={<InfoIcon />}
      style={{
        backgroundColor: "#BD8FDB4F",
        color: "#3B0086A3",
        border: "1px solid #3B0086",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        ...style,
      }}
      sx={{
        display: "flex",
        gap: "8px",
        "& .MuiAlert-icon": {
          marginTop: "3px",
          marginLeft: "12px",
          fontSize: "28px",
        },
      }}
    >
      <AlertTitle sx={{ fontFamily: '"Poppins", sans-serif', fontSize: "18px" }}>{title}</AlertTitle>
      <Typography sx={{ fontFamily: '"Poppins", sans-serif', fontSize: "14px"  }}>{description}</Typography>
    </MuiAlert>
  );
};
