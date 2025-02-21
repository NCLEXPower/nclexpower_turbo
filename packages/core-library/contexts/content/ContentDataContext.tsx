import Head from "next/head";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ErrorBox } from "../../components";
import { useCachedAccessKey } from "./useCachedAccessKey";
import { ServerSlug } from "../../types";
import { useApiContent } from "../../hooks/useApi";
import { OpenPagesResponse } from "../../api/types";

const context = createContext<{
  loading: boolean;
  pages: OpenPagesResponse | undefined | null;
}>(undefined as any);

export const useContentDataContext = () => {
  if (!context) {
    throw new Error("ContentDataContextProvider should be used");
  }
  return useContext(context);
};

export const ContentDataContextProvider: React.FC<
  React.PropsWithChildren<ServerSlug>
> = ({ children, slug }) => {
  const accessKey = useCachedAccessKey();

  const contentData = useApiContent(
    async (api) => {
      try {
        const accessKeyData = await accessKey.fetch();
        const result = await api.office.openPage(slug, accessKeyData);
        return result;
      } catch (err: any) {
        console.error("Error loading page content:", err);
        return null;
      }
    },
    [slug]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const clear = () => {
      accessKey.clear();
    };
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, []);

  const value = useMemo(
    () => ({
      loading: contentData.loading,
      pages: contentData.result,
    }),
    [contentData.loading]
  );

  if (contentData.error) {
    return <ErrorBox label={contentData?.error?.message} />;
  }

  return (
    <context.Provider value={value}>
      {/* <Head></Head> this can be modified */}
      {children}
    </context.Provider>
  );
};
