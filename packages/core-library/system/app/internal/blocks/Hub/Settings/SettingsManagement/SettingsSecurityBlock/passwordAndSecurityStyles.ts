import { SxProps } from "@mui/material";

export const btnSx: SxProps = {
  minWidth: "95px",
  minHeight: "40px",
  borderRadius: "5px",
  padding: 0,
  fontSize: "20px",
  fontWeight: 700,
  backgroundColor: "#FFF",
  boxShadow: "none",
  border: "1px solid #0F2A71",
  color: "#0F2A71",
};

export const switchSx: SxProps = {
  width: 60,
  height: 30,
  padding: 0,
  marginX: "auto",
  borderRadius: "50px",
  "& .MuiSwitch-track": {
    width: 60,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#ccc",
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    width: 30,
    height: 30,
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 0,
    top: "50%",
    transform: "translateY(-50%)",
    "&.Mui-checked": {
      transform: "translateY(-50%) translateX(30px)",
    },
  },
};
