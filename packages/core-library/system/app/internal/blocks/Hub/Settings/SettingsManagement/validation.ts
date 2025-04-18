import * as yup from "yup";
import { ChooseSettingsOptions, SettingsSelectionOptions } from "./types";

export const uploadFormSchema = () => {
  return yup.object({
    files: yup.mixed<File[]>().default<File[]>([]),
  });
};

export const setDefaultReviewerSchema = yup.object({
  defaultReviewers: yup.array(yup.string()),
});

export const settingsSelectionSchema = yup
  .object({
    selection: yup.mixed<SettingsSelectionOptions>(),
    chosen: yup.mixed<ChooseSettingsOptions>(),
  })
  .required()
  .concat(uploadFormSchema());

export const fileValidationErrors = (prefix: string) => ({
  fileType: `${prefix}_type_error`,
  fileSize: `${prefix}_size_error`,
  sameFile: `${prefix}_unique_error`,
  maxFilesCount: `${prefix}_max_count_error`,
  multipleFiles: `${prefix}_multiple_files_error`,
});

export const subMenu = yup.object({
  label: yup.string().required("Menu Label is required"),
  path: yup.string().required("Path is required"),
});

export const MenuItemsSchema = yup.object({
  type: yup.string().oneOf(["Main", "SubMenu"]),
  icon: yup.string(),
  label: yup.string().when("type", {
    is: (val: string) => val === "Main" || val === "SubMenu",
    then: (schema) => schema.required("Menu Label is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  path: yup.string().default(""),
  children: yup.array().when("type", {
    is: "SubMenu",
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            label: yup.string().required("Sub menu label is required"),
            path: yup.string().required("Sub menu path is required"),
          })
        )
        .min(1, "At least one submenu is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const MenuItemPath = yup
  .string()
  .nullable()
  .default("/")
  .when(["$routes", "children"], ([routes, children], schema) => {
    if (!routes || (children && children.length > 0)) {
      return schema.notRequired();
    }
    return schema
      .oneOf(
        routes,
        "You must create a file before adding a route. Please create the file and try again."
      )
      .required("This field is required");
  });

export const EditMenuItemsSchema = yup.object({
  id: yup.string().notRequired(),
  icon: yup.string().required().default(""),
  menuId: yup.string().notRequired(),
  parentId: yup.string().notRequired(),
  label: yup.string().required("Menu Label is required").default(""),
  path: MenuItemPath,
  children: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().notRequired(),
        icon: yup.string().required().default(""),
        menuId: yup.string().notRequired(),
        parentId: yup.string().notRequired(),
        label: yup.string().required("Menu Label is required").default(""),
        path: MenuItemPath,
      })
    )
    .optional(),
});

export const RouteMenuCreation = yup.object({
  systemMenus: yup.number().required("System Menus is required"),
  accountLevel: yup.number().required("Account Level is required"),
  menuEnvironments: yup.number().required("Menu Environments is required"),
  menuItems: yup.array().of(EditMenuItemsSchema),
});

export const accountSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  middlename: yup.string().optional(),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
});

export const refundReasonSchema = yup.object({
  reason1: yup.boolean().optional().default(false),
  reason2: yup.boolean().optional().default(false),
  reason3: yup.boolean().optional().default(false),
  otherReason: yup.string().optional().default(""),
  note: yup.string().optional().default(""),
});

export type AccountSchemaType = yup.InferType<typeof accountSchema>;
export type RouteManagementSchema = yup.InferType<typeof RouteMenuCreation>;
export type MenuItemType = yup.InferType<typeof EditMenuItemsSchema>;
export type RefundReasonType = yup.InferType<typeof refundReasonSchema>;
