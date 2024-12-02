import { ComponentLoader } from "core-library/components";
import { Box } from "@mui/material";
import { useRouter } from "core-library";
import { usePageLoaderContext } from "core-library/contexts";
import { useEffect } from "react";

interface Props {
  loading?: boolean;
  pages: { pageRoute: string; pageAuthorization: number } | undefined | null;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
  pages,
}) => {
  const { isLoading, isCalculationsLoaded } = usePageLoaderContext();
  const router = useRouter();
  const calculationsLoading =
    router.asPath === router.staticRoutes.hub && !isCalculationsLoaded;
  const isPageLoading = (loading || isLoading) && !calculationsLoading;

  useEffect(() => {
    if (!pages?.pageRoute && !calculationsLoading && !isPageLoading) {
      router.push((routes) => routes.page_not_found);
    }
  }, [pages, calculationsLoading, isPageLoading]);

  return (
    <>
      {isPageLoading && calculationsLoading && (
        <Box
          flex={1}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{}}
        >
          <ComponentLoader disableMarginBottom={false} />
        </Box>
      )}
      {!isPageLoading && (
        <Box
          display={loading ? "none" : "block"}
          flexDirection="column"
          height="100%"
        >
          {children}
        </Box>
      )}
    </>
  );
};
