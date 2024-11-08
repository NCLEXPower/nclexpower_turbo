/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { SettingsSelectionType } from "../../types";
import {
  Button,
  Card,
  EvaIcon,
  ReactTable,
} from "../../../../../../../../../components";
import { useMenu } from "../../../../../../../../../components/GenericDrawerLayout/hooks/useMenu";
import { prepareMenus } from "../../../../../../../../../components/GenericDrawerLayout/MockMenus";
import {
  useAuthContext,
  useBusinessQueryContext,
} from "../../../../../../../../../contexts";
import { useValidateToken } from "../../../../../../../../../hooks";
import React, { useState } from "react";
import { RouteCreationForm } from "./components/RouteCreationForm";
import { RouteCreationSidebar } from "./components/RouteCreationSidebar";
import { FormProvider, useForm } from "react-hook-form";
import { RouteManagementSchema, RouteMenuCreation } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItems } from "../../../../../../../../../api/types";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import ActionsPopover from "../../../../../../../../../components/Popover/ActionsPopover";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const InAppRouterManagement: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const { businessQueryDeleteRoute } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryDeleteRoute();
  const [view, setView] = useState<boolean>(false);
  const [IsNewMenuCreated, setIsNewMenuCreated] = useState<boolean>(false);
  const { isAuthenticated } = useAuthContext();
  const { tokenValidated } = useValidateToken();

  const columns: ColumnDef<MenuItems>[] = [
    {
      accessorKey: "label",
      header: ({ table }: { table: Table<MenuItems> }) => (
        <Box sx={{ display: "flex" }}>
          <Box
            onClick={table.getToggleAllRowsExpandedHandler()}
            sx={{ cursor: "pointer", display: "flex" }}
          >
            <Box
              sx={{
                transform: table.getIsAllRowsExpanded()
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
                display: "inline-block",
              }}
            >
              <EvaIcon
                name="chevron-right-outline"
                width={22}
                height={22}
                aria-hidden
              />
            </Box>
          </Box>
          Label
        </Box>
      ),
      cell: ({ row }: { row: Row<MenuItems> }) => (
        <Box style={{ paddingLeft: `${row.depth * 2}rem` }}>
          <Box>
            {row.getCanExpand() ? (
              <Box
                onClick={row.getToggleExpandedHandler()}
                sx={{ cursor: "pointer", display: "inline-block" }}
              >
                <Box
                  sx={{
                    transform: row.getIsExpanded()
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <EvaIcon
                    name="chevron-down-outline"
                    width={22}
                    height={22}
                    aria-hidden
                  />
                </Box>
              </Box>
            ) : (
              " "
            )}
            {row.original.label}
          </Box>
        </Box>
      ),
    },
    {
      accessorKey: "path",
      header: "Path",
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Row<MenuItems> }) => (
        <ActionsPopover row={row} handleDelete={deleteCategory} />
      ),
    },
  ];

  const form = useForm<RouteManagementSchema>({
    mode: "all",
    resolver: yupResolver(RouteMenuCreation),
  });

  const { menus, loading: menuLoading } = useMenu();
  const mockMenu = prepareMenus({
    isAuthenticated: isAuthenticated && tokenValidated,
    loading: menuLoading,
    menus: menus,
  });

  return (
    <FormProvider {...form}>
      <Box
        sx={{
          width: "100%",
          height: "100dvh",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box display="flex" gap="10px">
          {IsNewMenuCreated ? (
            <Button
              sx={{ borderRadius: "10px", marginBottom: "10px" }}
              onClick={() => setIsNewMenuCreated(false)}
            >
              Back
            </Button>
          ) : (
            <>
              <Button
                sx={{ borderRadius: "10px" }}
                onClick={() => setView(!view)}
              >
                View
              </Button>
              <Button
                sx={{ borderRadius: "10px" }}
                onClick={() => setIsNewMenuCreated(true)}
              >
                Add New Menus
              </Button>
            </>
          )}
        </Box>
        {IsNewMenuCreated ? (
          <Box
            sx={{
              width: "100%",
              gap: "10px",
            }}
          >
            <RouteCreationForm />
          </Box>
        ) : view ? (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Card
              elevation={5}
              sx={{
                width: "30%",
                height: "100%",
                borderRadius: "10px",
              }}
            >
              {menuLoading ? "Loading" : <RouteCreationSidebar menus={menus} />}
            </Card>
          </Box>
        ) : (
          <Card>
            <ReactTable expandable columns={columns} data={mockMenu} />
          </Card>
        )}
      </Box>
    </FormProvider>
  );

  async function deleteCategory(MenuId: string) {
    await mutateAsync(MenuId);
  }
};
