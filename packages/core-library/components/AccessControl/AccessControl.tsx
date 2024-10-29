import React from "react";
import { useAccessControl } from "../../hooks/useAccessControl";

interface AccessControlProps {
  componentName: string;
}

export const AccessControl: React.FC<
  React.PropsWithChildren<AccessControlProps>
> = ({ componentName, children }) => {
  const { hasAccess } = useAccessControl();

  return hasAccess(componentName) ? <>{children}</> : null;
};
