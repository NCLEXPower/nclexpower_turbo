/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Box, List, Drawer, Theme, CSSObject } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import { usePathname } from "next/navigation";
import { NCLEXBlueLogo } from "../../assets";
import Image from "next/image";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import { useGetProgramList, useUniqueById } from "../../hooks";
import { IconButton, EvaIcon } from "../../components";

interface SideBarPropsType extends Partial<WebSidebarStylesType> {
  menu: Array<MenuItems>;
  open: boolean;
  setOpen: () => void;
  onLogout?: () => void;
  variant?: "persistent" | "permanent" | "temporary";
  isMobile?: boolean;
  isTablet?: boolean;
  isAuthenticated: boolean;
}

interface RenderMenuItemsProps extends Partial<WebSidebarStylesType> {
  menu: Array<MenuItems>;
  pathname: string;
  isAuthenticated: boolean;
  isDrawerOpen: boolean;
  onNavigate: () => void;
  setOpen: () => void;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({
  menu,
  pathname,
  isAuthenticated,
  listStyles,
  isDrawerOpen,
  onNavigate,
  setOpen,
}) => {
  const uniqueMenu = useUniqueById(menu);

  return (
    uniqueMenu.length > 0 &&
    uniqueMenu.map((navigation) => (
      <Box key={navigation.id}>
        {navigation.children && navigation.children?.length > 0 ? (
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
    ))
  );
};

export const Sidebar: React.FC<SideBarPropsType> = ({
  menu,
  variant,
  open,
  setOpen,
  onLogout,
  isMobile,
  isTablet,
  isAuthenticated,
  listStyles,
}) => {
  const pathname = usePathname();
  const { programList } = useGetProgramList();

  const updatedMenu = useUniqueById(menu).map((navigation, index) => {
    if (programList && programList.length === 10 && index === 1) {
      return { ...navigation, hide: true };
    } else if (programList && programList.length > 10 && index === 2) {
      return { ...navigation, hide: true };
    }
    return navigation;
  });

  const handleCloseSidebar = () => {
    if ((!isAuthenticated && isMobile) || (!isAuthenticated && isTablet)) {
      setOpen();
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Drawer
      open={open}
      component="nav"
      variant={isMobile ? "temporary" : variant || "persistent"}
      anchor="left"
      PaperProps={{
        sx: {
          visibility: "visible",
        },
      }}
      sx={{
        width: open ? 315 : 75,
        flexShrink: 0,
        transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1)",
        "& .MuiDrawer-paper": {
          padding: "12px",
          width: open ? 315 : 75,
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
          ...(!isMobile &&
            !open && {
              transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) !important",
            }),
          ...(!isMobile &&
            open && {
              transition: "width 225ms ease-out !important",
            }),
        },
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
            <Image style={{ width: 150 }} src={NCLEXBlueLogo} alt="NCLEXLogo" />
            {!open && (
              <Box
                top={0}
                right={0}
                bottom={0}
                left="35px"
                bgcolor="white"
                position="absolute"
              />
            )}
          </div>
          {open && (
            <Box position="absolute" right={5}>
              <IconButton onClick={setOpen} ariaLabel="toggle-sidebar">
                <EvaIcon
                  id="back-icon"
                  name="arrow-ios-back-outline"
                  width={25}
                  height={25}
                  ariaHidden
                  className={`${open ? "opacity-100" : "opacity-0"} ${!open ? "-rotate-180" : "rotate-0"} transition duration-200`}
                />
              </IconButton>
            </Box>
          )}
        </Box>
        <div className="space-y-2 mt-2">
          {!isAuthenticated ? (
            <RenderMenuItems
              menu={menu}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              listStyles={listStyles}
              isDrawerOpen={open}
              onNavigate={handleCloseSidebar}
              setOpen={setOpen}
            />
          ) : (
            <RenderMenuItems
              menu={updatedMenu.filter((navigation) => !navigation.hide)}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              listStyles={listStyles}
              isDrawerOpen={open}
              onNavigate={handleCloseSidebar}
              setOpen={setOpen}
            />
          )}
        </div>
      </List>
    </Drawer>
  );
};
