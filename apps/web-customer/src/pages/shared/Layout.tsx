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
import { ChatBotWidget, DrawerLayout, MultiContentDialog } from "core-library/components";
import { useWebHeaderStyles } from "@/pages/contents/useWebHeaderStyles";
import { useConfirmedIntent, useNewAccount } from "core-library/contexts/auth/hooks";
import { usePaymentSuccessRedirect } from "@/core/hooks/usePaymentSuccessRedirect";
import { theme } from "core-library/contents/theme/theme";
import { useAuthInterceptor, useStyle } from "core-library/hooks";
import { PageLoaderContextProvider } from "core-library/contexts/PageLoaderContext";
import { useContentDataContext } from "core-library/contexts/content/ContentDataContext";
import { ContentLoader } from "core-library/router";
import { useRouter } from "core-library";
import { dataContent } from "@/constants/constants";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const contentData = useContentDataContext();
  const queryClient = new QueryClient();
  const { isAuthenticated, logout, loading } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const headerStyles = useWebHeaderStyles();
  const sidebarStyles = useStyle();
  const [confirmValue] = useConfirmedIntent();
  const [isNewAccount] = useNewAccount();
  usePaymentSuccessRedirect(confirmValue);
  useAuthInterceptor();

  if (isAuthenticated && isNewAccount) {
    return <MultiContentDialog content={dataContent} open={true} handleClose={close} startTour />
  }

  return (
    <PageLoaderContextProvider
      isAuthenticated={isAuthenticated}
      loading={loading || contentData.loading}
    >
      {loading || contentData.loading ? (
        <>Loading...</>
      ) : (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <HeaderTitleContextProvider>
              <FormSubmissionContextProvider>
                <ContentLoader
                  loading={loading || contentData.loading || router.loading}
                >
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
                      {/* dynamic hideHelp should be implemented here */}
                      {true && <ChatBotWidget />}
                    </DrawerLayout>
                  </LoadablePageContent>
                </ContentLoader>
              </FormSubmissionContextProvider>
            </HeaderTitleContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </PageLoaderContextProvider>
  );
};

export default Layout;
