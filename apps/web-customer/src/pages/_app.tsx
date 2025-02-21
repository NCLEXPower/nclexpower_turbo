import type { AppProps } from "next/app";
import React, { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-photo-view/dist/react-photo-view.css";
import "./index.css";
import "./mui.css";
import "../styles/password-strength-meter.css";
import Page from "./shared/Page";
import Head from "next/head";
import { default as Router } from "next/router";
import NProgress from "nprogress";
import "core-library/styles/global.css";
import "core-library/styles/nprogress.css";
import { useEmotionCache } from "core-library/hooks";
import { useSaveTrackerParamsOnNavigation } from "core-library/hooks/useMixpanelTracker";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { SsrTypes } from "core-library/types/global";
import { CookieConsentDialog } from "core-library/components/Dialog/CookieConsentDialog";
import { initMixpanelTracker } from "core-library";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

/**
 * Initializes the Mixpanel tracker.
 * Temporarily disable the initialization of Mixpanel tracker.
 */

// if (typeof window !== "undefined") {
//   initMixpanelTracker();
// }

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const cache = useEmotionCache();
  // useSaveTrackerParamsOnNavigation();

  return (
    <CacheProvider value={cache}>
      <SessionProvider session={session}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Page
          data={pageProps?.data as SsrTypes}
          generatedNonce={pageProps?.generatedNonce as string}
          error={pageProps?.error}
          slug={pageProps?.slug as string}
        >
          <Suspense>
            <Component {...pageProps} />
            {process.env.NODE_ENV !== "development" && <CookieConsentDialog />}
          </Suspense>
        </Page>
      </SessionProvider>
    </CacheProvider>
  );
}
