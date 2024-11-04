import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  PageContainer,
  ControlledToast,
  DrawerLayout,
} from "../../../components";
import {
  DialogContextProvider,
  ToastProvider,
  ExpirationContextProvider,
  TabsContextProvider,
} from "../../../contexts";
import { ContentLoader } from "../../../router";
import { theme } from "../../../contents/theme/theme";
import { AccountSetupContextProvider } from "../../../contexts/AccountSetupContext";
import { PageLoaderContextProvider } from "../../../contexts/PageLoaderContext";
import { MenuItems } from "../../../api/types";

interface Props {
  mockMenu: Array<MenuItems>;
  tokenValidated: boolean;
  loading: boolean;
  queryClient: QueryClient;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  loading,
  mockMenu,
  queryClient,
  tokenValidated,
  children,
  logout,
  isAuthenticated,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLoaderContextProvider>
        <AccountSetupContextProvider>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <TabsContextProvider>
              <ExpirationContextProvider logout={logout}>
                <DialogContextProvider>
                  <DrawerLayout
                    menu={mockMenu}
                    isAuthenticated={isAuthenticated && tokenValidated}
                    onLogout={logout}
                  >
                    <ContentLoader loading={loading}>
                      <PageContainer stickOut={false}>
                        <ToastProvider>
                          <ControlledToast
                            autoClose={5000}
                            hideProgressBar={false}
                          />
                          {children}
                        </ToastProvider>
                      </PageContainer>
                    </ContentLoader>
                  </DrawerLayout>
                </DialogContextProvider>
              </ExpirationContextProvider>
            </TabsContextProvider>
          </ThemeProvider>
        </AccountSetupContextProvider>
      </PageLoaderContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
