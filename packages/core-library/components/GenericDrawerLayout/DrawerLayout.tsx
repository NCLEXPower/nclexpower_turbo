"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Header } from "../GenericHeader/Header";
import { ErrorBoundaryV2, Sidebar } from "../";
import {
  useHeaderStyles,
  useIsDesignVisible,
  useResolution,
  useSidebarStyles,
} from "../../hooks";
import { useScroll } from "../../core/hooks/useScroll";
import { Main } from "./content/Main";
import MenuIcon from "@mui/icons-material/Menu";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { MenuItems } from "../../api/types";
import { isCustomer, useRouter } from "../../core";

interface DrawerLayoutProps {
  menu: MenuItems[];
  children: React.ReactNode;
  isAuthenticated?: boolean;
  onLogout?: () => Promise<void>;
}

const useCustomHeaderStyles = (
  isArxenius: boolean,
  headerStyles: WebHeaderStylesType
) => {
  return useMemo(
    () =>
      isArxenius
        ? {
            ...headerStyles,
            drawerHeader: { bgcolor: "#00173F", color: "white" },
          }
        : headerStyles,
    [isArxenius, headerStyles]
  );
};

export const DrawerLayout: React.FC<
  React.PropsWithChildren<DrawerLayoutProps>
> = ({ menu, children, isAuthenticated, onLogout }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { hideHeader } = useIsDesignVisible();
  const { isMobile } = useResolution();
  const { isScrolled } = useScroll();
  const router = useRouter();
  const headerStyles = useHeaderStyles();
  const sidebarStyles = useSidebarStyles();

  const [open, setOpen] = useState(() => !!isAuthenticated);

  const inHub = useMemo(
    () => router.pathname?.startsWith("/hub") || false,
    [router.pathname]
  );

  const isArxenius = useMemo(
    () => !!isAuthenticated && isCustomer && inHub,
    [isAuthenticated, inHub]
  );

  const customHeaderStyles = useCustomHeaderStyles(isArxenius, headerStyles);

  const handleDrawerToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      router.push({ pathname: path });
    },
    [router]
  );

  const logout = useCallback(async () => {
    await onLogout?.();
    await router.push((router) => router.login);
  }, [onLogout]);

  useEffect(() => {
    setOpen(!isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    setIsHydrated(true);
    setOpen(!!isAuthenticated);
  }, [isAuthenticated]);

  if (!isHydrated) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const shouldRenderSidebar = menu.length > 0 && isAuthenticated;
  const shouldRenderDrawerButton = !open && isAuthenticated;

  return (
    <Box display="flex">
      <ErrorBoundaryV2 context="Sidebar">
        {shouldRenderSidebar && (
          <Sidebar
            {...sidebarStyles}
            isMobile={isMobile}
            menu={menu}
            open={open && shouldRenderSidebar}
            setOpen={handleDrawerToggle}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
          />
        )}
      </ErrorBoundaryV2>
      <Main open={open} isMobile={isMobile}>
        <Box
          display="flex"
          height="100vh"
          flexDirection="column"
          minHeight="100vh"
        >
          <Header
            {...customHeaderStyles}
            hidden={!!hideHeader}
            isArxenius={isArxenius}
            drawerButton={
              shouldRenderDrawerButton && (
                <Button
                  onClick={handleDrawerToggle}
                  sx={{ color: isArxenius ? "white" : undefined }}
                  aria-label="toggle-sidebar"
                >
                  <MenuIcon
                    sx={{
                      color: isArxenius && !isScrolled ? "white" : "#00173F",
                    }}
                  />
                </Button>
              )
            }
            menu={menu}
            isAuthenticated={isAuthenticated}
            logout={logout}
            path={router.pathname}
            handleNavigate={handleNavigate}
            isMobile={isMobile}
          />
          <Box height="100%">{children}</Box>
        </Box>
      </Main>
    </Box>
  );
};
