export const AccessLevels = {
    ADMIN: 0,
    ENCODER: 1,
    DEVELOPER: 2,
};
export const accessControl = {
    [AccessLevels.ADMIN]: [
        "ChooseProductsConfigurations",
        "OtherConfigurations",
        "ContentManagementSystemSettings",
        "InAppManagement",
    ],
    [AccessLevels.ENCODER]: ["ChooseProductsConfigurations"],
    [AccessLevels.DEVELOPER]: ["InAppManagement", "OtherConfigurations"],
};

export const canAccess = (accessLevel: number, component: string): boolean => {
    return accessControl[accessLevel]?.includes(component);
};