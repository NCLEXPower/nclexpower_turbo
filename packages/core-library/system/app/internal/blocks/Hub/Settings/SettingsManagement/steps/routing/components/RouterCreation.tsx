/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from 'react'
import { RouteCreationSidebar } from './RouteCreationSidebar'
import { AuthorizedMenuResponse, MenuItems } from '../../../../../../../../../../api/types'
import { useBusinessQueryContext } from '../../../../../../../../../../contexts'
import { Box } from '@mui/material'
import { EditMenuItemsSchema, MenuItemType, RouteManagementSchema } from '../../../validation'
import { RouterEditForm } from './forms/RouterEditForm'

type RouterCreationType = {
    selectedMenus: AuthorizedMenuResponse
    onSubmitNewMenu: (value: RouteManagementSchema) => void
}

export const RouterCreation: React.FC<RouterCreationType> = ({ selectedMenus, onSubmitNewMenu }) => {
    const { businessQueryGetMenuById, businessQueryUpdateMenuItem, businessQueryDeleteRoute } = useBusinessQueryContext();
    const { mutateAsync: deleteRoutes } = businessQueryDeleteRoute();
    const { data: menus, refetch, isLoading } = businessQueryGetMenuById(["GetMenuById", selectedMenus.id], { menuId: selectedMenus.id })
    const [menuItem, setMenuItem] = useState<MenuItemType>()
    const { mutateAsync } = businessQueryUpdateMenuItem()
    const [newMenuCreation, setNewMenuCreation] = useState<Boolean>(false)

    const handleEditMenu = (menuItem: MenuItems) => {
        setMenuItem({ ...menuItem })
        setNewMenuCreation(false)
    }

    const handleAddNewMenu = () => {
        setMenuItem({ ...EditMenuItemsSchema.getDefault(), children: [] })
        setNewMenuCreation(true)
    }

    if (isLoading) {
        return <Box>Loading</Box>
    }

    return menus && <>
        <RouteCreationSidebar onDeleteMenu={deleteCategory} onAddMenu={handleAddNewMenu} onEditMenu={handleEditMenu} menus={menus} />
        <RouterEditForm selectedMenuItem={menuItem} onSubmitEdit={onSubmitEdit} />
    </>

    async function onSubmitEdit(value: MenuItemType) {
        if (menus) {
            newMenuCreation ? onSubmitNewMenu({ ...menus, menuItems: [value] }) : await mutateAsync(value)
        }
        refetch()
    }

    async function deleteCategory(MenuId: string) {
        await deleteRoutes(MenuId);
        refetch()
    }
}
