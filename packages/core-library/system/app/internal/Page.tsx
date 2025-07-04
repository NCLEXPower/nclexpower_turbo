import React from "react";
import { BusinessQueryContextProvider } from "../../../contexts";
import { QueryClient } from "react-query";
import Layout from "./Layout";
import { MenuItems } from "../../../api/types";

interface Props {
  mockMenu: Array<MenuItems>;
  tokenValidated: boolean;
  loading: boolean;
  queryClient: QueryClient;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const InternalPageEntryPoint: React.FC<
  React.PropsWithChildren<Props>
> = ({
  mockMenu,
  tokenValidated,
  loading,
  queryClient,
  logout,
  isAuthenticated,
  children,
}) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <Layout
          isAuthenticated={isAuthenticated}
          loading={loading}
          logout={logout}
          mockMenu={mockMenu}
          queryClient={queryClient}
          tokenValidated={tokenValidated}
          children={children}
        />
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};
