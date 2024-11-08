import { useCallback } from "react";
import { useCookies as useReactCookies } from "react-cookie";
import { config } from "../config";

type CookieValue<T> = { [key: string]: T | null };

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  encode?: (value: string) => string;
}

export const useCookie = <T>(
  key: string
): [
  T | null,
  (value: T | null, options?: CookieSetOptions) => void,
  VoidFunction,
] => {
  const [cookie, updateCookie, removeCookie] = useReactCookies<
    string,
    CookieValue<T>
  >([key]);

  const set = useCallback(
    (value: T | null, options?: CookieSetOptions) => {
      updateCookie(
        key,
        value,
        options ?? {
          path: "/",
          sameSite: true,
          secure: process.env.NODE_ENV === "production",
        }
      );
    },
    [key]
  );

  const clear = useCallback(() => {
    removeCookie(key, { path: "/" });
  }, [key]);

  return [cookie[key], set, clear];
};

export const useSingleCookie = (): [
  string | null,
  (value: string | null, options?: CookieSetOptions) => void,
  VoidFunction,
] => {
  return useCookie<string>(config.value.SCOOKIE);
};
