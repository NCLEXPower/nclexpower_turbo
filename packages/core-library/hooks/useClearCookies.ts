import { useCookies as useReactCookies } from "react-cookie";
import { config } from "../config";

export const useClearCookies = () => {
  const [cookies, , removeCookie] = useReactCookies();

  const clear = () => {
    Object.keys(cookies).forEach(
      (key) => cookieDeletable(key) && removeCookie(key, { path: "/" })
    );
    deleteAllDocumentCookies();
  };
  return [clear];
};

const deleteAllDocumentCookies = () =>
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    if (cookieDeletable(name)) {
      document.cookie =
        name +
        `=;expires=Thu, 01 Jan 1970 00:00:00 GMT+8;path=/;domain=.${window.location.host}`;
    }
  });

const cookieDeletable = (cookie: string) =>
  config.value.WHITELISTED_COOKIES.every((c: string) => !cookie.includes(c));
