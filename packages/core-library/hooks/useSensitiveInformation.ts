import React, { useEffect, useMemo, useState } from "react";
import { useAccessToken, useAccountId } from "../contexts/auth/hooks";
import {
  CustomerTokenizeInformations,
  TokenizeInformations,
  ValidateTokenizeParams,
} from "../api/types";
import { useApiCallback } from "./useApi";
import { config } from "../config";

export const useSensitiveInformation = () => {
  const [accessToken] = useAccessToken();
  const [accountId] = useAccountId();
  const [internalInfo, setInternalInfo] = useState<TokenizeInformations>();
  const [customerInfo, setCustomerInfo] =
    useState<CustomerTokenizeInformations>();
  const [error, setError] = useState<string | null>(null);
  const validateTokenizeCb = useApiCallback(
    async (api, args: ValidateTokenizeParams) =>
      await api.auth.validateTokenizeInformation(args)
  );

  async function validateTokenizeInformation() {
    try {
      const validateParams: ValidateTokenizeParams = {
        accessToken: accessToken,
        accountId: accountId ?? "no-account-id",
        appName: config.value.BASEAPP,
      };
      const result = await validateTokenizeCb.execute({ ...validateParams });
      setInternalInfo(result.data.tokenizeInformation);
      setCustomerInfo(result.data.customerTokenizationInformation);
    } catch (err) {
      setError("Failed to validate tokenize information");
      console.error(err);
    }
  }

  useEffect(() => {
    if (!accountId || !accessToken || !accountId) return;
    validateTokenizeInformation();
  }, [accountId, accessToken, accountId]);

  return {
    ...useMemo(
      () => ({
        internal: internalInfo,
        customer: customerInfo,
      }),
      [internalInfo, customerInfo]
    ),
    error,
    loading: validateTokenizeCb.loading,
  };
};
