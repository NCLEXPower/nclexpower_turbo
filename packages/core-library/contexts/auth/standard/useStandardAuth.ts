import { useCallback, useEffect, useState } from "react";
import { isCustomer, useRouter } from "../../../core";
import { useClearCookies } from "../../../hooks/useClearCookies";
import {
  useAccessToken,
  useRefreshToken,
  useAccountReference,
  useTwoFactorAuthenticationToken,
  useResolvedProductId,
  useSession,
} from "../hooks";
import { AuthService, LoginOptions, SoftLogoutOptions } from "../types";
import { clearSession, useApiCallback } from "../../../hooks";
import { LoginParams, LoginResponse, LogoutParamsV2 } from "../../../api/types";
import { useAuthSessionIdleTimer } from "../hooks/useAuthSessionIdleTimer";
import {
  useReferenceCookie,
  useSingleCookie,
  useTwoFactorAuthenticationCookie,
} from "../../../hooks/useCookie";
import { InternalOptions } from "../hooks/useCreate";
import { useLazyCreate } from "../hooks/useLazyCreate";
import { CustomerOptions } from "../../../types/global";
import { internalAccountType } from "../../../types/types";

export const useStandardAuth = (): AuthService => {
  const router = useRouter();
  const { create, loading: isCreateTasksRunning } = useLazyCreate();
  const [clearCookies] = useClearCookies();
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [, setTwoFactorAuthenticationToken, clearTwoFactorAuthentication] =
    useTwoFactorAuthenticationToken();
  const [, setAccountReference] = useAccountReference();
  const [, setSingleCookie] = useSingleCookie();
  const [, setReference] = useReferenceCookie();
  const [, setTwoFactorAuthenticationCookie] =
    useTwoFactorAuthenticationCookie();
  const [, , clearResolvedProductId] = useResolvedProductId();

  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [session, setSession] = useSession();

  const loginCb = useApiCallback((api, p: LoginParams) => api.auth.login(p));
  const logoutCb = useApiCallback((api, p: LogoutParamsV2) =>
    api.auth.logout(p)
  );
  const createInternalCb = useApiCallback((api, p: internalAccountType) =>
    api.auth.web_create_internal_account(p)
  );

  const authSessionIdleTimer = useAuthSessionIdleTimer({
    onSessionExpired: async () => {
      await logout();
      await goToExpiredSessionPage();
    },
    sessionId: session || accessToken,
  });

  const loading = loginCb.loading || logoutCb.loading || createInternalCb.loading || isCreateTasksRunning;
  isAuthenticated;

  useEffect(() => {
    const authState = !!accessToken;
    if (authState !== isAuthenticated) {
      setIsAuthenticated(authState);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && (session || accessToken)) {
      authSessionIdleTimer.start();
    }
    return () => {
      authSessionIdleTimer.stop();
    };
  }, [isAuthenticated, session, accessToken]);

  const logout = useCallback(async () => {
    try {
      let currentRefreshToken = refreshToken;

      if (currentRefreshToken) {
        await logoutCb.execute({ refreshToken: currentRefreshToken });
      }
    } catch (e) {
      console.error("Failed executing the logout service", e as string);
    } finally {
      clearCookies();
      clearSession();
      setIsAuthenticated(false);
      authSessionIdleTimer.stop();
    }
  }, [refreshToken, accessToken, logoutCb]);

  const softLogout = useCallback(
    async ({ clearChat = true }: SoftLogoutOptions = {}) => {
      if (clearChat) {
        /*...return remove webchat history? */
      }
      clearSession();
      clearCookies();
      setIsAuthenticated(false);
      authSessionIdleTimer.stop();
    },
    [refreshToken, accessToken]
  );

  async function goToExpiredSessionPage() {
    await router.push((router) => router.login);
  }

  function setSecurityMeasures(result: LoginResponse, has2FA?: boolean) {
    if (has2FA) {
      setTwoFactorAuthenticationToken(
        result?.twoFactorAuthInformation.twoFactorToken
      );
      setAccountReference(result?.accountReference);
      setTwoFactorAuthenticationCookie(
        result?.twoFactorAuthInformation.twoFactorToken,
        {
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          domain: `.${window.location.hostname}`,
        }
      );
      setReference(result?.accountReference, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        domain: `.${window.location.hostname}`,
      });
    } else {
      clearResolvedProductId();
      clearTwoFactorAuthentication();
      clearCookies();
      setAccessToken(result?.accessTokenResponse.accessToken);
      setRefreshToken(result?.accessTokenResponse.refreshToken);
      setAccountReference(result?.accountReference);
      setSession(result?.sessionId);
      setReference(result?.accountReference, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        domain: `.${window.location.hostname}`,
      });
      setSingleCookie(result?.accessTokenResponse.accessToken, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        domain: `.${window.location.hostname}`,
      });
      setIsAuthenticated(true);
    }
  }

  async function register(
    params: typeof isCustomer extends true ? CustomerOptions : InternalOptions
  ) {
    try {
      return await create({ ...params });
    } catch (error) {
      console.error(`Something went wrong during account creation: ${error}`);
    }
  }

  async function createInternal(params: internalAccountType) {
    try {
      return await createInternalCb.execute(params);
    } catch (error) {
      console.error(`Something went wrong during internal account creation: ${error}`);
      throw error;
    }
  }

  return {
    loading,
    isAuthenticated,
    login: async (options?: LoginOptions) => {
      try {
        const { email, password } = options || {};

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const result = await loginCb.execute({
          email: email,
          password: password,
        });

        if (result?.data.twoFactorAuthInformation?.has2FactorAuthentication) {
          setSecurityMeasures(result?.data, true);
          return { requires2FA: true };
        }

        setSecurityMeasures(result?.data, false);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Something went wrong during login", error);
        setIsAuthenticated(false);
        throw error;
      }
    },
    logout,
    softLogout,
    setIsAuthenticated,
    isAuthenticating: false,
    setIsAuthTasksRunning: async () => {
      throw new Error("Not implemented");
    },
    register,
    createInternal,
    setSecurityMeasures,
  };
};
