/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Box, List, Drawer, Grid, Avatar } from "@mui/material";
import { SidebarListButton } from "./SidebarListButton";
import { SidebarButton } from "./SidebarButton";
import { usePathname } from "next/navigation";
import { NCLEXBlueLogo } from "../../assets";
import Image from "next/image";
import { MenuItems } from "../../api/types";
import { WebSidebarStylesType } from "../../types/web-sidebar-styles";
import { useGetProgramList, useUniqueById } from "../../hooks";
import { IconButton, EvaIcon } from "../../components";
import { useAccessControl } from "../../hooks/useAccessControl";
import { getRoleName } from "../../core/utils/permission";
import { UserProfile } from "../UserProfile/UserProfile";

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
  onNavigate: () => void;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({
  menu,
  pathname,
  isAuthenticated,
  listStyles,
  onNavigate,
}) => {
  const uniqueMenu = useUniqueById(menu);

  return (
    uniqueMenu.length > 0 &&
    uniqueMenu.map((navigation) => (
      <Box key={navigation.id}>
        {navigation.children && navigation.children?.length > 0 ? (
          <SidebarListButton
            navigation={navigation}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            listStyles={listStyles}
            onNavigate={onNavigate}
          />
        ) : (
          <SidebarButton
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
  const { accessLevel } = useAccessControl();
  const roleName = getRoleName(accessLevel ?? -1);

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
        </Box>
        {!isAuthenticated ? (
          <RenderMenuItems
            menu={menu}
            pathname={pathname}
            isAuthenticated={isAuthenticated}
            listStyles={listStyles}
            onNavigate={handleCloseSidebar}
          />
        ) : (
          <Grid
            item
            xs={3.5}
            sm={1.5}
            md={2}
            lg={2}
            xl={1}
            sx={{
              display: "block",
              alignSelf: "center",
            }}
          >
            <RenderMenuItems
              menu={updatedMenu.filter((navigation) => !navigation.hide)}
              pathname={pathname}
              isAuthenticated={isAuthenticated}
              listStyles={listStyles}
              onNavigate={handleCloseSidebar}
            />
            <div style={{ padding: "12px" }}>
              <UserProfile onLogout={onLogout} />
            </div>
          </Grid>
        )}
      </List>
    </Drawer>
  );
};
