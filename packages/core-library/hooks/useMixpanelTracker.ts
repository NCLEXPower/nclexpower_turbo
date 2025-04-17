import { useRouter as useNextRouter } from "next/router";
import { useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";

/**
 * Retrieves and updates session data from session storage.
 * @returns [session data, update function, clear function].
 */

export function useMixpanelTrackerSession() {
  return useSessionStorage("tracker", { previousPage: "", scroll: "" });
}

/**
 * Saves previous page and scroll position on navigation. This should be called on every page load.
 * @example
 * useSaveTrackerParamsOnNavigation();
 */
export const useSaveTrackerParamsOnNavigation = () => {
  const router = useNextRouter();
  const [, updateParams] = useMixpanelTrackerSession();

  useEffect(() => {
    const saveRouteInfoOnNavigation = () => {
      if (typeof window !== "undefined") {
        updateParams({
          previousPage: window.location.href,
          scroll: window.scrollY.toString(),
        });
      }
    };

    router.events.on("routeChangeStart", saveRouteInfoOnNavigation);

    return () => {
      router.events.off("routeChangeStart", saveRouteInfoOnNavigation);
    };
  });
};
