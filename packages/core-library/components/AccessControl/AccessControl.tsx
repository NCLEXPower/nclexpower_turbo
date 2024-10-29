import React from "react";
import { useAccessControl } from "core-library/hooks";

interface AccessControlProps {
  componentName: string;
  children: React.ReactNode;
}

export const AccessControl: React.FC<AccessControlProps> = ({ componentName, children }) => {
  const { hasAccess } = useAccessControl();

  return hasAccess(componentName) ? <>{children}</> : null;
};
