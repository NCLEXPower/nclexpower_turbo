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

export const getTabSx = (index: number): SxProps => {
  const isUsersTab = index === 3;
  return {
    borderRadius: "20px 20px 0px 0px",
    color: isUsersTab ? "#103436" : "#0F2A71",
    height: "40px",
    mr: index === 2 ? "50px" : "1px",

    "&.MuiButtonBase-root": {
      bgcolor: "#FFF",
      borderBottom: "none",
    },
    "&.Mui-selected": {
      color: "#FFF",
      borderBottom: "none !important",
      background: isUsersTab
        ? "linear-gradient(135deg, #0C8087, #074548)"
        : "linear-gradient(to right, #0F2A71 0%, #181E2F 100%)",
    },
  };
};

export const contentTopBox: SxProps = {
  position: "absolute",
  height: "90px",
  bottom: 0,
  pl: "20px",
  pt: "8px",
  fontSize: "20px",
  borderRadius: "15px 15px 0 0",
};

export const contentBox: SxProps = {
  padding: "40px 20px",
  borderRadius: "0 15px 15px 15px",
};

export const contentBgColor = {
  sales: "#2A61AC2B",
  users: "#0C808730",
};

export const statBgColor = {
  left: "linear-gradient(135deg, #0F2A71 0%, #1D50D7 100%)",
  middle: "linear-gradient(120deg, #2A61AC 25%, #112746 100%)",
  right: "linear-gradient(120deg, #0C8087 25%, #031F21 100%)",
};
