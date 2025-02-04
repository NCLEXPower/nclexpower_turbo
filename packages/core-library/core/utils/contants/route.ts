import { generateNestedRoutes } from "../routeUtils";
import { config } from "../../../config";

export const hubBaseRoute = config.value?.BASEHUB || "/hub";
const hubSubRoutes = [
  "",
  "/create-category",
  "/manage-questions",
  "/create-product",
  "/create-pricing",
  "/internal-application-settings",
  "/create-rq-type",
]; //should be from the DB.

export const authorizedRoute = generateNestedRoutes(hubBaseRoute, hubSubRoutes);
export const unauthorizeRoute = ["/login", "/", "/account/forgot-password"];

export const hasClientKeyRoute = [
  "/account/change-password",
  "/account/verification/otp",
];
