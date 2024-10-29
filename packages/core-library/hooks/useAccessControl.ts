import { useState, useEffect } from "react";
import { canAccess } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/permission";

export const useAccessControl = () => {
  const [accessLevel, setAccessLevel] = useState<number | null>(null);

  useEffect(() => {
    const userAccessLevel = sessionStorage.getItem("al");
    setAccessLevel(Number(userAccessLevel));
  }, []);

  const hasAccess = (component: string): boolean => {
    if (accessLevel === null) return false;
    return canAccess(accessLevel, component);
  };

  return { accessLevel, hasAccess };
};
