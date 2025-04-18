/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from "react";
import { RouteCreationSidebar } from "./RouteCreationSidebar";
import {
  AuthorizedMenuResponse,
  MenuItems,
} from "../../../../../../../../../../api/types";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../../contexts";
import { Box } from "@mui/material";
import {
  EditMenuItemsSchema,
  MenuItemType,
  RouteManagementSchema,
} from "../../../validation";
import { RouterEditForm } from "./forms/RouterEditForm";
import { ComponentLoader } from "../../../../../../../../../../components";

type RouterCreationType = {
  selectedMenus: AuthorizedMenuResponse;
  onSubmitNewMenu: (value: RouteManagementSchema) => void;
};

export const RouterCreation: React.FC<RouterCreationType> = ({
  selectedMenus,
  onSubmitNewMenu,
}) => {
  const {
    businessQueryGetMenuById,
    businessQueryUpdateMenuItem,
    businessQueryDeleteRoute,
  } = useBusinessQueryContext();
  const { mutateAsync: deleteRoutes } = businessQueryDeleteRoute();
  const {
    data: menus,
    refetch,
    isLoading,
  } = businessQueryGetMenuById(["GetMenuById", selectedMenus.id], {
    menuId: selectedMenus.id,
  });
  const [menuItem, setMenuItem] = useState<MenuItemType>();
  const { mutateAsync } = businessQueryUpdateMenuItem();
  const [newMenuCreation, setNewMenuCreation] = useState<Boolean>(false);
  const { executeToast } = useExecuteToast();

  const handleEditMenu = (menuItem: MenuItems) => {
    setMenuItem({ ...menuItem });
    setNewMenuCreation(false);
  };

  const handleAddNewMenu = () => {
    setMenuItem({ ...EditMenuItemsSchema.getDefault(), children: [] });
    setNewMenuCreation(true);
  };

  if (isLoading) {
    return (
      <Box
        flex={1}
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ComponentLoader disableMarginBottom />
      </Box>
    );
  }

  return (
    menus && (
      <>
        <RouteCreationSidebar
          onDeleteMenu={deleteCategory}
          onAddMenu={handleAddNewMenu}
          onEditMenu={handleEditMenu}
          menus={menus}
        />
        <RouterEditForm
          selectedMenuItem={menuItem}
          onSubmitEdit={onSubmitEdit}
        />
      </>
    )
  );

  async function onSubmitEdit(value: MenuItemType) {
    try {
      if (menus && newMenuCreation) {
        onSubmitNewMenu({ ...menus, menuItems: [value] });
      } else {
        await mutateAsync(value);
        executeToast(`Successfully updated`, "top-right", true, {
          type: "success",
        });
      }
      refetch();
    } catch {
      executeToast(
        `Something went wrong. Please try again later.`,
        "top-right",
        true,
        { type: "error" }
      );
    }
  }

  async function deleteCategory(MenuId: string) {
    try {
      await deleteRoutes(MenuId);
      refetch();
      executeToast(`Menu item successfully deleted`, "top-right", true, {
        type: "success",
      });
    } catch {
      executeToast(
        `Something went wrong. Please try again later.`,
        "top-right",
        true,
        { type: "error" }
      );
    }
  }
};
