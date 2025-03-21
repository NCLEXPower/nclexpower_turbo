/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { memo, useEffect } from "react";
import {
  Button,
  Card,
  ConfirmationModal,
  EvaIcon,
  GenericSelectField,
  IconButton,
  TextField,
} from "../../../../../../../../../../../components";
import { Box, ListItemIcon, Typography } from "@mui/material";
import { EditMenuItemsSchema, MenuItemType } from "../../../../validation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  IconComponent,
  IconList,
} from "../../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { deleteIconStyle } from "../../style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtomValue } from "jotai";
import { fileRoutesAtom } from "../../../../../../../../../../../hooks/useSetFileRoutes";

type RouterEditFormType = {
  selectedMenuItem?: MenuItemType;
  onSubmitEdit: (value: MenuItemType) => void;
};

export const RouterEditForm: React.FC<RouterEditFormType> = ({
  selectedMenuItem,
  onSubmitEdit,
}) => {
  const allRoutes = useAtomValue(fileRoutesAtom);
  const {
    control: formControl,
    handleSubmit,
    formState,
    setValue,
  } = useForm<MenuItemType>({
    resolver: yupResolver(EditMenuItemsSchema),
    defaultValues: { ...EditMenuItemsSchema.getDefault(), children: [] },
    values: selectedMenuItem,
    context: { routes: allRoutes },
  });

  const Icon = memo(({ icon }: { icon: string }) => IconComponent(icon));

  const { append, fields, remove, replace } = useFieldArray<MenuItemType>({
    name: "children",
    control: formControl,
  });

  const menuItemValue = useWatch({ control: formControl });
  const allRoutesSelection =
    allRoutes && allRoutes.length > 0
      ? allRoutes?.map((route) => ({ label: route, value: route }))
      : [];

  useEffect(() => {
    if (selectedMenuItem?.children) {
      replace(selectedMenuItem?.children);
    }
  }, [selectedMenuItem]);

  const handleAddSubmenu = () => {
    append({ ...EditMenuItemsSchema.getDefault() });
  };

  const handleRemoveChildren = (index: number) => {
    remove(index);
  };

  const onSubmit = (value: MenuItemType) => {
    if (selectedMenuItem) {
      onSubmitEdit({ ...value });
    }
  };

  return (
    <Card
      data-testid="router-edit-block"
      elevation={5}
      sx={{
        width: 1,
        height: "100%",
        borderRadius: "10px",
      }}
    >
      {selectedMenuItem ? (
        <Box data-testid="router-edit-form" width={1}>
          <Box gap={5} width="100%">
            <Card
              sx={{
                bgcolor: "white",
                height: "fit-content",
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: 14, my: 3 }}>
                Note: You must create a file before adding a route.
              </Typography>
              <Box display="flex" gap={10} alignItems="start">
                <ListItemIcon sx={deleteIconStyle}>
                  <Icon icon={menuItemValue?.icon ?? ""} />
                </ListItemIcon>
                <Box>
                  <Box display="flex" gap={10} alignItems="start">
                    <GenericSelectField
                      control={formControl}
                      name={`icon`}
                      label="Icon"
                      options={IconList ?? []}
                      onChange={(event) => {
                        setValue(`icon`, event);
                      }}
                      sx={{ width: "100%" }}
                    />
                    <TextField
                      name={`label`}
                      control={formControl}
                      label="Label"
                    />
                  </Box>
                  <Box>
                    {fields.length <= 0 && (
                      <GenericSelectField
                        name={`path`}
                        control={formControl}
                        label="Path"
                        sx={{ flex: 6 }}
                        options={allRoutesSelection}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              <Card
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                {fields.length > 0 && (
                  <Box>
                    <Typography fontWeight={600}>Sub Menus</Typography>
                    {fields.map((field, index) => (
                      <Box key={index} display="flex" gap={2} alignItems="end">
                        <ListItemIcon sx={deleteIconStyle}>
                          <Icon
                            icon={menuItemValue?.children?.[index]?.icon ?? ""}
                          />
                        </ListItemIcon>
                        <GenericSelectField
                          control={formControl}
                          name={`children.${index}.icon`}
                          label="Icon"
                          options={IconList ?? []}
                          onChange={(event) => {
                            setValue(`children.${index}.icon`, event);
                          }}
                          sx={{ width: "100%" }}
                        />
                        <TextField
                          name={`children.${index}.label`}
                          control={formControl}
                          label="Label"
                        />
                        <GenericSelectField
                          name={`children.${index}.path`}
                          control={formControl}
                          label="Path"
                          sx={{ flex: 6 }}
                          options={allRoutesSelection}
                        />
                        <IconButton onClick={() => handleRemoveChildren(index)}>
                          <EvaIcon
                            name="close-outline"
                            fill="red"
                            width={30}
                            height={30}
                          />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
                <Button
                  onClick={handleAddSubmenu}
                  sx={{ borderRadius: "10px", marginTop: "20px" }}
                >
                  Add submenu
                </Button>
              </Card>
            </Card>
            <Box display="flex" justifyContent="flex-end" width={1}>
              <ConfirmationModal
                customButton={"SaveChanges"}
                confirmButtonText={"Confirm"}
                dialogContent="Confirm changes in this menu?"
                isLoading={false}
                handleSubmit={handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box height="100%">
          <Typography color="gray" variant="firstLevelValue">
            Select Menu Item
          </Typography>
        </Box>
      )}
    </Card>
  );
};
