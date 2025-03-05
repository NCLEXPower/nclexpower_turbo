import { useEffect, useRef, useState } from "react";
import { useRouter } from "../core";

/**
 * Calls a handler when the user tries to leave the page using in-app navigation.
 * @param enabled Enable or disable the hook's functionality.
 * @param handler The handler to call when the user tries to leave the page.
 * @returns A function to continue the route change.
 * @example
 * const { continueRoute } = useBeforeUnload(true, openUnsavedChangesModal);
 */
export function useBeforeUnload(enabled: boolean, handler?: VoidFunction) {
  const router = useRouter();
  const nextRouteRef = useRef<string>();
  const [navigationAllowed, setNavigationAllowed] = useState<boolean>(false);

  const continueRoute = async () => {
    if (!nextRouteRef.current) return;

    setNavigationAllowed(true);
    await router.push(nextRouteRef.current);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (typeof window === "undefined") return;

      event.preventDefault();
    };

    if (!enabled) {
      return;
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = (route: string) => {
      nextRouteRef.current = route;

      if (handler) {
        handler?.();
        router.events.emit("routeChangeError");
        throw "routeChange aborted";
      }
    };

    const cleanUp = () =>
      router.events.off("routeChangeStart", handleRouteChangeStart);

    if (!enabled || navigationAllowed) {
      cleanUp();
      return;
    }

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return cleanUp;
  }, [router.asPath, enabled, navigationAllowed]);

  return { continueRoute };
}
