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
    "ChatbotMode"
  ],
  [AccessLevels.ADMIN]: [
    "ChooseProductsConfigurations",
    "OtherConfigurations",
    "ContentManagementSystemSettings",
    "InAppManagement",
    "MaintenanceMode",
    "ChatbotMode"
  ],
  [AccessLevels.ENCODER]: ["ChooseProductsConfigurations"],
};

export const getRoleName = (accessLevel: number): string => {
  switch (accessLevel) {
    case AccessLevels.DEVELOPER:
      return "[Developer]";
    case AccessLevels.ADMIN:
      return "[Admin]";
    case AccessLevels.ENCODER:
      return "[Encoder]";
    default:
      return "[Unknown Role]";
  }
};

export const canAccess = (accessLevel: number, component: string): boolean => {
  return accessControl[accessLevel]?.includes(component);
};
