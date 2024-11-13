import React, { useEffect, useMemo, useState } from "react";
import { authorizedRoute, unauthorizeRoute } from "./contants/route";
import { useValidateToken } from "../../hooks";
import { useRouter } from "../router";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { tokenValidated, loading } = useValidateToken();

    useEffect(() => {
      const isLoggedIn = !!tokenValidated;
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      const handleRouteChange = (url: string) => {
        if (isLoggedIn && unauthorizeRoute.includes(url)) {
          router.replace("/hub");
        } else if (!isLoggedIn && url === "/hub") {
          router.replace("/login");
        }
      };

      handleRouteChange(router.asPath);

      router.events.on("routeChangeStart", handleRouteChange);

      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }, [router, tokenValidated]);

    if (isLoading || loading) {
      return;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
