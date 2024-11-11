/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React from "react";
import { Box, List, Drawer } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import { usePathname } from "next/navigation";
import { NCLEXBlueLogo } from "../../assets";
import Image from "next/image";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import useGetProgramList from "../../hooks/useGetProgramList";
import { IconButton, EvaIcon } from "../../components";

interface SideBarPropsType extends Partial<WebSidebarStylesType> {
  menu: Array<MenuItems>;
  open: boolean;
  setOpen: () => void;
  onLogout?: () => void;
  variant?: "persistent" | "permanent" | "temporary";
  isMobile?: boolean;
  isAuthenticated: boolean;
}

interface RenderMenuItemsProps extends Partial<WebSidebarStylesType>{
  menu: Array<MenuItems>;
  pathname: string;
  isAuthenticated: boolean;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({ menu, pathname, isAuthenticated, listStyles }) => {
  return (
    menu.length > 0 &&
    menu
      .filter((item, index, self) => self.findIndex((m) => m.id === item.id) === index)
      .map((navigation, index) => (
        <Box key={index}>
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
          <Image style={{ width: 150 }} src={NCLEXBlueLogo} alt="NCLEXLogo" />
          <Box position="absolute" right={5}>
            <IconButton onClick={setOpen} className="outline-none">
              <EvaIcon
                id="back-icon"
                name="arrow-ios-back-outline"
                width={25}
                height={25}
                ariaHidden
                className={`${open ? 'opacity-100' : 'opacity-0'} ${!open ? '-rotate-180' : 'rotate-0'} transition duration-200`}
              />
            </IconButton>
          </Box>
        </Box>
        {!isAuthenticated ? (
          <RenderMenuItems
            menu={menu}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            listStyles={listStyles}
          />
        ) : (
          <RenderMenuItems
            menu={updatedMenu.filter((navigation) => !navigation.hide)}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            listStyles={listStyles}
          />
        )}
      </List>
    </Drawer>
  );
};
