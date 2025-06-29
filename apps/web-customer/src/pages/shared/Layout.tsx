/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import {
  useAuthContext,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
} from "core-library/contexts";
import { Footer } from "core-library/components/ReusableFooter/Footer";
import {
  FooterStaticInfo,
  CustomerMenus,
  FooterSocialLinks,
} from "core-library/core/utils/contants/wc/HomePageData";
import {
  ChatBotWidget,
  DrawerLayout,
  MultiContentDialog,
} from "core-library/components";
import { theme } from "core-library/contents/theme/theme";
import { useExtraConfig, usePreventDuplicateSession } from "core-library/hooks";
import { PageLoaderContextProvider } from "core-library/contexts/PageLoaderContext";
import { ContentLoader } from "core-library/router";
import { DuplicateSessionBlock } from "core-library/system/app/internal/blocks";
import { dataContent } from "@/constants/constants";
import { AccountReferenceProvider } from "core-library/contexts/AccountReferenceContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

interface LayoutProps {
  shouldShowChatBotWidget?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  shouldShowChatBotWidget,
}) => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, logout, loading } = useAuthContext();
  const config = useExtraConfig();

  const { duplicate } = usePreventDuplicateSession();
  const menu = useMemo(() => CustomerMenus(isAuthenticated), [isAuthenticated]);

  // This modal below doesn't work yet.
  // if (
  //   config?.config.isNewlyCreated &&
  //   config?.config.isPaid &&
  //   isAuthenticated
  // ) {
  //   return (
  //     <MultiContentDialog
  //       content={dataContent}
  //       open={true}
  //       handleClose={() => {}}
  //       showTour
  //     />
  //   );
  // }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
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
      <AccountReferenceProvider
        isAuthenticated={isAuthenticated}
        authLoading={loading}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <HeaderTitleContextProvider>
              <FormSubmissionContextProvider>
                <DrawerLayout
                  menu={menu}
                  isAuthenticated={isAuthenticated && config?.config.isPaid}
                  onLogout={logout}
                >
                  <ContentLoader loading={loading}>
                    <LoadablePageContent loading={loading}>
                      {children}
                      <Footer
                        info={FooterStaticInfo}
                        list={FooterSocialLinks}
                      />
                      {shouldShowChatBotWidget && <ChatBotWidget />}
                    </LoadablePageContent>
                  </ContentLoader>
                </DrawerLayout>
              </FormSubmissionContextProvider>
            </HeaderTitleContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AccountReferenceProvider>
    </PageLoaderContextProvider>
  );
};

export default Layout;
