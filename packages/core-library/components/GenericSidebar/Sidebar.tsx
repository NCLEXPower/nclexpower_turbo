import React from "react";
import { Button, Drawer, IconButton, SxProps, Theme, Typography } from "@mui/material";
import { Box, List } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "../../core";
import { usePathname } from "next/navigation";
import { NCLEXBlueLogo } from "../../assets";
import Image from "next/image";
import { MenuItems } from "../../api/types";
import LogoutIcon from "@mui/icons-material/Logout";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import useGetProgramList from "../../hooks/useGetProgramList";

interface SideBarPropsType extends Partial<WebSidebarStylesType> {
  menu: Array<MenuItems>;
  open: boolean;
  setOpen: () => void;
  onLogout?: () => void;
  variant?: "persistent" | "permanent" | "temporary";
  isMobile?: boolean;
  isAuthenticated: boolean;
}

export const Sidebar: React.FC<SideBarPropsType> = ({
  menu,
  variant,
  open,
  setOpen,
  onLogout,
  isMobile,
  isAuthenticated,
  listStyles,
}) => {
  const pathname = usePathname();
  const { programList } = useGetProgramList();

  const updatedMenu = menu
  .filter(
    (menus, index, self) =>
      self.findIndex((m) => m.id === menus.id) === index
  )
  .map((navigation, index) => {
    if (programList && programList.length === 10 && index === 1) {
      return { ...navigation, hide: true };
    } else if (programList && programList.length > 10 && index === 2) {
      return { ...navigation, hide: true };
    }
    return navigation;
  });
  
  return (
    <Drawer
      open={open}
      component="nav"
      variant={isMobile ? "temporary" : variant || "persistent"}
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          boxShadow: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        },
      }}
    >
      <List disablePadding>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom={1}
          borderColor="divider"
          height={70}
        >
          <Image
            style={{ width: 150 }}
            src={NCLEXBlueLogo}
            alt="NCLEXLogo"
          />
          <Box position="absolute" right={5}>
            <IconButton onClick={setOpen}>
              <KeyboardArrowLeftIcon
                sx={{
                  opacity: open ? 1 : 0,
                  transform: !open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {updatedMenu &&
          updatedMenu.length > 0 &&
          updatedMenu
            .filter((navigation) => !navigation.hide)
            .map((navigation, index) => (
              <React.Fragment key={index}>
                {navigation.children && navigation.children.length > 0 ? (
                  <SidebarListButton
                    navigation={navigation}
                    pathname={pathname}
                    isAuthenticated={isAuthenticated}
                    listStyles={listStyles}
                  />
                ) : (
                  <SidebarButton
                    navigation={navigation}
                    pathname={pathname}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              </React.Fragment>
            ))}
      </List>
    </Drawer>
  );
};
