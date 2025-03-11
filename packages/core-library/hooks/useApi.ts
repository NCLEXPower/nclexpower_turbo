import { AxiosInstance } from "axios";
import { useAsync, useAsyncCallback } from "react-async-hook";
import { Api } from "../api";
import { WebApi } from "../api/web/web-api";
import Http, { HttpOptions } from "../http-client";
import { getItem } from "../session-storage";
import { config } from "../config";
import { PreloadedGlobalsApi } from "../api/preloaded/preloaded-globals-api";
import { WebApiBackOffice } from "../api/web/web-api-backoffice";
import { WebOfficeApi } from "../content-api";
import { CalculationApi } from "../api/calc/calc-api";
import { AuthApi } from "../api/auth/auth-api";
import { getTimeZone } from "../utils";

const HTTP_OPTIONS: HttpOptions = {
  headers: {
    "x-api-key": config.value.XAPIKEY,
    "Content-Type": "application/json",
    "X-Environment":
      process.env.NODE_ENV === "development" ? "local" : config.value.SYSENV,
    "X-Time-Zone": getTimeZone(), // we should create a middleware to get the timezone dynamically.
  },
  onRequest: (req) => {
    const accessToken = getItem<string | undefined>("accessToken");
    if (req.headers && accessToken)
      req.headers.Authorization = `Bearer ${accessToken}`;
  },
  onError: (error) => {
    const user = getItem<string | undefined>("user");
    console.error(
      `Error on response: ${JSON.stringify(error)}. User ${JSON.stringify(user)}`
    );
    throw error;
  },
};

export const httpClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === "development"
      ? config.value.LOCAL_API_URL
      : config.value.API_URL,
});
export const mockHttpClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === "development"
      ? config.value.LOCAL_API_URL
      : config.value.API_URL,
});
export const httpSsrClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === "development" && typeof window != "undefined"
      ? `${window.location.origin}`
      : typeof window !== "undefined"
        ? window.location.origin
        : undefined,
});

export const useApi = <R, D extends unknown[]>(
  asyncFn: (api: Api) => Promise<R>,
  deps?: D
) => {
  return useAsync(async () => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [httpClient, ...(deps || [])]);
};

export const useApiCallback = <R, A extends unknown>(
  asyncFn: (api: Api, args: A) => Promise<R>
) => {
  return useAsyncCallback(async (args?: A) => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api, args as A);
    } catch (error: any) {
      throw error;
    }
  });
};

export const useApiContent = <R, D extends unknown[]>(
  asyncFn: (api: WebOfficeApi) => Promise<R>,
  deps?: D
) => {
  return useAsync(async () => {
    try {
      const api = contentApi(mockHttpClient.client, httpSsrClient.client);
      return await asyncFn(api);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [httpClient, ...(deps || [])]);
};

export const useContentApiCallback = <R, A extends unknown>(
  asyncFn: (api: WebOfficeApi, args: A) => Promise<R>
) => {
  return useAsyncCallback(async (args?: A) => {
    try {
      const api = contentApi(mockHttpClient.client, httpSsrClient.client);
      return await asyncFn(api, args as A);
    } catch (error: any) {
      throw new Error(error);
    }
  });
};

function createApi(client: AxiosInstance, httpSsrClient: AxiosInstance) {
  return new Api(
    new CalculationApi(client, httpSsrClient),
    new WebApi(client, httpSsrClient),
    new PreloadedGlobalsApi(client),
    new WebApiBackOffice(client, httpSsrClient),
    new AuthApi(client, httpSsrClient)
  );
}

function contentApi(client: AxiosInstance, httpSsrClient: AxiosInstance) {
  return new WebOfficeApi(new WebApiBackOffice(client, httpSsrClient));
}
