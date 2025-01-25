import { SxProps } from "@mui/material";

export const gridBoxSx: SxProps = {
  height: "90px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "20px",
  borderBottom: "2px solid #0F2A714D",
  borderRight: "2px solid #0F2A714D",
};

export const modalBoxSx: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80dvh",
  maxHeight: "800px",
  width: "90%",
  maxWidth: "1400px",
  borderRadius: "20px",
  overflow: "hidden",
  backgroundColor: "#FFF",
  paddingBottom: "80px",
};

export const circleSx: SxProps = {
  width: "clamp(20px,35px,50px)",
  height: "clamp(20px,35px,50px)",
  borderRadius: "9999px",
  backgroundColor: "#0F2A71",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#FFF",
  fontSize: "clamp(15px,2vw,20px)",
  fontWeight: 700,
  flexShrink: 0,
};

export const btnSx: SxProps = {
  borderRadius: "5px",
  minHeight: "50px",
  minWidth: {
    xs: "230px",
    sm: "150px",
  },
  border: "2px solid #0F2A71",
  padding: 0,
};

export const cardSx = {
  padding: "30px",
  bgcolor: "#0F2A710D",
  borderRadius: "20px",
};
