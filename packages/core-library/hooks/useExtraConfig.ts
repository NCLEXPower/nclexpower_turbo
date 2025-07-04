import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts";
import { useApi } from "./useApi";
import { useAccountReference } from "../contexts/auth/hooks";

interface ExtraConfigReturnValues {
  config: {
    isPaid: boolean;
    isNewlyCreated: boolean;
  };
}

export const useExtraConfig = () => {
  const { isAuthenticated } = useAuthContext();
  const [reference] = useAccountReference();
  const [state, setState] = useState<ExtraConfigReturnValues | null>(null);
  const getConfig = useApi(async (api) =>
    isAuthenticated
      ? await api.auth.getExtraConfigByReferenceWithToken(reference)
      : Promise.resolve(null)
  );

  useEffect(() => {
    if (getConfig.result?.data) {
      setState(getConfig.result.data);
    }
  }, [getConfig.result?.data]);
  return state;
};
