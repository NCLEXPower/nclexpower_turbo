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

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const generateCSP = (generatedNonce: string): string =>
  `default-src 'self' *.vercel.app; script-src 'self' 'nonce-${generatedNonce}' 'unsafe-eval' https://js.stripe.com *.vercel.app *.herokuapp.com https://vercel.live https://www.google.com https://www.gstatic.com ` +
  config.value.STRIPE_URL_JS +
  " " +
  `; form-action 'self'; base-uri 'self'; object-src 'self'; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com 'unsafe-inline'; connect-src ` +
  config.value.API_URL +
  " " +
  config.value.LOCAL_API_URL +
  " " +
  config.value.VERCELURL +
  " *.vercel.app *.herokuapp.com https://js.stripe.com https://api.ipify.org https://www.google.com https://www.gstatic.com wss://nclexdev-6ecb32719de0.herokuapp.com wss://*.herokuapp.com wss://*.vercel.app https://*.vercel.app " +
  ` blob:; img-src 'self' data: blob: webpack:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' *.vercel.app https://js.stripe.com https://vercel.live https://www.google.com https://www.gstatic.com ` +
  config.value.STRIPE_URL_JS +
  ";";

export const setCSPHeader = (res: ServerResponse, csp: string): void => {
  const isDevelopment = process.env.NODE_ENV === "development";
  if (res != null && !isDevelopment && !res.headersSent) {
    res.setHeader("Content-Security-Policy", csp);
  }
};

export const withCSP = (getServerSidePropsFn?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    try {
      const country = context.req.cookies["client_country"] || "";
      const generatedNonce = nonce();
      const csp = generateCSP(generatedNonce);
      const endpoints = await getEndpointResources();
      const MaintenanceStatus = await getMaintenanceMode();
      const hasGoLiveActive = await getHasActiveGoLive(country);
      const hasChatBotWidget = await getHasChatBotWidget();

      setCSPHeader(context.res as ServerResponse, csp);

      const slug = context.resolvedUrl;

      if (getServerSidePropsFn) {
        const result = await getServerSidePropsFn(context);
        if ("props" in result) {
          return {
            ...result,
            props: {
              ...result.props,
              slug,
              generatedNonce,
              data: {
                MaintenanceStatus,
                endpoints,
                hasGoLive: hasGoLiveActive,
                hasChatBotWidget,
              },
            },
          };
        }

        return result;
      }

      return {
        props: {
          slug,
          generatedNonce,
          data: {
            MaintenanceStatus,
            endpoints,
            hasGoLive: hasGoLiveActive,
            hasChatBotWidget,
          },
        },
      };
    } catch (error: any) {
      return {
        props: { error: { message: error.message || "An error occurred." } },
      };
    }
  };
};
