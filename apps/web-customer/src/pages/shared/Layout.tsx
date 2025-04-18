/**
 * Property of the Arxon Solutions, LLC.
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
import {
  ChatBotWidget,
  DrawerLayout,
  ErrorBox,
  MultiContentDialog,
} from "core-library/components";
import {
  useConfirmedIntent,
  useNewAccount,
} from "core-library/contexts/auth/hooks";
import { usePaymentSuccessRedirect } from "@/core/hooks/usePaymentSuccessRedirect";
import { theme } from "core-library/contents/theme/theme";
import {
  useAuthInterceptor,
  usePreventDuplicateSession,
  useStyle,
  useWebHeaderStyles,
} from "core-library/hooks";
import { PageLoaderContextProvider } from "core-library/contexts/PageLoaderContext";
import { useContentDataContext } from "core-library/contexts/content/ContentDataContext";
import { ContentLoader } from "core-library/router";
import { useRouter } from "core-library";
import { dataContent } from "@/constants/constants";
import { DuplicateSessionBlock } from "core-library/system/app/internal/blocks";

const Layout: React.FC<
  React.PropsWithChildren<{ shouldShowChatBotWidget?: boolean }>
> = ({ children, shouldShowChatBotWidget }) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { isAuthenticated, logout, loading, isPaid } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const headerStyles = useWebHeaderStyles();
  const sidebarStyles = useStyle();
  const [confirmValue] = useConfirmedIntent();
  const [isNewAccount] = useNewAccount(); //this is a temporary implementation
  usePaymentSuccessRedirect(confirmValue);
  useAuthInterceptor();
  const showWelcomeDialog = isAuthenticated && isNewAccount;

  const { duplicate } = usePreventDuplicateSession();

  if (showWelcomeDialog) {
    return (
      <MultiContentDialog
        content={dataContent}
        open={showWelcomeDialog}
        handleClose={() => {}}
        showTour
      />
    );
  }

  if (duplicate) {
    return <DuplicateSessionBlock />;
  }


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
              <DrawerLayout
                menu={headerMenu}
                isAuthenticated={isAuthenticated}
                headerStyles={headerStyles}
                sidebarStyles={sidebarStyles}
                onLogout={logout}
                isPaid={isPaid}
              >
                <ContentLoader loading={loading || router.loading}>
                  <LoadablePageContent loading={loading}>
                    {children}
                    <Footer info={CompanyInfo} list={list} />
                    {shouldShowChatBotWidget && <ChatBotWidget />}
                  </LoadablePageContent>
                </ContentLoader>
              </DrawerLayout>
            </FormSubmissionContextProvider>
          </HeaderTitleContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PageLoaderContextProvider>
  );
};

export default Layout;
