import { AxiosError } from "axios";
import { useEffect } from "react";
import { httpClient } from "./useApi";
import { useAuthContext } from "../contexts";

export const useAuthInterceptor = () => {
  const { logout } = useAuthContext();

  useEffect(
    () => httpClient.setupMiddlewareOptions({ onErrorHandler: handleError }),
    []
  );

  const handleError = async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    return await logout();
  };
};
