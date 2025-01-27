/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SelectOption } from "../../../../../../../../../../components/Textfield/SelectMultipleField";

export const addMainMenuItem = {
  label: "",
  path: "",
  type: "Main",
  children: [],
};

export const addSubMenuItem = {
  label: "",
  type: "SubMenu",
  children: [{ label: "", path: "" }],
};

export const SystemMenu: SelectOption[] = [
  {
    label: "Web Backoffice",
    value: 0,
    xvalue: 0,
  },
];

export const AccountLevel = [
  {
    id: 1,
    label: "Developer",
    value: 0,
  },
  {
    id: 2,
    label: "Admin",
    value: 1,
  },
  {
    id: 3,
    label: "Encoder",
    value: 2,
  },
];

export const MenuEnvironments = [
  {
    id: 1,
    label: "Dev",
    value: 0,
  },
  {
    id: 2,
    label: "Stage",
    value: 1,
  },
  {
    id: 3,
    label: "Preprod",
    value: 2,
  },
  {
    id: 4,
    label: "Prod",
    value: 3,
  },
];

export const SystemRequirements = [
  {
    id: 1,
    label: "System Menus",
    value: "systemMenus",
    options: SystemMenu,
  },
  {
    id: 2,
    label: "Account Level",
    value: "accountLevel",
    options: AccountLevel,
  },
  {
    id: 3,
    label: "Menu Environments",
    value: "menuEnvironments",
    options: MenuEnvironments,
  },
];
