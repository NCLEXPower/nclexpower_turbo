import { useState, useEffect } from "react";
import { ValidateTokenParams } from "../api/types";
import { useExecuteToast } from "../contexts";
import { useAccessToken } from "../contexts/auth/hooks";
import { useApiCallback } from "./useApi";
import { config } from "../config";
import { useSingleCookie } from "./useCookie";

export const useValidateToken = () => {
  const [validateAuthorized, setValidateAuthorized] = useState<boolean>(false);
  const toast = useExecuteToast();
  const [accessToken, , clearAccessToken] = useAccessToken();
  const [cookieAccessToken] = useSingleCookie();
  const validateTokenCb = useApiCallback(
    async (api, args: ValidateTokenParams) => await api.auth.validateToken(args)
  );

  async function validateToken(params: ValidateTokenParams) {
    if (!params.accessToken || !accessToken || !cookieAccessToken) return;
    try {
      return await validateTokenCb.execute({ ...params });
    } catch (error) {
      clearAccessToken();
      return;
    }
  }

  useEffect(() => {
    async function handleValidateToken() {
      const result = await validateToken({
        accessToken: accessToken ?? cookieAccessToken,
        appName: config.value.BASEAPP,
      });
      setValidateAuthorized(Boolean(result));
    }

    handleValidateToken();
  }, [accessToken, cookieAccessToken]);

  return {
    tokenValidated: validateAuthorized,
    loading: validateTokenCb.loading,
  };
};
