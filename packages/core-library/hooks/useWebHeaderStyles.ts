/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { SxProps, Theme } from "@mui/material/styles";
import { useRouter, useScroll } from "../core";

export const useWebHeaderStyles = () => {
  const { isScrolled } = useScroll();
  const router = useRouter();
  const isScrolledOrRoute = router.pathname === "/404" || isScrolled;

  const drawerHeader: SxProps<Theme> = {
    position: "fixed",
    bgcolor: isScrolledOrRoute ? "white" : "rgba(0, 0, 0, 0.5)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const headerLinkSx: SxProps<Theme> = {
    color: !isScrolledOrRoute ? "white" : "black",
    fontFamily: "PT Sans, sans-serif",
    textTransform: "none",
    outline: 0,
    fontSize: "15px",
    ":disabled": {
      color: !isScrolledOrRoute ? "white" : "black",
      textDecoration: "underline",
    },
    ":focus": {
      border: "none",
      outline: "0 !important",
    },
  };

  const loginButtonSx: SxProps = {
    fontWeight: 600,
    fontFamily: "PT Sans, sans-serif",
    bgcolor: isScrolledOrRoute ? "#0f2a71" : "#f3c402",
    color: isScrolledOrRoute ? "white" : "black",
    textTransform: "none",
    fontSize: "15px",
    py: 2,
    px: 7,
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: isScrolledOrRoute ? "#071c51" : "#cca406",
    },
    ":disabled": {
      color: !isScrolledOrRoute ? "#071c51" : "#cca406",
      textDecoration: "underline",
    },
  };

  const ToTopButtonSx: SxProps = {
    position: "fixed",
    zIndex: 1299,
    bottom: "50px",
    right: "50px",
    height: "45px",
    width: "45px",
    boxShadow: "2px",
    minWidth: "40px",
    bgcolor: "#f3c402",
    borderRadius: "50%",
    display: isScrolled ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      bgcolor: "#f3c402",
    },
  };

  return { drawerHeader, headerLinkSx, loginButtonSx, ToTopButtonSx };
};

export default useWebHeaderStyles;
