import { ComponentLoader } from "core-library/components";
import { Box } from "@mui/material";
import { mixpanelTrackPageLoad, useRouter, useScroll } from "core-library";
import { usePageLoaderContext } from "core-library/contexts";
import { useEffect } from "react";
import { useMixpanelTrackerSession } from "core-library/hooks";

interface Props {
  loading?: boolean;
}

export const LoadablePageContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  loading,
}) => {
  const { scrollTo, scrollTop } = useScroll();
  const { isLoading, isCalculationsLoaded } = usePageLoaderContext();
  const router = useRouter();
  const [mixpanelSession] = useMixpanelTrackerSession();
  const calculationsLoading =
    router.asPath === router.staticRoutes.hub && !isCalculationsLoaded;
  const isPageLoading = (loading || isLoading) && !calculationsLoading;

  /**
   * Tracks the page load event.
   * Temporarily disable the tracking of page load event.
   */

  // useEffect(() => {
  //   const anchor = router.asPath.split("#")[1];
  //   anchor ? scrollTo(anchor) : scrollTop();
  //   mixpanelTrackPageLoad({
  //     PageKey: pages?.pageRoute ?? "/",
  //     $referrer: mixpanelSession.previousPage,
  //     Scroll: mixpanelSession.scroll,
  //   });
  // }, [pages, router.asPath]);

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
