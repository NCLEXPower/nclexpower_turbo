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
  isPaid: string | undefined;
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  loading,
  mockMenu,
  queryClient,
  tokenValidated,
  children,
  logout,
  isAuthenticated,
  isPaid,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLoaderContextProvider>
        <AccountSetupContextProvider>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <TabsContextProvider>
              <DialogContextProvider>
                <DrawerLayout
                  menu={mockMenu}
                  isAuthenticated={isAuthenticated && tokenValidated}
                  onLogout={logout}
                  isPaid={isPaid}
                  webCustomer={true}
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
            </TabsContextProvider>
          </ThemeProvider>
        </AccountSetupContextProvider>
      </PageLoaderContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
