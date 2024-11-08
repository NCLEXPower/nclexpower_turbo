import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useClearCookies } from "../../hooks/useClearCookies";
import { parseTokenId } from "./access-token";
import {
  useAccessLevel,
  useAccessToken,
  useAccountId,
  useRefreshToken,
} from "./hooks";
import {
  useApiCallback,
  useSensitiveInformation,
  clearSession,
} from "../../hooks";
import {
  internalAccountType,
  LoginParams,
  RegisterParams,
} from "../../types/types";
import { CookieSetOptions, useSingleCookie } from "../../hooks/useCookie";
import { config } from "../../config";
import { useRouter } from "../../core";
import { useExecuteToast } from "../ToastContext";
import { OTPPreparation, RevokeParams } from "../../api/types";

const context = createContext<{
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
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
}>(undefined as any);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const router = useRouter();
  const toast = useExecuteToast();
  const [verificationPreparation, setVerificationPreparation] =
    useState<OTPPreparation>({} as OTPPreparation);
  const [clearCookies] = useClearCookies();
  const [accessToken, setAccessToken] = useAccessToken();
  const [accountId, setAccountId] = useAccountId();
  const [accessLevel, setAccessLevel] = useAccessLevel();
  const [, setSingleCookie, clearSingleCookie] = useSingleCookie();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const {
    customer,
    internal,
    loading: dataloading,
  } = useSensitiveInformation();

  const loginCb = useApiCallback((api, data: LoginParams) =>
    api.auth.login(data)
  );
  const registerCb = useApiCallback((api, data: RegisterParams) =>
    api.web.web_account_setup(data)
  );

  const revokeCb = useApiCallback((api, data: RevokeParams) =>
    api.auth.revokeToken(data)
  );

  const internalAccountCb = useApiCallback(
    async (api, args: internalAccountType) =>
      await api.auth.web_create_internal_account(args)
  );
  const loading =
    loginCb.loading ||
    registerCb.loading ||
    internalAccountCb.loading ||
    dataloading;

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  const logout = useCallback(async () => {
    if (typeof internal === "undefined" || typeof customer === "undefined")
      return;

    try {
      if (refreshToken && accessToken && accountId) {
        await revokeCb.execute({
          accessToken: accessToken,
          refreshToken: refreshToken,
          appName: config.value.BASEAPP,
          email: internal.email || customer.email || "",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthenticated(false);
      clearCookies();
      clearSingleCookie();
      clearSession();
      await router.push((route) => route.login);
    }
  }, [refreshToken, accessToken, accountId, loading, customer, internal]);

  const softLogout = useCallback(async () => {
    clearSession();
  }, [refreshToken, accessToken]);

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
            });

            if (result.data.is2FaEnabled) {
              const prepareVerification = {
                email: email,
                password: password,
                appName: config.value.BASEAPP,
                procedure: "non-sso",
              } as OTPPreparation;
              setVerificationPreparation(prepareVerification);
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
          softLogout,
        }),
        [
          isAuthenticated,
          accessToken,
          refreshToken,
          verificationPreparation,
          loading,
        ]
      )}
    >
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => {
  if (!context) {
    throw new Error("AuthProvider should be used.");
  }
  return useContext(context);
};
