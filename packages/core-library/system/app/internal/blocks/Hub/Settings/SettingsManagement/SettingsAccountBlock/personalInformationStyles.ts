import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const textFieldSx: SxProps = {
  borderRadius: "10px",
  padding: 0,
  height: "45px",
};

export const inputStyle: CSSProperties = {
  borderRadius: "10px",
  padding: "0 24px 0 50px",
  height: "45px",
};

export const buttonSx: SxProps = {
  minWidth: "90px",
  minHeight: "30px",
  backgroundColor: "transparent",
  borderRadius: "50px",
  border: "1px solid #33333333",
  boxShadow: "none",
  color: "black",
  fontWeight: 400,
  padding: 0,
};

export const inputIconStyle: CSSProperties = {
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
};
