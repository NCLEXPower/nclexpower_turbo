/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import {
  Box,
  Button,
  Grid,
  Avatar,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { useResolution } from "../../hooks";
import { HeaderLogo } from "./HeaderLogo";
import { useRouter } from "../../core";
import { AccountMenu, BreadCrumbs } from "../index";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { AccountMenuItem } from ".";
import { MenuItems } from "../../api/types";
import SearchIcon from "@mui/icons-material/Search";
import { config } from "../../config";

export interface Props extends Partial<WebHeaderStylesType> {
  menu?: Array<MenuItems>;
  isAuthenticated: boolean;
  drawerButton?: React.ReactNode;
  onLogout?: () => void;
  hidden: boolean;
}

export const Header: React.FC<Props> = ({
  menu,
  isAuthenticated,
  drawerButton,
  onLogout,
  drawerHeader,
  headerLinkSx,
  loginButtonSx,
  hidden,
}) => {
  const { isMobile } = useResolution();
  const router = useRouter();
  const path = router.pathname;
  const appName = config.value.BASEAPP;
  const isInHub = router.pathname?.startsWith("/hub") || false;
  const isInWebcHub = isAuthenticated && isInHub && appName.includes("c");

  const handleNavigate = (path?: string) => {
    router.push({ pathname: path || "/login" });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    handleNavigate("/login");
  };

  return (
    !hidden && (
      <Box
        role="banner"
        component="header"
        width="100%"
        minHeight={70}
        display="flex"
        data-testid="header"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={999}
        bgcolor="background.default"
        sx={{
          ...drawerHeader,
        }}
      >
        {menu && menu.length > 0 && drawerButton && (
          <Grid item>{drawerButton}</Grid>
        )}

        <Grid
          container
          px={8}
          width="100%"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Grid
            item
            container
            alignItems="flex-center"
            spacing={6}
            height="auto"
          >
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              xs
            >
              {!isAuthenticated && (
                <Grid item>
                  <HeaderLogo />
                </Grid>
              )}

              <Grid item display="flex" alignItems="center">
                {!isMobile && !isAuthenticated ? (
                  <Grid container gap={6} direction="row" alignItems="center">
                    {menu &&
                      menu.length > 0 &&
                      menu.map((navigation, index) => (
                        <Grid item key={index}>
                          <Button
                            disabled={navigation.path == path}
                            sx={
                              navigation.label === "Login"
                                ? loginButtonSx
                                : headerLinkSx
                            }
                            onClick={() => handleNavigate(navigation.path)}
                            data-testid={`menu-item-${navigation.label}`}
                          >
                            {navigation.label}
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isAuthenticated && <Grid item alignSelf="center"></Grid>}
            {isMobile && <Grid item></Grid>}
          </Grid>
          <Grid item xs={12} position="relative"></Grid>
          {isInWebcHub && !isMobile && (
            <Grid
              item
              xs={5}
              sm
              md
              lg
              xl
              sx={{
                alignSelf: "center",
                display: { md: "none", lg: "block", xl: "block" },
              }}
            >
              <BreadCrumbs />
            </Grid>
          )}
          {isInWebcHub && (
            <Grid
              item
              xs
              sm={5}
              md={4}
              lg={3}
              xl={3}
              sx={{
                display: { xs: "none", sm: "block" },
                alignSelf: "center",
                marginRight: 20,
              }}
            >
              <InputBase
                placeholder="Search"
                sx={{
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 1,
                  padding: "0 10px",
                  width: "100%",
                  border: "1px solid #ccc",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "black", float: "right" }} />
                  </InputAdornment>
                }
              />
            </Grid>
          )}

          {isAuthenticated && (
            <Grid item xs={3.5} sm={1.5} md={2} lg={2} xl={1}>
              <AccountMenu
                icon={<Avatar src="/path-to-user-image.jpg" />}
                label={isMobile ? "" : "User"}
                accountItem={AccountMenuItem}
                onLogout={handleLogout}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    )
  );
};
