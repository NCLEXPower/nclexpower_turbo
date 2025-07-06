/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { GetServerSidePropsContext, NextApiResponse } from "next";
import { nonce } from "../types";
import { config } from "../config";
import { GetServerSideProps } from "next";
import { ServerResponse } from "http";
import {
  getEndpointResources,
  getHasActiveGoLive,
  getMaintenanceMode,
  getHasChatBotWidget,
} from "../ssr";

export const generateCSP = (generatedNonce: string): string => {
  const connectSrc = [
    "'self'",
    config.value.API_URL,
    config.value.LOCAL_API_URL,
    config.value.VERCELURL,
    "*.vercel.app",
    "*.herokuapp.com",
    "https://js.stripe.com",
    "https://api.ipify.org",
    "https://www.google.com",
    "https://www.gstatic.com",
    "wss://nclexdev-6ecb32719de0.herokuapp.com",
    "wss://*.herokuapp.com",
    "wss://*.vercel.app",
    "https://*.vercel.app",
    "blob:",
  ].join(" ");

  return `
    default-src 'self' *.vercel.app;
    script-src 'self' 'nonce-${generatedNonce}' 'unsafe-eval' 
      https://js.stripe.com *.vercel.app *.herokuapp.com 
      https://vercel.live https://www.google.com https://www.gstatic.com ${config.value.STRIPE_URL_JS};
    form-action 'self';
    base-uri 'self';
    object-src 'self';
    style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com 'unsafe-inline';
    connect-src ${connectSrc};
    img-src 'self' data: blob: webpack:;
    font-src 'self' data: https://fonts.gstatic.com;
    frame-src 'self' *.vercel.app https://js.stripe.com https://vercel.live 
      https://www.google.com https://www.gstatic.com ${config.value.STRIPE_URL_JS};
  `
    .replace(/\n\s+/g, " ")
    .trim();
};

export const setCSPHeader = (res: ServerResponse, csp: string): void => {
  if (process.env.NODE_ENV !== "development" && res && !res.headersSent) {
    res.setHeader("Content-Security-Policy", csp);
  }
};

export const withCSP = (getServerSidePropsFn?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const startTime = Date.now();
    const perfMetrics: Record<string, number> = {};

    try {
      const country = context.req.cookies["client_country"] || "";
      const generatedNonce = nonce();
      const csp = generateCSP(generatedNonce);

      setCSPHeader(context.res as ServerResponse, csp);

      const retry = async <T>(
        fn: () => Promise<T>,
        retries = 3,
        delay = 1000
      ): Promise<T> => {
        try {
          const start = Date.now();
          const result = await fn();
          perfMetrics[fn.name] = Date.now() - start; // Track actual execution time
          return result;
        } catch (err) {
          if (retries <= 0) throw err;
          await new Promise((res) => setTimeout(res, delay));
          return retry(fn, retries - 1, delay * 2);
        }
      };

      let timeoutId: NodeJS.Timeout;

      const [endpoints, MaintenanceStatus, hasGoLiveActive, hasChatBotWidget] =
        await Promise.race([
          Promise.all([
            retry(() => getEndpointResources()),
            retry(() => getMaintenanceMode()),
            retry(() => getHasActiveGoLive(country)),
            retry(() => getHasChatBotWidget()),
          ]).finally(() => clearTimeout(timeoutId)),
          new Promise<[any, any, any, any]>((_, reject) => {
            timeoutId = setTimeout(() => {
              console.log("API Metrics Before Timeout:", perfMetrics);
              reject(new Error("API timed out after 8s"));
            }, 8000);
          }),
        ]);

      const baseProps = {
        __N_SSP: true,
        generatedNonce,
        data: {
          MaintenanceStatus,
          endpoints,
          hasGoLive: hasGoLiveActive,
          hasChatBotWidget,
        },
      };

      if (!getServerSidePropsFn) {
        return { props: baseProps };
      }

      const result = await getServerSidePropsFn(context);
      if ("props" in result) {
        return {
          ...result,
          props: {
            ...result.props,
            ...baseProps,
            slug: context.resolvedUrl,
          },
        };
      }
      return result;
    } catch (error: any) {
      console.error(`withCSP error:`, error);
      return {
        props: {
          error: error instanceof Error ? error.message : "Unknown error",
          generatedNonce: nonce(),
          data: {
            MaintenanceStatus: { isMaintenance: false },
            endpoints: [],
            hasGoLive: { goLive: null },
            hasChatBotWidget: { hasChatBot: false },
          },
        },
      };
    } finally {
      console.log(`withCSP completed in ${Date.now() - startTime}ms`);
    }
  };
};
