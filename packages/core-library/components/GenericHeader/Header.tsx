/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Box, Grid, Avatar, Button } from "@mui/material";
import { useResolution } from "../../hooks";
import { HeaderLogo } from "./HeaderLogo";
import { useRouter } from "../../core";
import { AccountMenu, BreadCrumbs } from "../index";
import { WebHeaderStylesType } from "../../types/web-header-style";
import { AccountMenuItem } from ".";
import { MenuItems } from "../../api/types";
import { config } from "../../config";

export interface Props extends Partial<WebHeaderStylesType> {
  menu?: Array<MenuItems>;
  isAuthenticated?: boolean;
  drawerButton?: React.ReactNode;
  hidden: boolean;
  isArxenius: boolean;
  path: string;
  isMobile: boolean;
  handleNavigate(path: string): void;
  logout(): void;
}

export const Header: React.FC<Props> = ({
  menu,
  isAuthenticated,
  drawerButton,
  drawerHeader,
  headerLinkSx,
  loginButtonSx,
  hidden,
  isArxenius,
  path,
  isMobile,
  handleNavigate,
  logout,
}) => {
  if (hidden) return null;

  return (
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
      sx={drawerHeader}
      data-tour="step-1"
    >
      <Grid
        container
        px={8}
        width="100%"
        position="relative"
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        {menu && menu.length > 0 && drawerButton && (
          <Grid item>{drawerButton}</Grid>
        )}

        <Grid item container alignItems="flex-center" spacing={6} height="auto">
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
              {!isMobile && !isAuthenticated && (
                <Grid container gap={6} direction="row" alignItems="center">
                  {menu &&
                    menu.map((navigation, index) => (
                      <Grid item key={`${navigation.label}-${index}`}>
                        <Button
                          disabled={navigation.path === path}
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
              )}
            </Grid>
          </Grid>

          {isArxenius && !isMobile && (
            <Grid
              item
              xs={5}
              sx={{
                alignSelf: "center",
                display: { md: "none", lg: "block", xl: "block" },
              }}
            >
              <BreadCrumbs />
            </Grid>
          )}

          {isAuthenticated && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                zIndex: 1000,
                margin: 2,
              }}
            >
              <AccountMenu
                icon={<Avatar src="/path-to-user-image.jpg" />}
                label={isMobile ? "" : "User"}
                accountItem={AccountMenuItem}
                onLogout={logout}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
