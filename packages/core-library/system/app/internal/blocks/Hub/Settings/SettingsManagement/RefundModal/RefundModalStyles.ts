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

export const dialogBoxSx: SxProps = {
  "& h4": {
    backgroundColor: "#0F2A71",
    height: "100px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    color: "#FFF",
  },

  "& h4 > span.MuiTypography-root": {
    fontSize: "32px",
    fontFamily: "PT Sans",
  },

  "& [data-testid='close_button_container']": {
    width: "unset",
    display: "block",
  },

  "& .MuiDialog-paper": {
    height: "80dvh",
    maxHeight: "800px",
    width: "90%",
    maxWidth: "1400px",
    borderRadius: "20px",
    overflow: "hidden",
    paddingBottom: "50px",
    margin: 0,
  },

  "& .MuiDialogContent-root": {
    padding: 0,
  },
};

export const submitDialogBoxSx: SxProps = {
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    maxWidth: "900px",
    height: "unset",
    minHeight: "450px",
    padding: {
      xs: "20px",
      sm: "40px",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  "& .MuiDialog-paper > .MuiTypography-root": {
    height: "unset",
    padding: 0,
  },

  "& .MuiSvgIcon-root": {
    color: "#333333",
  },

  "& .MuiDialogContent-root": {
    padding: 0,
    height: "unset",
  },
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

export const stepperSx: SxProps = {
  marginX: "auto",
  gap: "10px",
  paddingX: "20px",
  paddingBottom: "40px",
  justifyContent: "center",

  "& .MuiBox-root:has(.MuiTypography-root)": {
    width: "unset",
  },

  "& .MuiStepConnector-root": {
    width: "100%",
    maxWidth: "120px",
  },

  "& .MuiTypography-root": {
    fontSize: "clamp(12px,2vw,20px)",
  },
};
