import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { parseTokenId } from "./access-token";
import {
  useAccessLevel,
  useAccessToken,
  useAccountId,
  useRefreshToken,
  useSession,
  useDeviceNotRecognized,
  useNewAccount,
  usePaid,
} from "./hooks";
import {
  useApiCallback,
  useSensitiveInformation,
  clearSession,
  useDeviceInfo,
  SetValue,
} from "../../hooks";
import { internalAccountType, RegisterParams } from "../../types/types";
import {
  CookieSetOptions,
  useAccountIdCookie,
  useAnalyticsDetails,
  useDeviceId,
  useSingleCookie,
} from "../../hooks/useCookie";
import { config } from "../../config";
import {
  isMixpanelEnabled,
  mixpanelBuildUserProfile,
  mixpanelTrackLogin,
  useRouter,
} from "../../core";
import { useExecuteToast } from "../ToastContext";
import {
  EnrolledDeviceUpdaterParams,
  LoginParams,
  OTPPreparation,
  RevokeParams,
} from "../../api/types";
import { useAuthSessionIdleTimer } from "./hooks/useAuthSessionIdleTimer";
import { Encryption } from "../../utils";
import { clear } from "console";

const context = createContext<{
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  loginFromSso(): Promise<void>;
  register(data: RegisterParams): Promise<number>;
  createInternal(data: internalAccountType): Promise<number>;
  logout(): Promise<void>;
  softLogout: AsyncFunction;
  setIsAuthenticated: (value: boolean) => void;
  verificationPreparation: OTPPreparation;
  setVerificationPreparation: (value: OTPPreparation) => void;
  setAccessToken: (
    value:
      | string
      | ((storedValue: string | undefined) => string | undefined)
      | undefined
  ) => void;
  setRefreshToken: (
    value:
      | string
      | ((storedValue: string | undefined) => string | undefined)
      | undefined
  ) => void;
  setSingleCookie: (value: string | null, options?: CookieSetOptions) => void;
  setAccountCookie: (value: string | null, options?: CookieSetOptions) => void;
  integrateDeviceInUseUpdater: (
    accountId: string,
    inUse?: boolean
  ) => Promise<void>;
  initializeAnalyticsUser: (accountId?: string) => Promise<void>;
  setAccountId: SetValue<string | undefined>;
  setAccessLevel: SetValue<number | undefined>;
  setSession: SetValue<string | undefined>;
  isPaid: string | undefined;
  setIsPaid: SetValue<string | undefined>;
}>(undefined as any);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const toast = useExecuteToast();
  const [verificationPreparation, setVerificationPreparation] =
    useState<OTPPreparation>({} as OTPPreparation);
  const [accessToken, setAccessToken] = useAccessToken();
  const [session, setSession] = useSession();
  const [accountId, setAccountId] = useAccountId();
  const [isPaid, setIsPaid] = usePaid();
  const [accessLevel, setAccessLevel] = useAccessLevel();
  const [, setSingleCookie, clearSingleCookie] = useSingleCookie();
  const [, setAccountCookie, clearAccountCookie] = useAccountIdCookie();
  const [, , clearAnalyticsCookie] = useAnalyticsDetails();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!accessToken || false
  );
  const [deviceNotRecognized, setDeviceNotRecognized] =
    useDeviceNotRecognized();
  const { getDeviceDetails } = useDeviceInfo();
  const [accessDeviceId] = useDeviceId();
  const {
    customer,
    internal,
    loading: dataloading,
  } = useSensitiveInformation();

  const analyticsParamsCb = useApiCallback((api, id: string) =>
    api.web.analyticsParams(id)
  );

  const loginCb = useApiCallback((api, data: LoginParams) =>
    api.auth.login(data)
  );

  const loginSessionCb = useApiCallback((api, sessionId: string) =>
    api.auth.loginFromSession(sessionId)
  );

  const registerCb = useApiCallback((api, data: RegisterParams) =>
    api.web.web_account_setup(data)
  );

  const revokeCb = useApiCallback((api, data: RevokeParams) =>
    api.auth.revokeToken(data)
  );

  const destroySessionCb = useApiCallback(
    async (
      api,
      args: { sessionId: string; deviceId: string; isAuthenticated: boolean }
    ) => await api.auth.destroySession(args)
  );

  const enrolledDeviceUpdaterCb = useApiCallback(
    async (api, args: EnrolledDeviceUpdaterParams) =>
      await api.auth.enrolledDeviceUpdater(args)
  );

  const authSessionIdleTimer = useAuthSessionIdleTimer({
    onSessionExpired: async () => {
      await softLogout();
      await goToExpiredSessionPage();
    },
    sessionId: session,
  });

  const internalAccountCb = useApiCallback(
    async (api, args: internalAccountType) =>
      await api.auth.web_create_internal_account(args)
  );
  const loading =
    loginCb.loading ||
    registerCb.loading ||
    internalAccountCb.loading ||
    destroySessionCb.loading ||
    revokeCb.loading ||
    enrolledDeviceUpdaterCb.loading ||
    dataloading;

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!isAuthenticated || !session || !accessToken)
      return authSessionIdleTimer.stop;
    return authSessionIdleTimer.start();
  }, [isAuthenticated, session, accessToken]);

  const logout = useCallback(async () => {
    try {
      if (refreshToken && accessToken && accountId && session) {
        await revokeCb.execute({
          accessToken: accessToken,
          refreshToken: refreshToken,
          appName: config.value.BASEAPP,
          email: internal?.email || customer?.email || "",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      clearSingleCookie();
      clearAccountCookie();
      setIsAuthenticated(false);
      clearSession();
      authSessionIdleTimer.stop();
      clearAnalyticsCookie();
      await router.push((route) => route.login);
    }
  }, [refreshToken, accessToken, customer, internal]);

  const integrateDeviceInUseUpdater = useCallback(
    async (accountId: string, inUse: boolean = true) => {
      const { deviceType } = getDeviceDetails;
      if (!accessToken && !refreshToken && !deviceType) return;
      try {
        if (accessDeviceId !== null && typeof accessDeviceId !== "undefined") {
          await enrolledDeviceUpdaterCb.execute({
            accountId: accountId,
            deviceId: accessDeviceId,
            deviceType: deviceType ?? "desktop",
            inUse: inUse,
          });
        }
      } catch (e) {
        console.error(
          `Something went wrong during integration of inuse updater`,
          e
        );
      }
    },
    [accessDeviceId, getDeviceDetails, accessToken, refreshToken]
  );

  async function cleanseSession(condition: boolean | undefined) {
    if (condition && session) {
      await destroySessionCb.execute({
        sessionId: session,
        deviceId: accessDeviceId ?? "no-device-id",
        isAuthenticated,
      });
    }
  }

  async function cleanseOpenSession() {
    await cleanseSession(!isAuthenticated && deviceNotRecognized);
  }

  async function cleanseAuthSession() {
    await cleanseSession(Boolean(accessToken && refreshToken));
  }

  const softLogout = useCallback(async () => {
    clearSingleCookie();
    clearAccountCookie();
    setIsAuthenticated(false);
    clearSession();
    authSessionIdleTimer.stop();
    await router.push((route) => route.login);
  }, [refreshToken, accessToken]);

  const initializeAnalyticsUser = useCallback(
    async (accountId?: string) => {
      if (isMixpanelEnabled()) {
        try {
          const analyticsParamsResult =
            await analyticsParamsCb.execute(accountId);
          const resultSize = Object.keys(analyticsParamsResult).length;
          console.log(`Analytics result size: ${resultSize}`);
          mixpanelBuildUserProfile(analyticsParamsResult.data);
          mixpanelTrackLogin();
        } catch (error) { }
      }
    },
    [analyticsParamsCb, accessToken]
  );

  return (
    <context.Provider
      value={useMemo(
        () => ({
          loading,
          isAuthenticated,
          login: async (email, password) => {
            const result = await loginCb.execute({
              email,
              password,
              appName: config.value.BASEAPP,
              deviceId:
                accessDeviceId === null || typeof accessDeviceId === "undefined"
                  ? "no-device-id"
                  : accessDeviceId,
            });
            const parsedAccountId =
              config.value.BASEAPP === "webc_app"
                ? Encryption(result.data.accountId, config.value.SECRET_KEY)
                : result.data.accountId;
            const parsedIsPaid =
              config.value.BASEAPP === "webc_app"
                ? Encryption(
                  result.data.isPaid.toString(),
                  config.value.SECRET_KEY
                )
                : result.data.isPaid;
            // if (result.data.responseCode === 304) {
            //   setDeviceNotRecognized(true);
            //   setSession(result.data.sessionId);
            //   setAccountId(result.data.accountId);
            //   await router.push((route) => route.device_not_recognized);
            //   return;
            // }
            if (result.data.is2FaEnabled) {
              const prepareVerification = {
                email: email,
                password: password,
                appName: config.value.BASEAPP,
                procedure: "non-sso",
              } as OTPPreparation;
              setVerificationPreparation(prepareVerification);
              setAccountCookie(parsedAccountId, {
                path: "/",
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                domain: `.${window.location.hostname}`,
              });
              await router.push((route) => route.account_verification_otp);
              return;
            }
            setIsPaid(parsedIsPaid);
            setAccountId(parsedAccountId);
            setAccessLevel(result.data.accessLevel);
            setAccessToken(result.data.accessTokenResponse.accessToken);
            setRefreshToken(result.data.accessTokenResponse.refreshToken);
            setSession(result.data.sessionId);
            setSingleCookie(result.data.accessTokenResponse.accessToken, {
              path: "/",
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
              domain: `.${window.location.hostname}`,
            });
            setAccountCookie(parsedAccountId, {
              path: "/",
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
              domain: `.${window.location.hostname}`,
            });
            setIsAuthenticated(true);
            await initializeAnalyticsUser(parsedAccountId);
            await router.push((route) => route.hub);
          },
          loginFromSso: async () => {
            const result = await loginSessionCb.execute(session);
            if (result.data.is2FaEnabled) {
            } //need extensive dev in backend for sso. current prob -> sso doesn't have email and password.
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
            await integrateDeviceInUseUpdater(result.data.accountId);
            await router.push((route) => route.hub);
          },
          register: async (data: RegisterParams) => {
            const result = await registerCb.execute({
              ...data,
              appName: "webdev_app",
            });
            return result?.data;
          },
          createInternal: async (data: internalAccountType) => {
            const result = await internalAccountCb.execute({
              ...data,
            });
            return result?.data;
          },
          logout,
          setIsAuthenticated,
          verificationPreparation,
          setVerificationPreparation,
          setAccessToken,
          setRefreshToken,
          setSingleCookie,
          setAccountCookie,
          softLogout,
          integrateDeviceInUseUpdater,
          initializeAnalyticsUser,
          setAccountId,
          setAccessLevel,
          setSession,
          isPaid,
          setIsPaid,
        }),
        [
          isAuthenticated,
          accessToken,
          refreshToken,
          verificationPreparation,
          loading,
          getDeviceDetails,
        ]
      )}
    >
      {children}
    </context.Provider>
  );

  async function goToExpiredSessionPage() {
    await router.push((route) => route.login);
    return;
  }
};

export const useAuthContext = () => {
  if (!context) {
    throw new Error("AuthProvider should be used.");
  }
  return useContext(context);
};
