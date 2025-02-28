/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import {
  Box,
  Grid,
  Avatar,
  InputBase,
  Container,
  IconButton,
  Button,
  ClickAwayListener,
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
import { useState } from "react";

export interface Props extends Partial<WebHeaderStylesType> {
  menu?: Array<MenuItems>;
  isAuthenticated: boolean;
  drawerButton?: React.ReactNode;
  onLogout?: () => void;
  hidden: boolean;
}

const inputBaseStyles = {
  bgcolor: "white",
  color: "black",
  borderRadius: "7px",
  padding: "5px",
  width: "100%",
  border: "1px solid #ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiInputBase-input": {
    padding: "5px",
    borderRadius: "7px",
    backgroundColor: "white",
    "&::placeholder": {
      marginLeft: "10px",
      color: "#888",
    },
  },
};

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

  const [showSearch, setShowSearch] = useState(false);

  const toggleSearchField = () => {
    setShowSearch((prev) => !prev);
  };

  const handleClickAway = () => {
    setShowSearch(false);
  };

  const handleNavigate = (path: string) => {
    router.push({ pathname: path });
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    !hidden && (
      <Box
        role="banner"
        component="header"
        width="100%"
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
        data-tour="step-1"
      >
        <Box
          className="container "
        >
          <Grid
            container
            width="100%"
            minHeight={isMobile ? "clamp(50px, 17.442vw, 220px)" : "clamp(50px, 5.7292vw, 220px)"}
            position="relative"
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Grid
              item
              container
              alignItems="flex-center"
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
                    <Grid container direction="row" alignItems="center">
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
                              <Box sx={{
                                fontSize: "clamp(1px, 1.145831vw, 44px) !important",
                                fontFamily: "Poppins",
                              }}>
                                {navigation.label}
                              </Box>
                            </Button>
                          </Grid>
                        ))}
                    </Grid>
                  ) : null}
                </Grid>

                {menu && menu.length > 0 && drawerButton && (
                  <Grid item >{drawerButton}</Grid>
                )}
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
                  display: "block",
                  alignSelf: "center",
                }}
              >
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <IconButton onClick={toggleSearchField} data-tour="step-3">
                      <SearchIcon fontSize="large" sx={{ color: "white" }} />
                    </IconButton>
                    <Box
                      sx={{
                        width: showSearch ? "100%" : "0%",
                        overflow: "hidden",
                        transition: "width 0.5s ease",
                      }}
                    >
                      <InputBase placeholder="Search" sx={inputBaseStyles} />
                    </Box>
                  </Container>
                </ClickAwayListener>
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
                  onLogout={handleLogout}
                />
              </Box>
            )}
          </Grid>
        </Box>
      </Box>

    )
  );
};
