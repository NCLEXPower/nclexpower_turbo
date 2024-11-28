import { useCallback } from "react";
import { getItem } from "../../session-storage";
import { useApiCallback } from "../../hooks/useApi";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useAccountId } from "../auth/hooks";
import { config } from "../../config";
import { LoginResponse } from "../../api/types";

export const useCachedAccessKey = () => {
  const [accessKey, setAccessKey, clearAccessKey] = useSessionStorage<
    LoginResponse["accessTokenResponse"]["accessToken"] | null
  >("access-key", null);
  const [accountId] = useAccountId();

  const accessKeyCb = useApiCallback(async (api, skipAuthCheck?: boolean) => {
    if (!getItem("accessToken") && !skipAuthCheck) {
      clearAccessKey();
      return null;
    }

    const result = await api.webbackoffice.contentAccessKey({
      accountId: accountId,
      appName: config.value.BASEAPP,
    });
    setAccessKey(result.data.accessTokenResponse.accessToken);
    return result.data.accessTokenResponse.accessToken;
  });

  return {
    data: accessKey,
    loading: accessKeyCb.loading || !accessKey,
    fetch: useCallback(() => accessKey ?? accessKeyCb.execute(), [accessKey]),
    noCheckFetch: useCallback(
      () => accessKey ?? accessKeyCb.execute(true),
      [accessKey]
    ),
    clear: clearAccessKey,
  };
};
