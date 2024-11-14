import { useRouter } from "../core";
import { useEffect, useState } from "react";
import { useValidateToken } from "./useValidateToken";
import { useAccessToken } from "../contexts/auth/hooks";

export const useAuthRedirect = (isAuthenticated: boolean) => {
  const router = useRouter();
  const { tokenValidated, loading } = useValidateToken();
  const [isValidating, setIsValidating] = useState(true);
  const [accessToken] = useAccessToken();

  useEffect(() => {
    if (loading) return;

    const currentPath = router.pathname;

    if (!isAuthenticated || !tokenValidated || !accessToken) {
      if (currentPath.startsWith("/hub")) {
        router.push((route) => route.login);
      } else {
        setIsValidating(false);
      }
    }
    // else {
    //   if (currentPath === "/login") {
    //     router.push((route) => route.hub);
    //   } else {
    //     setIsValidating(false);
    //   }
    // }
  }, [isAuthenticated, tokenValidated, loading, router, accessToken]);

  return isValidating;
};
