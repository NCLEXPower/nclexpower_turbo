import { SxProps } from "@mui/material";

export const pNCard: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  borderRadius: "15px",
  backgroundColor: "#084A4E",
  padding: {
    xs: "15px",
    sm: "25px",
  },
  minHeight: {
    xs: "150px",
    sm: "200px",
    lg: "250px",
  },
  minWidth: {
    xs: "320px",
    sm: "500px",
  },
  maxWidth: "600px",
};

export const buttonSx: SxProps = {
  borderRadius: "10px",
  boxShadow: "none",
  fontSize: "clamp(15px, 2vw, 20px)",
  fontWeight: 700,
  fontFamily: "'PT Sans','sans-serif'",
  minHeight: {
    xs: "35px",
    sm: "45px",
  },
};
