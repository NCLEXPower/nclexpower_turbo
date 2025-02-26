import { SxProps } from "@mui/system";
import { WebSidebarStylesType } from "../types/web-sidebar-styles";
import { useMemo } from "react";

const wordWrapStyles: SxProps = {
  "& *": {
    wordWrap: "break-word",
    wordBreak: "break-word",
    marginTop: "1em",
    minHeight: "1px",
  },
};

export const useStyle = (): WebSidebarStylesType & { wordWrap: SxProps } => {
  const listStyles: WebSidebarStylesType["listStyles"] = {
    sidebarSx: {
      backgroundImage: "linear-gradient(90deg, #0F2A71 0%, #181E2F 100%)",
      color: "white",
      borderRadius: "8px",
    },
    arrowSx: {
      opacity: 1,
    },
    dividerSx: {
      borderBottomWidth: "none !important",
      borderColor: "none !important",
    },
    listItemIconSx: {
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
    },
    paddingSx: {
      padding: "0 !important",
    },
    activeSx: {
      opacity: "1 !important",
      textDecoration: "underline !important",
    },
    hovericonSx: {
      "&:hover": {
        color: "inherit !important",
      },
    },
    opacitySx: {
      opacity: "1 !important",
    },
  };

  const styles = useMemo(
    () => ({
      listStyles,
      wordWrap: wordWrapStyles,
    }),
    []
  );

  return styles;
};
