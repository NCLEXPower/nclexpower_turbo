import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Header } from "../GenericHeader/Header";
import { Sidebar } from "../";
import {
  useIsDesignVisible,
  useIsMounted,
  useResolution,
  useRouteBasedVisibility,
} from "../../hooks";
import { useScroll } from "../../core/hooks/useScroll";
import { Main } from "./content/Main";
import MenuIcon from "@mui/icons-material/Menu";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import { useRouter } from "../../core";
import { config } from "../../config";
import { usePaid } from "../../contexts/auth/hooks";
import { Decryption } from "../../utils";

type DrawerLayoutType = {
  menu: Array<MenuItems>;
  isAuthenticated: boolean;
  onLogout?: () => void;
  loading?: boolean;
  headerStyles?: WebHeaderStylesType;
  sidebarStyles?: WebSidebarStylesType;
  isPaid: string | undefined;
};

export const DrawerLayout: React.FC<
  React.PropsWithChildren<DrawerLayoutType>
> = ({
  menu,
  children,
  isAuthenticated,
  onLogout,
  headerStyles,
  sidebarStyles,
  isPaid,
}) => {
  const isHidden = useIsDesignVisible();
  const { isMobile } = useResolution();
  const mounted = useIsMounted();
  const [open, setOpen] = useState(true);
  const { isScrolled } = useScroll();

  const router = useRouter();

  const isInHub = router.pathname?.startsWith("/hub") || false;
  const appName = config.value.BASEAPP;
  const inWebc = appName.includes("c");
  const isInWebcHub = isAuthenticated && isInHub && inWebc;
  const parsedIsPaid =
    isAuthenticated && inWebc
      ? Decryption(isPaid ?? ":", config.value.SECRET_KEY)
      : "yes";

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  if (!mounted) return;

  const customHeaderStyles = isInWebcHub
    ? {
        drawerHeader: {
          bgcolor: "#00173F",
          color: "white",
        },
      }
    : headerStyles;

  return (
    <Box display="flex">
      {menu.length > 0 &&
        (isAuthenticated || isMobile) &&
        parsedIsPaid !== "no" && (
          <Sidebar
            {...sidebarStyles}
            isMobile={isMobile}
            menu={menu}
            open={open}
            setOpen={handleDrawer}
            isAuthenticated={isAuthenticated}
          />
        )}
      <Main open={open} isMobile={isMobile}>
        <Box
          display="flex"
          height="100vh"
          flexDirection="column"
          minHeight="100vh"
        >
          <Header
            {...customHeaderStyles}
            hidden={isHidden ?? false}
            drawerButton={
              ((!open && isAuthenticated) || isMobile) && (
                <Button
                  onClick={handleDrawer}
                  sx={{ color: isInWebcHub && "white" }}
                  aria-label="toggle-sidebar"
                >
                  <MenuIcon
                    sx={{
                      color: inWebc && !isScrolled ? "white" : "#00173F",
                    }}
                  />
                </Button>
              )
            }
            menu={menu}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
          />
          <Box height="100%">{children}</Box>
        </Box>
      </Main>
    </Box>
  );
};
