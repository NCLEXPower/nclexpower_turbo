import type { AppProps } from "next/app";
import { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import "./mui.css";
import { ParseContents } from "core-library/system";
import { default as Router } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import "core-library/styles/global.css";
import "core-library/styles/nprogress.css";
import { useEmotionCache } from "core-library/hooks";
import { CacheProvider } from "@emotion/react";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";
import { config } from "core-library/config";
import { SsrTypes } from "core-library/types/global";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const cache = useEmotionCache();

  console.log("pageProps: ", pageProps?.data as SsrTypes);

  return (
    <CacheProvider value={cache}>
      <CookiesProvider>
        {config.value.COOKIE_SCRIPT_URL &&
          config.value.COOKIE_DOMAIN_SCRIPT && (
            <>
              <Script
                type="text/javascript"
                strategy="beforeInteractive"
                src={config.value.COOKIE_SCRIPT_URL}
                data-domain-script={config.value.COOKIE_DOMAIN_SCRIPT}
              />
              <Script type="text/javascript">{`function OptanonWrapper() {}`}</Script>
            </>
          )}
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ParseContents
          appName={config.value.BASEAPP}
          data={pageProps?.data as SsrTypes}
        >
          <Suspense>
            <Component {...pageProps} />
          </Suspense>
        </ParseContents>
      </CookiesProvider>
    </CacheProvider>
  );
}
