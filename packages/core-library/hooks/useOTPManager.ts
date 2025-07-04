import { useState, useEffect } from "react";
import { OTPType } from "../schema";
import { useApiCallback } from "./useApi";
import { LoginResponse } from "../api/types";
import { AxiosResponse } from "axios";
import { useTwoFactorAuthenticationToken } from "../contexts/auth/hooks";

export type OTPManagerState = {
  remainingTime: number;
  loading: boolean;
};

type OTPManagerActions = {
  verifyOTP: (
    values: OTPType
  ) => Promise<AxiosResponse<LoginResponse, any> | undefined>;
  resendOTP: () => Promise<boolean | undefined>;
};

const COOLDOWN_DURATION = 30;

export const useOTPManager = (): [OTPManagerState, OTPManagerActions] => {
  const [twoFactorToken] = useTwoFactorAuthenticationToken();
  const verifyCb = useApiCallback(
    async (api, args: { code: string }) => await api.auth.verifyOtp(args)
  );
  const resendCb = useApiCallback(async (api) => await api.auth.resendOtp());

  const loading = resendCb.loading || verifyCb.loading;

  const [state, setState] = useState<OTPManagerState>({
    remainingTime: 0,
    loading: false,
  });

  useEffect(() => {
    if (!twoFactorToken) return;
    let interval: NodeJS.Timeout;

    if (state.remainingTime > 0) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          remainingTime: prev.remainingTime - 1,
        }));
      }, 1000);
    }
  }, [state.remainingTime]);

  async function verifyOTP(values: OTPType) {
    setState((prev) => ({ ...prev, loading: loading }));
    const result = await verifyCb.execute({ code: values.otp });
    return result;
  }

  async function resendOTP() {
    try {
      setState((prev) => ({ ...prev, loading: loading }));
      const result = await resendCb.execute();
      setState((prev) => ({
        ...prev,
        remainingTime: COOLDOWN_DURATION,
      }));
      return result.status === 200;
    } catch (error) {
      console.error(`Resending failed: ${error}`);
    }
  }

  return [
    state,
    {
      verifyOTP,
      resendOTP,
    },
  ];
};
