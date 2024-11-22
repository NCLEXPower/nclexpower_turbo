/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useMemo } from "react";
import { Box, ListItemButton, Typography } from "@mui/material";
import { AuthorizedMenuResponse, MenuItemsChildren } from "../../../../../../../../../../api/types";
import { Button, Card, ConfirmationModal, CustomPopover, IconButton } from '../../../../../../../../../../components';
import { IconComponent } from '../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component';
import { GridMoreVertIcon } from '@mui/x-data-grid';

interface Props {
  menus: AuthorizedMenuResponse;
  onEditMenu: (navigation: MenuItemsChildren) => void;
  onAddMenu: () => void;
  onDeleteMenu: (MenuId: string) => void;
}

export const RouteCreationSidebar = ({ menus, onEditMenu, onAddMenu, onDeleteMenu }: Props) => {
  const menuHolder = useMemo(() => menus.menuItems ?? [], [menus])

  return (
    <Card
      data-testid="route-creation-sidebar"
      elevation={5}
      sx={{
        overflow: 'auto',
        width: "40%",
        height: "100%",
        borderRadius: "10px",
      }}>

      <Button
        onClick={onAddMenu}
        sx={{ borderRadius: "10px", marginTop: "20px" }}>
        Add Menu
      </Button>
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
              <Box key={index} display="flex" marginY={2}>
                <ListItemButton
                  onClick={() => onEditMenu(navigation)}
                >
                  <Box key={navigation.id} width={1}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box display="flex" alignItems="center" gap={2} >
                        {IconComponent(navigation.icon, false, "primary")}
                        <Typography sx={{ fontWeight: 700 }}>
                          {navigation.label}
                        </Typography>
                      </Box>
                    </Box>
                    {navigation.children && navigation.children.length > 0 &&
                      navigation.children.map((subMenu, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={2} >
                          {IconComponent(subMenu.icon, false, "primary")}
                          <Typography key={index} sx={{ fontSize: "14px" }}>
                            {subMenu.label}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </ListItemButton>
                <CustomPopover open withIcon={true} label='Actions' iconButton={<GridMoreVertIcon fontSize="small" />}>
                  <ListItemButton
                    onClick={() => onEditMenu(navigation)}
                    sx={{ color: 'black' }}
                  >
                    Edit
                  </ListItemButton>
                  <ConfirmationModal
                    customButton={'ListDeleteButton'}
                    dialogContent="Are you sure you want to delete this menu?"
                    isLoading={false}
                    handleSubmit={() => onDeleteMenu(navigation.id)}
                  />
                </CustomPopover>
              </Box>
            ))}
      </Box>
    </Card >
  );
};
