/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import {
  StripeContextProvider,
  useAuthContext,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
} from "core-library/contexts";
import { useStripeConfig } from "core-library/core/hooks/stripe/useStripeConfig";
import { Footer } from "core-library/components/ReusableFooter/Footer";
import {
  CompanyInfo,
  CustomerMenus,
  list,
} from "core-library/core/utils/contants/wc/HomePageData";
import { ChatBotWidget, DrawerLayout } from "core-library/components";
import { useWebHeaderStyles } from "@/pages/contents/useWebHeaderStyles";
import { useConfirmedIntent } from "core-library/contexts/auth/hooks";
import { usePaymentSuccessRedirect } from "@/core/hooks/usePaymentSuccessRedirect";
import { theme } from "core-library/contents/theme/theme";
import { useAuthInterceptor, useStyle } from "core-library/hooks";
import { PageLoaderContextProvider } from "core-library/contexts/PageLoaderContext";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const queryClient = new QueryClient();
  const { publishableKey } = useStripeConfig();
  const { isAuthenticated, logout, loading } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const headerStyles = useWebHeaderStyles();
  const sidebarStyles = useStyle();
  const [confirmValue] = useConfirmedIntent();
  usePaymentSuccessRedirect(confirmValue);
  useAuthInterceptor();

  return (
    <PageLoaderContextProvider
      isAuthenticated={isAuthenticated}
      loading={loading}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <HeaderTitleContextProvider>
            <FormSubmissionContextProvider>
              <StripeContextProvider publishableKey={publishableKey}>
                <LoadablePageContent loading={loading}>
                  <DrawerLayout
                    menu={headerMenu}
                    isAuthenticated={isAuthenticated}
                    headerStyles={headerStyles}
                    sidebarStyles={sidebarStyles}
                    onLogout={logout}
                  >
                    {children}
                    <Footer info={CompanyInfo} list={list} />
                    {/* dynamic hideHelp should be implemented here */}
                    {true && <ChatBotWidget />}
                  </DrawerLayout>
                </LoadablePageContent>
              </StripeContextProvider>
            </FormSubmissionContextProvider>
          </HeaderTitleContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PageLoaderContextProvider>
  );
};

export default Layout;
