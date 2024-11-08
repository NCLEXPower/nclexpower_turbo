/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MenuItems } from "../../../../../../../../../../api/types";
import BorderColorIcon from "@mui/icons-material/BorderColor";

interface Props {
  menus: MenuItems[];
}

export const RouteCreationSidebar = ({ menus }: Props) => {
  const [menuHolder, setMenuHolder] = useState<MenuItems[]>(menus);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {menuHolder.length > 0 &&
        menuHolder
          .filter(
            (menuHolder, index, self) =>
              self.findIndex((m) => m.id === menuHolder.id) === index
          )
          .map((navigation, index) => (
            <React.Fragment key={index}>
              {navigation.children && navigation.children.length > 0 ? (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <Box sx={{ marginY: "15px" }}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {navigation.label}
                    </Typography>

                    {navigation.children.length > 0 &&
                      navigation.children.map((subMenu, index) => (
                        <Typography key={index} sx={{ fontSize: "14px" }}>
                          {subMenu.label}
                        </Typography>
                      ))}
                  </Box>

                  <IconButton sx={{ marginTop: "10px" }}>
                    <AddIcon sx={{ scale: "0.8" }} />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {navigation.label}
                  </Typography>
                  <IconButton sx={{ marginTop: "10px" }}>
                    <BorderColorIcon sx={{ scale: "0.5" }} />
                  </IconButton>
                </Box>
              )}
            </React.Fragment>
          ))}
    </Box>
  );
};
