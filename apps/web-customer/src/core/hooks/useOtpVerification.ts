import { Dispatch, SetStateAction, useState } from "react";
import { useApiCallback, useGoogleSignIn } from "core-library/hooks";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library/core/router";
import {
  OTPPreparation,
  ResendCodeParams,
  SsoExtraDetails,
  SsoVerify2FAParams,
  Verify2FAParams,
  VerifyCodeParams,
} from "core-library/api/types";
import { parseTokenId } from "core-library/contexts/auth/access-token";
import { Encryption } from "core-library";
import { config } from "core-library/config";

interface OtpVerificationResult {
  verifyOtp: (params: VerifyCodeParams) => Promise<void>;
  executeVerify2faCb: (props: Verify2FAParams) => Promise<void>;
  executeSsoVerify2faCb: (props: SsoVerify2FAParams) => Promise<void>;
  waitTime: number;
  loading: boolean;
  resendLoading: boolean;
  error: string | null;
  setWaitTime: Dispatch<SetStateAction<number>>;
  resendOtp(params: ResendCodeParams): Promise<void>;
  resetTime: number;
  setResetTime: Dispatch<SetStateAction<number>>;
  verificationPreparation: OTPPreparation;
  ssoDetails: SsoExtraDetails | undefined;
}

export const useOtpVerification = (): OtpVerificationResult => {
  const verifyCb = useApiCallback(
    async (api, args: VerifyCodeParams) =>
      await api.web.web_verify_otp_code(args)
  );
  const verify2faCb = useApiCallback(
    async (api, args: Verify2FAParams) => await api.auth.verify_2fa(args)
  );
  const ssoVerify2faCb = useApiCallback(
    async (api, args: SsoVerify2FAParams) => await api.auth.sso_verify_2fa(args)
  );
  const resendCb = useApiCallback(
    async (api, args: ResendCodeParams) =>
      await api.web.web_resend_otp_code(args)
  );
  const [waitTime, setWaitTime] = useState(0);
  const [resetTime, setResetTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useExecuteToast();
  const {
    verificationPreparation,
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
    setSingleCookie,
    setAccountCookie,
    initializeAnalyticsUser,
    setAccessLevel,
    setAccountId,
    setSession,
    setIsPaid,
  } = useAuthContext();
  const { ssoDetails, setSsoDetails } = useGoogleSignIn();

  const verifyOtp = async (props: VerifyCodeParams) => {
    try {
      const result = await verifyCb.execute({ ...props });
      switch (result.data.responseCode) {
        case 404:
          toast.executeToast(
            "Account not found please try again.",
            "top-right",
            false,
            { type: "error" }
          );
          await router.push("/account/forgot-password");
          break;
        case 1017:
          toast.executeToast(
            "Account not found please try again.",
            "top-right",
            false,
            { type: "error" }
          );
          await router.push("/account/forgot-password");
          break;
        case 508:
          setWaitTime(result.data.waitTimeInMinutes * 60);
          toast.executeToast(
            `You've reached the maximum number of sent verification codes. Please wait for ${result.data.waitTimeInMinutes} minutes and try again.`,
            "top-right",
            false,
            { type: "error" }
          );
          break;
        case 500:
          toast.executeToast(
            `Invalid verification code. Please try again.`,
            "top-right",
            false,
            { type: "error" }
          );
          break;
        default:
          toast.executeToast("Verification successful!", "top-right", true, {
            type: "success",
          });
          await router.push("/account/change-password");
          break;
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const executeSsoVerify2faCb = async (props: SsoVerify2FAParams) => {
    try {
      const result = await ssoVerify2faCb.execute({ ...props });
      if (result.data.responseCode === 500) {
        toast.executeToast(
          "Invalid verification code. Please try again",
          "top-right",
          false,
          { type: "error" }
        );
        return;
      }
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
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const executeVerify2faCb = async (props: Verify2FAParams) => {
    try {
      setSsoDetails(undefined);
      const result = await verify2faCb.execute({ ...props });
      const parsedAccountId =
        config.value.BASEAPP === "webc_app"
          ? Encryption(result.data.accountId, config.value.SECRET_KEY)
          : result.data.accountId;
      const parsedIsPaid =
        config.value.BASEAPP === "webc_app"
          ? Encryption(result.data.isPaid.toString(), config.value.SECRET_KEY)
          : result.data.isPaid;
      if (result.data.responseCode === 500) {
        toast.executeToast(
          "Invalid verification code. Please try again",
          "top-right",
          false,
          { type: "error" }
        );
        return;
      }
      setIsPaid(parsedIsPaid);
      setSession(result.data.sessionId);
      setAccountId(parsedAccountId);
      setAccessLevel(result.data.accessLevel);
      setAccessToken(result.data.accessTokenResponse.accessToken);
      setRefreshToken(result.data.accessTokenResponse.refreshToken);
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
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const resendOtp = async (params: ResendCodeParams) => {
    const result = await resendCb.execute({ ...params });
    switch (result.data.responseCode) {
      case 1017:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 1018:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 404:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 508:
        setWaitTime(result.data.waitTimeInMinutes * 60);
        toast.executeToast(
          `You've reached the maximum number of sent verification codes. Please wait for ${result.data.waitTimeInMinutes} minutes and try again.`,
          "top-right",
          false,
          { type: "error" }
        );
        break;
      default:
        toast.executeToast(
          "Verification code sent successfully",
          "top-right",
          true,
          {
            type: "success",
          }
        );
        break;
    }
  };

  return {
    verifyOtp,
    waitTime,
    loading: verifyCb.loading || verify2faCb.loading,
    resendLoading: resendCb.loading,
    error,
    setWaitTime,
    resendOtp,
    setResetTime,
    resetTime,
    executeVerify2faCb,
    verificationPreparation,
    executeSsoVerify2faCb,
    ssoDetails,
  };
};
