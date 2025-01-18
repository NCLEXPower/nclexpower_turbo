/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { createContext, useContext, useEffect, useState } from "react";
import { PageLoader } from "../components";
import React from "react";
import { config } from "../config";
import { useRouter } from "../core";

const context = createContext<{
  isLoading: boolean;
  isCalculationsLoaded: boolean;
  setIsLoading(status: boolean): void;
  setIsCalculationsLoaded(status: boolean): void;
  contentLoader: boolean;
  setContentLoader(status: boolean): void;
}>(undefined as any);

interface Props {
  loading?: boolean;
  isAuthenticated?: boolean;
}

export const usePageLoaderContext = () => {
  if (!context) {
    throw new Error("PageLoaderContextProvider should be used");
  }
  return useContext(context);
};

export const PageLoaderContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, loading, isAuthenticated }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading ?? router.loading);
  const [isCalculationsLoaded, setIsCalculationsLoaded] = useState(
    loading ?? router.loading
  );
  const [contentLoader, setContentLoader] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsMounted(true)
      setIsCalculationsLoaded(false);
    }, 6000);
  }, [isAuthenticated, isLoading, isCalculationsLoaded, loading, router.loading]);
  if (!isMounted) {
    return null;
  }

  return (
    <context.Provider
      value={{
        isLoading: isLoading || router.loading,
        setIsLoading,
        isCalculationsLoaded,
        setIsCalculationsLoaded,
        contentLoader,
        setContentLoader,
      }}
    >
      
      {isAuthenticated || !((isLoading || loading || router.loading || isCalculationsLoaded) &&
      config.value.BASEAPP === "webc_app") ? (
        <>{children}</>
      ) : (
        <PageLoader />
      )}
    </context.Provider>
  );
};
