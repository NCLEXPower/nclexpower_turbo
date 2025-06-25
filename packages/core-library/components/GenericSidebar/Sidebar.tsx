/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useMemo, useCallback } from "react";
import { Box, List, Drawer } from "@mui/material";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import { ArxeniusLogoBlue } from "../../assets";
import { IconButton, EvaIcon } from "../../components";
import { useGetProgramList, useUniqueById } from "../../hooks";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";

interface SidebarProps {
  menu: MenuItems[];
  open: boolean;
  setOpen: () => void;
  onLogout?: () => void;
  variant?: "persistent" | "permanent" | "temporary";
  isMobile?: boolean;
  isTablet?: boolean;
  isAuthenticated?: boolean;
  listStyles?: WebSidebarStylesType["listStyles"];
}

const RenderMenuItems = React.memo(
  ({
    menu,
    pathname,
    isAuthenticated,
    listStyles,
    isDrawerOpen,
    onNavigate,
    setOpen,
  }: {
    menu: MenuItems[];
    pathname: string;
    isAuthenticated?: boolean;
    listStyles?: WebSidebarStylesType["listStyles"];
    isDrawerOpen: boolean;
    onNavigate: () => void;
    setOpen: () => void;
  }) => {
    return (
      <>
        {menu.map((navigation) => (
          <Box key={navigation.id}>
            {navigation.children?.length > 0 ? (
              <SidebarListButton
                isDrawerOpen={isDrawerOpen}
                navigation={navigation}
                pathname={pathname}
                isAuthenticated={isAuthenticated}
                listStyles={listStyles}
                onNavigate={onNavigate}
                setDrawerOpen={setOpen}
              />
            ) : (
              <SidebarButton
                isDrawerOpen={isDrawerOpen}
                navigation={navigation}
                pathname={pathname}
                isAuthenticated={isAuthenticated}
                onNavigate={onNavigate}
              />
            )}
          </Box>
        ))}
      </>
    );
  }
);

export const Sidebar = React.memo(
  ({
    menu,
    variant,
    open,
    setOpen,
    onLogout,
    isMobile,
    isTablet,
    isAuthenticated,
    listStyles,
  }: SidebarProps) => {
    const pathname = usePathname();
    const { programList } = useGetProgramList();

    const uniqueMenu = useUniqueById(menu);

    const updatedMenu = useMemo(() => {
      return uniqueMenu.map((navigation, index) => {
        if (programList?.length === 10 && index === 1) {
          return { ...navigation, hide: true };
        }
        if (programList && programList?.length > 10 && index === 2) {
          return { ...navigation, hide: true };
        }
        return navigation;
      });
    }, [uniqueMenu, programList]);

    const handleCloseSidebar = useCallback(() => {
      if ((!isAuthenticated && isMobile) || (!isAuthenticated && isTablet)) {
        setOpen();
      }
    }, [isAuthenticated, isMobile, isTablet, setOpen]);

    const drawerVariant = isMobile ? "temporary" : variant || "persistent";

    const filteredMenu = useMemo(() => {
      return isAuthenticated ? updatedMenu.filter((nav) => !nav.hide) : menu;
    }, [isAuthenticated, updatedMenu, menu]);

    return (
      <Drawer
        open={open}
        component="nav"
        variant={drawerVariant}
        anchor="left"
        PaperProps={{
          sx: {
            visibility: "visible",
            width: open ? 315 : 75,
            padding: "12px",
            boxSizing: "border-box",
            boxShadow: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            overflowX: "hidden",
            ...(!isMobile && {
              transform: "none !important",
              visibility: "visible !important",
            }),
            transition: open
              ? "width 225ms ease-out !important"
              : "width 195ms cubic-bezier(0.4, 0, 0.6, 1) !important",
          },
        }}
        sx={{
          width: open ? 315 : 75,
          flexShrink: 0,
          transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1)",
        }}
      >
        <List disablePadding>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            borderBottom={1}
            borderColor="divider"
            paddingX="12px"
            height={70}
          >
            <div className="shrink-0 relative">
              <Image
                style={{ width: 150 }}
                src={ArxeniusLogoBlue}
                alt="NCLEXLogo"
                priority
              />
              {!open && (
                <Box
                  top={0}
                  right={0}
                  bottom={0}
                  left="30px"
                  bgcolor="white"
                  position="absolute"
                />
              )}
            </div>
            {open && (
              <Box position="absolute" right={5}>
                <IconButton onClick={setOpen} ariaLabel="toggle-sidebar">
                  <EvaIcon
                    name="arrow-ios-back-outline"
                    width={25}
                    height={25}
                    ariaHidden
                    className={`${open ? "opacity-100" : "opacity-0"} ${
                      !open ? "-rotate-180" : "rotate-0"
                    } transition duration-200`}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
          <div className="space-y-2 mt-2">
            <RenderMenuItems
              menu={filteredMenu}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              listStyles={listStyles}
              isDrawerOpen={open}
              onNavigate={handleCloseSidebar}
              setOpen={setOpen}
            />
          </div>
        </List>
      </Drawer>
    );
  }
);
