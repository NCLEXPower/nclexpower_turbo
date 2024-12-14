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
  useAuthContext,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
} from "core-library/contexts";
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
import { useContentDataContext } from "core-library/contexts/content/ContentDataContext";

type Props = {
  chatBotMode?: boolean
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children, chatBotMode }) => {
  const contentData = useContentDataContext();
  const queryClient = new QueryClient();
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
      loading={loading || contentData.loading}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <HeaderTitleContextProvider>
            <FormSubmissionContextProvider>
              <LoadablePageContent
                loading={loading || contentData.loading}
                pages={contentData.pages}
              >
                <DrawerLayout
                  menu={headerMenu}
                  isAuthenticated={isAuthenticated}
                  headerStyles={headerStyles}
                  sidebarStyles={sidebarStyles}
                  onLogout={logout}
                >
                  {children}
                  <Footer info={CompanyInfo} list={list} />
                  {chatBotMode && <ChatBotWidget />}
                </DrawerLayout>
              </LoadablePageContent>
            </FormSubmissionContextProvider>
          </HeaderTitleContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PageLoaderContextProvider>
  );
};

export default Layout;
