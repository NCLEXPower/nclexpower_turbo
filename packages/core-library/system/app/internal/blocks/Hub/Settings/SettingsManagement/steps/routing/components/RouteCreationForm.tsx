/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, ListItemIcon } from "@mui/material";
import {
  Button,
  Card,
  GenericSelectField,
  TextField,
} from "../../../../../../../../../../components";
import {
  Control,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { RouteManagementSchema } from "../../../validation";
import {
  addMainMenuItem,
  addSubMenuItem,
  SystemRequirements,
} from "../constant/constant";
import {
  cardStyle,
  deleteIconStyle,
  menuFieldStyle,
  menuOptionStyle,
} from "../style";
import {
  IconComponent,
  IconList,
} from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { SubMenu } from "./SubMenu";

export const RouteCreationForm = () => {
  const { control: formControl, handleSubmit } =
    useFormContext<RouteManagementSchema>();

  const {
    append,
    fields,
    remove: MainMenuRemove,
  } = useFieldArray<RouteManagementSchema>({
    control: formControl,
    name: "MenuItems",
  });

  const watchedIconsReadonly = useWatch<RouteManagementSchema | any>({
    control: formControl,
    name: fields.map((_, index: number) => `MenuItems.${index}.icon`),
  });

  const watchedIcons = Array.from(watchedIconsReadonly) as string[];

  const handleOptionSelect = (type: string) => {
    type == "Main"
      ? append(addMainMenuItem)
      : type == "SubMenu"
        ? append(addSubMenuItem)
        : null;
  };

  const onSubmit = (values: RouteManagementSchema) => {
    console.log("values : ", values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        {SystemRequirements.length > 0 &&
          SystemRequirements.map((item, index) => (
            <Box key={index} sx={{ width: "33%" }}>
              <GenericSelectField
                name={item.value}
                label={item.label}
                options={item.options ?? []}
                sx={{ width: "100%" }}
              />
            </Box>
          ))}
      </Box>
      <Box sx={menuFieldStyle}>
        {fields.length > 0 &&
          fields.map((menuItem, index) => {
            const type = menuItem.type;
            return (
              <Box sx={{ width: "100%" }} key={index}>
                {menuSelector({
                  index,
                  type,
                  MainMenuRemove,
                  watchedIcons,
                  formControl,
                })}
              </Box>
            );
          })}
        <Box sx={menuOptionStyle}>
          <Card onClick={() => handleOptionSelect("Main")} sx={cardStyle}>
            Menu
          </Card>
          <Card onClick={() => handleOptionSelect("SubMenu")} sx={cardStyle}>
            Menu with Sub Menu
          </Card>
        </Box>
      </Box>

      <Card onClick={() => handleOptionSelect("SubMenu")} sx={cardStyle}>
        Menu with Sub Menu
      </Card>

      <Button
        buttonActionType="submit"
        onClick={handleSubmit(onSubmit)}
        sx={{ borderRadius: "10px", width: "150px", alignSelf: "end" }}
      >
        Create Menu
      </Button>
    </Box>
  );
};

type MenuSelectorType = {
  type: string;
  index: number;
  MainMenuRemove: (index: number) => void;
  formControl: Control<RouteManagementSchema>;
  watchedIcons: string[];
};

function menuSelector({
  type,
  index,
  MainMenuRemove,
  watchedIcons,
  formControl,
}: MenuSelectorType) {
  const selectedIcon = watchedIcons[index];
  switch (type) {
    case "Main":
      return (
        <MainMenu
          formControl={formControl}
          selectedIcon={selectedIcon}
          index={index}
          MainMenuRemove={MainMenuRemove}
        />
      );
    case "SubMenu":
      return (
        <SubMainMenu
          formControl={formControl}
          selectedIcon={selectedIcon}
          index={index}
          MainMenuRemove={MainMenuRemove}
        />
      );
    default:
      return null;
  }
}

type MenuType = {
  formControl: Control<RouteManagementSchema>;
  selectedIcon: string;
  index: number;
  MainMenuRemove: (index: number) => void;
};

const MainMenu = ({
  formControl,
  selectedIcon,
  index,
  MainMenuRemove,
}: MenuType) => {
  const { setValue } = useFormContext<RouteManagementSchema>();
  return (
    <Box display="flex" gap={5} width="100%" alignItems="start" key={index}>
      <Card
        sx={{
          bgcolor: "white",
          height: "fit-content",
          borderRadius: "10px",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            width: "100%",
            bgcolor: "#fefefe",
            marginTop: "15px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <ListItemIcon sx={deleteIconStyle}>
            {IconComponent(selectedIcon)}
          </ListItemIcon>
          <GenericSelectField
            control={formControl}
            name={`MenuItems.${index}.icon`}
            label="Icon"
            options={IconList ?? []}
            onChange={(event) => {
              setValue(`MenuItems.${index}.icon`, event);
            }}
            sx={{ width: "100%" }}
          />
          <TextField
            name={`MenuItems.${index}.label`}
            control={formControl}
            label="Label"
          />
          <TextField
            name={`MenuItems.${index}.path`}
            control={formControl}
            label="Path"
          />
        </Box>
      </Card>
      <ListItemIcon sx={deleteIconStyle} onClick={() => MainMenuRemove(index)}>
        {IconComponent("DeleteIcon")}
      </ListItemIcon>
    </Box>
  );
};

const SubMainMenu = ({
  formControl,
  selectedIcon,
  index,
  MainMenuRemove,
}: MenuType) => {
  const { setValue } = useFormContext<RouteManagementSchema>();
  return (
    <Box display="flex" gap={5} width="100%" key={index}>
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
        <Box display="flex" gap={10} alignItems="end">
          <ListItemIcon sx={deleteIconStyle}>
            {IconComponent(selectedIcon)}
          </ListItemIcon>
          <GenericSelectField
            control={formControl}
            name={`MenuItems.${index}.icon`}
            label="Icon"
            options={IconList ?? []}
            onChange={(event) => {
              setValue(`MenuItems.${index}.icon`, event);
            }}
            sx={{ width: "100%" }}
          />
          <TextField
            name={`MenuItems.${index}.label`}
            control={formControl}
            label="Menu with Sub Menu Label"
          />
        </Box>
        <Card
          sx={{
            marginTop: "10px",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <SubMenu nestIndex={index} />
        </Card>
      </Card>
      <ListItemIcon sx={deleteIconStyle} onClick={() => MainMenuRemove(index)}>
        {IconComponent("DeleteIcon")}
      </ListItemIcon>
    </Box>
  );
};
