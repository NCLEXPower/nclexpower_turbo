import { signIn, useSession, signOut } from "next-auth/react";
import { useApiCallback } from "./useApi";
import { useExecuteToast } from "../contexts";
import { useEffect, useState } from "react";
import { SsoExtraDetails, SsoLoginParams } from "../api/types";
import { useRouter } from "../core";
import {
  useAccessLevel,
  useAccessToken,
  useAccountId,
  useRefreshToken,
} from "../contexts/auth/hooks";
import { useSingleCookie } from "./useCookie";
import { parseTokenId } from "../contexts/auth/access-token";

export const useGoogleSignIn = () => {
  const router = useRouter();
  const [accountId, setAccountId] = useAccountId();
  const [accessLevel, setAccessLevel] = useAccessLevel();
  const [, setSingleCookie] = useSingleCookie();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [accessToken, setAccessToken] = useAccessToken();
  const [ssoDetails, setSsoDetails] = useState<SsoExtraDetails>();
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const emailCb = useApiCallback(
    async (api, args: { email: string }) =>
      await api.web.web_select_email(args.email)
  );
  const ssoLoginCb = useApiCallback(
    async (api, args: SsoLoginParams) => await api.auth.ssoLogin(args)
  );
  const toast = useExecuteToast();

  async function checkEmailCb(email: string) {
    try {
      const result = await emailCb.execute({ email: email });

      if (result.data.isExpired) {
        toast.executeToast(
          "The account you are trying to access is already expired.",
          "top-right",
          false,
          { type: "error" }
        );
        signOut();
        return;
      }

      if (!result.data.accountIsFound) {
        toast.executeToast(
          "The account you are trying to access is not found.",
          "top-right",
          false,
          { type: "error" }
        );
        signOut();
        return;
      }

      if (
        result.data.accountIsFound &&
        result.data.proceed &&
        !result.data.isExpired
      ) {
        const result = await ssoLoginCb.execute({ email: email });
        if (result.data.is2FaEnabled) {
          setSsoDetails({ email: email, procedure: "sso" });
          router.push((route) => route.account_verification_otp);
          return;
        }
        if (result.data.responseCode === 404) {
          toast.executeToast(
            "Invalid email or password. Please try again.",
            "top-right",
            false,
            {
              toastId: 0,
              type: "error",
            }
          );
          return;
        }

        setAccountId(result.data.accountId);
        setAccessLevel(result.data.accessLevel);
        setAccessToken(result.data.accessTokenResponse.accessToken);
        setRefreshToken(result.data.accessTokenResponse.refreshToken);
        setSingleCookie(
          parseTokenId(result.data.accessTokenResponse.accessToken),
          {
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            domain: `.${window.location.hostname}`,
          }
        );
        setIsAuthenticated(true);
        await router.push((route) => route.hub);
      }
    } catch (error) {
      console.error(`Error checking email: ${error}`);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    if (status === "authenticated" && session.user?.email) {
      checkEmailCb(session.user.email);
    }
  }, [session, status, isAuthenticated]);

  const signInWithGoogle = () => {
    signIn("google");
  };

  return {
    signInWithGoogle,
    ssoDetails,
    setSsoDetails,
  };
};
