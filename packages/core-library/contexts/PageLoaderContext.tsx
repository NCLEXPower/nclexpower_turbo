/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { createContext, useContext, useEffect, useState } from "react";
import { PageLoader } from "../components";
import React from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculationsLoaded, setIsCalculationsLoaded] = useState(true);
  const [contentLoader, setContentLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsCalculationsLoaded(false);
    }, 3000);
  }, [isLoading, isCalculationsLoaded]);

  return (
    <context.Provider
      value={{
        isLoading: isLoading,
        setIsLoading,
        isCalculationsLoaded,
        setIsCalculationsLoaded,
        contentLoader,
        setContentLoader,
      }}
    >
      {(!isAuthenticated && isLoading) || isCalculationsLoaded ? (
        <PageLoader />
      ) : (
        <>{children}</>
      )}
    </context.Provider>
  );
};
