export const AccessLevels = {
  DEVELOPER: 0,
  ADMIN: 1,
  ENCODER: 2,
};

export const accessControl = {
  [AccessLevels.DEVELOPER]: [
    "InAppManagement",
    "OtherConfigurations",
    "MaintenanceMode",
  ],
  [AccessLevels.ADMIN]: [
    "ChooseProductsConfigurations",
    "OtherConfigurations",
    "ContentManagementSystemSettings",
    "InAppManagement",
    "MaintenanceMode",
  ],
  [AccessLevels.ENCODER]: ["ChooseProductsConfigurations"],
};

export const canAccess = (accessLevel: number, component: string): boolean => {
  return accessControl[accessLevel]?.includes(component);
};