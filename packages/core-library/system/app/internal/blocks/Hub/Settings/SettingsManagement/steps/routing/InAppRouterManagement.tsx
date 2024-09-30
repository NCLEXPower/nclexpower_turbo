import { Box } from "@mui/material";
import { MenuType, SettingsSelectionType } from "../../types";
import {
  Button,
  Card,
  ReactTable,
} from "../../../../../../../../../components";
import { useMenu } from "../../../../../../../../../components/GenericDrawerLayout/hooks/useMenu";
import { prepareMenus } from "../../../../../../../../../components/GenericDrawerLayout/MockMenus";
import { useAuthContext } from "../../../../../../../../../contexts";
import { useValidateToken } from "../../../../../../../../../hooks";
import React, { useState } from "react";
import { RouteCreationForm } from "./components/RouteCreationForm";
import { RouteCreationSidebar } from "./components/RouteCreationSidebar";
import { columns } from "./constant/constant";
import { TypeCreationSelection } from "./components/TypeCreationSelection";
import { FormProvider, useForm } from "react-hook-form";
import { RouteManagementSchema, RouteMenuCreation } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const [view, setView] = useState<boolean>(false);
  const [createMainType, setCreateMainType] = useState<MenuType>();
  const { isAuthenticated } = useAuthContext();
  const { tokenValidated } = useValidateToken();

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
        <Box>
          <Button sx={{ borderRadius: "10px" }} onClick={() => setView(!view)}>
            View
          </Button>
        </Box>
        {view ? (
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
            {!createMainType && (
              <TypeCreationSelection setCreateMainType={setCreateMainType} />
            )}
            {createMainType && (
              <Box
                sx={{
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Button
                  sx={{ borderRadius: "10px", marginBottom: "10px" }}
                  onClick={() => setCreateMainType(null)}
                >
                  Back
                </Button>
                <RouteCreationForm type={createMainType} />
              </Box>
            )}
          </Box>
        ) : (
          <Card>
            <ReactTable expandable columns={columns} data={mockMenu} />
          </Card>
        )}
      </Box>
    </FormProvider>
  );
};