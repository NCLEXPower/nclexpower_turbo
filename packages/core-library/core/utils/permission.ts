export const AccessLevels = {
  ADMIN: 0,
  EDITOR: 1,
  VIEWER: 2,
};
export const accessControl = {
  [AccessLevels.ADMIN]: [
    "ChooseProductsConfigurations",
    "OtherConfigurations",
    "ContentManagementSystemSettings",
    "InAppManagement",
  ],
  [AccessLevels.EDITOR]: ["ChooseProductsConfigurations"],
  [AccessLevels.VIEWER]: ["InAppManagement", "OtherConfigurations"],
};

export const canAccess = (accessLevel: number, component: string): boolean => {
  return accessControl[accessLevel]?.includes(component);
};
