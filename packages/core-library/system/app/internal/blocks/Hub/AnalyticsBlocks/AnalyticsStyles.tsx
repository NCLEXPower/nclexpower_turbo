import { SxProps } from "@mui/material";

export const gridItemSx: SxProps = {
  padding: "10px",
};

export const cardBox: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  padding: "30px",
  borderRadius: "15px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
};

export const gaugeSubTitle: SxProps = {
  position: "absolute",
  fontSize: "12px",
  fontWeight: "bold",
  right: 0,
  bottom: "-8px",
  lineHeight: 1,
};

export const labelBox: SxProps = {
  width: "20px",
  height: "20px",
  borderRadius: "4px",
  marginTop: "3px",
};
