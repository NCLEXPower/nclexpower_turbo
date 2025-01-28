/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Chip, Typography } from "@mui/material";
import { SettingsSelectionType } from "../../types";
import {
  Button,
  Card,
  CustomPopover,
  ReactTable,
} from "../../../../../../../../../components";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import React, { useState } from "react";
import { RouteCreationForm } from "./components/forms/RouteCreationForm";
import { FormProvider, useForm } from "react-hook-form";
import { RouteManagementSchema, RouteMenuCreation } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AuthorizedMenuResponse,
  CreateAuthorizedMenusParams,
} from "../../../../../../../../../api/types";
import { ColumnDef } from "@tanstack/react-table";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { ListItemButton } from "@mui/material";
import {
  AccountLevel,
  MenuEnvironments,
  SystemMenu,
} from "./constant/constant";
import { getLabel } from "./utils/getLabel";
import { RouterCreation } from "./components/RouterCreation";
import { useQueryClient } from "react-query";
import { useAtomValue } from "jotai";
import { fileRoutesAtom } from "../../../../../../../../../hooks/useSetFileRoutes";

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
  const { businessQueryCreateAuthorizedMenus, businessQueryGetAllMenus } =
    useBusinessQueryContext();
  const { mutateAsync: createRoutes } = businessQueryCreateAuthorizedMenus();
  const {
    data,
    isLoading: menuLoading,
    refetch,
  } = businessQueryGetAllMenus(["getAllMenus"]);
  const [view, setView] = useState<boolean>(false);
  const [selectedMenus, setSelectedMenus] = useState<AuthorizedMenuResponse>();
  const [IsNewMenuCreated, setIsNewMenuCreated] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { executeToast } = useExecuteToast();
  const allRoutes = useAtomValue(fileRoutesAtom);

  const form = useForm<RouteManagementSchema>({
    mode: "all",
    resolver: yupResolver(RouteMenuCreation),
    defaultValues: { menuItems: [] },
    context: { routes: allRoutes },
  });

  const columns: ColumnDef<AuthorizedMenuResponse>[] = [
    {
      accessorKey: "accountLevel",
      header: "Account Level",
      cell: (params) => {
        const value = params.getValue();
        const label = AccountLevel.find((x) => x.value == value);
        return label?.label;
      },
    },
    {
      id: "menuEnvironments",
      accessorKey: "menuEnvironments",
      header: "Menus Environments",
      cell: (params) => {
        const value = params.getValue();
        const environment = getLabel(value, MenuEnvironments);
        return (
          <Chip
            label={environment?.label}
            variant="outlined"
            color="secondary"
          />
        );
      },
    },
    {
      accessorKey: "systemMenus",
      header: "System Menu",
      cell: (params) => {
        const value = params.getValue();
        const system = getLabel(value, SystemMenu);
        return (
          <Chip label={system?.label} variant="outlined" color="warning" />
        );
      },
    },
    {
      id: "action",
      cell: (params) => {
        const menu = params.row.original;
        return (
          <Box display="flex" alignItems="center" height={1}>
            <CustomPopover
              data-testid="popover-dropdown"
              open
              withIcon={true}
              label="Actions"
              iconButton={<GridMoreVertIcon fontSize="small" />}
            >
              <ListItemButton
                onClick={() => handleSelectMenu(menu)}
                sx={{ color: "black" }}
              >
                Edit
              </ListItemButton>
            </CustomPopover>
          </Box>
        );
      },
    },
  ];

  const handleSelectMenu = (menu: AuthorizedMenuResponse) => {
    setSelectedMenus(menu);
    setView(!view);
  };

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
        <Button
          onClick={previousStep}
          variant="text"
          size="small"
          sx={{ mb: 5 }}
        >
          Back
        </Button>

        <Box display="flex" gap="10px" width={1} data-testid="in-app-router">
          {IsNewMenuCreated ? (
            <Button
              sx={{ borderRadius: "10px", marginBottom: "10px" }}
              onClick={() => setIsNewMenuCreated(false)}
            >
              Back
            </Button>
          ) : (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width={1}
            >
              {view ? (
                <Button
                  sx={{ borderRadius: "10px" }}
                  onClick={() => setView(!view)}
                >
                  Back
                </Button>
              ) : (
                <Button
                  sx={{ borderRadius: "10px" }}
                  onClick={() => setIsNewMenuCreated(true)}
                >
                  Add New Menu
                </Button>
              )}
            </Box>
          )}
        </Box>
        {IsNewMenuCreated ? (
          <Box
            sx={{
              width: "100%",
              gap: "10px",
            }}
          >
            <RouteCreationForm onSubmit={createMenus} />
          </Box>
        ) : view ? (
          <Box sx={{ display: "flex", gap: "10px", height: 1 }}>
            {selectedMenus && (
              <RouterCreation
                onSubmitNewMenu={createMenus}
                selectedMenus={selectedMenus}
              />
            )}
          </Box>
        ) : (
          <Card>
            <ReactTable<AuthorizedMenuResponse>
              data-testid="in-app-route-table"
              isLoading={menuLoading}
              columns={columns}
              data={data ?? []}
            />
          </Card>
        )}
      </Box>
    </FormProvider>
  );

  async function createMenus(values: RouteManagementSchema) {
    try {
      await createRoutes(values as CreateAuthorizedMenusParams);
      queryClient.invalidateQueries("GetMenuById");
      setIsNewMenuCreated(false);
      refetch();
      executeToast("Successfully Created", "top-right", true, {
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
