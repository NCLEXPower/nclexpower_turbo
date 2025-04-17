/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, ListItemIcon } from "@mui/material";
import {
  Button,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../../components";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  EditMenuItemsSchema,
  RouteManagementSchema,
} from "../../../validation";
import {
  IconComponent,
  IconList,
} from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { deleteIconStyle } from "../style";

export const SubMenu = ({ nestIndex }: { nestIndex: number }) => {
  const { control: formControl, setValue } =
    useFormContext<RouteManagementSchema>();

  const { fields, remove, append } = useFieldArray({
    control: formControl,
    name: `menuItems.${nestIndex}.children`,
  });

  const watchedIcons = useWatch<RouteManagementSchema | any>({
    control: formControl,
    name: fields.map(
      (_, index) => `menuItems.${nestIndex}.children.${index}.icon`
    ),
  });

  return (
    <Box>
      {fields.map((item, index) => {
        const selectedIcon = watchedIcons?.[index];
        return (
          <Box
            key={item.id}
            sx={{
              marginTop: "10px",
              display: "flex",
              width: "100%",
              gap: "25px",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            <ListItemIcon sx={deleteIconStyle}>
              {IconComponent(selectedIcon)}
            </ListItemIcon>
            <GenericSelectField
              control={formControl}
              name={`menuItems.${nestIndex}.children.${index}.icon`}
              label="Icon"
              options={IconList ?? []}
              onChange={(event) => {
                const updatedItem = {
                  ...item,
                  icon: event,
                };
                setValue(
                  `menuItems.${nestIndex}.children.${index}`,
                  updatedItem
                );
              }}
              sx={{ width: "100%" }}
            />
            <TextField
              control={formControl}
              name={`menuItems.${nestIndex}.children.${index}.label`}
              label="Sub menu Label"
            />
            <TextField
              control={formControl}
              name={`menuItems.${nestIndex}.children.${index}.path`}
              label="Sub menu Path"
            />
            {fields.length > 1 && (
              <ListItemIcon
                sx={{
                  marginTop: "25px",
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 2,
                }}
                onClick={() => remove(index)}
              >
                {IconComponent("DeleteIcon")}
              </ListItemIcon>
            )}
          </Box>
        );
      })}
      <Button
        sx={{ borderRadius: "10px", marginTop: "10px" }}
        onClick={() => append({ ...EditMenuItemsSchema.getDefault() })}
      >
        Add Sub Menu
      </Button>
    </Box>
  );
};
