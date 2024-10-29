import { canAccess } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/permission";
import { useAccessLevel } from "../contexts/auth/hooks";

export const useAccessControl = () => {
  const [accessLevel] = useAccessLevel();

  const hasAccess = (component: string): boolean => {
    if (typeof accessLevel !== "number") return false;
    return canAccess(accessLevel, component);
  };

  return { accessLevel, hasAccess };
};
