import React from "react";
import {
  pathExists,
  prepareMenus,
} from "../components/GenericDrawerLayout/MockMenus";
import {
  useAuthInterceptor,
  usePreventDuplicateSession,
  useValidateToken,
} from "../hooks";
import { useAuthContext } from "../contexts";
import { InternalPageEntryPoint } from "./app/internal/Page";
import { QueryClient } from "react-query";
import { SystemTypes } from "./parse-content";
import { useMenu } from "../components/GenericDrawerLayout/hooks/useMenu";
import { useRouter } from "../core";
import { ErrorBox } from "../components";
import { unauthorizeRoute } from "../core/utils/contants/route";
import withAuth from "../core/utils/withAuth";

interface Props {
  appName: SystemTypes;
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  appName,
}) => {
  const router = useRouter();
  const { isAuthenticated, loading, logout } = useAuthContext();
  const { tokenValidated, loading: validateLoading } = useValidateToken();
  const { menus, loading: menuLoading, routes } = useMenu();
  const mockMenu = prepareMenus({
    isAuthenticated: isAuthenticated && tokenValidated,
    loading: menuLoading,
    menus: menus,
  });
  const queryClient = new QueryClient();

  const { duplicate } = usePreventDuplicateSession();

  useAuthInterceptor();

  const isValid =
    (routes.length > 0 && pathExists(routes, router.asPath)) ||
    unauthorizeRoute.includes(router.asPath);

  if (!isValid && !duplicate) {
    return (
      <ErrorBox label="Page not found. Please try again or contact administrator" />
    );
  }

  return (
    <InternalPageEntryPoint
      mockMenu={mockMenu}
      isAuthenticated={isAuthenticated}
      loading={loading || validateLoading || router.loading}
      logout={logout}
      queryClient={queryClient}
      tokenValidated={tokenValidated}
      children={children}
    />
  );
};

export default withAuth(Page);
