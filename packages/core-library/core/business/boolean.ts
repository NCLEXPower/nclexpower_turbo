import { config } from "../../config";

export const isTrue = (value: unknown) =>
  value === true || value === "true" || value === "True";
export const isFalse = (value: unknown) =>
  value === false || value === "false" || value === "False";
export const isYes = (value: string) => value?.toLowerCase()?.includes("yes");
export const isFunction = (value: unknown) => typeof value === "function";
export const isCustomer =
  config.value.BASEAPP === "webc_app" ||
  process.env.NEXT_PRIVATE_BASE_APP === "webc_app";
