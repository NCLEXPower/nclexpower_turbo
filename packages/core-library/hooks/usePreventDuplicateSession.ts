import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts";
import { useRouter } from "../core";

/**
 * Broadcasts a message to detect duplicate sessions.
 * This hook is used for preventing duplicate sessions across multiple tabs or windows.
 * @example
 * // Inside your main component or layout
 * usePreventDuplicateSession();
 */
export function usePreventDuplicateSession() {
  const router = useRouter();
  const { isAuthenticated, softLogout } = useAuthContext();
  const [duplicate, setDuplicate] = useState<boolean>(false);

  useEffect(() => {
    const broadcast = new BroadcastChannel("preventDuplicate");

    broadcast.postMessage({ type: "announce" });

    const handleDuplicateSession = async () => {
      broadcast.close();
      if (isAuthenticated) {
        await softLogout();
      }

      if (router.asPath !== router.staticRoutes.second_tab_redirect) {
        await router.push(router.staticRoutes.second_tab_redirect);
      }
    };

    broadcast.onmessage = (event) => {
      const receivedData = event.data;

      if (receivedData.type === "announce" && isAuthenticated) {
        broadcast.postMessage({ type: "duplicate" });
      }

      if (receivedData.type === "duplicate") {
        handleDuplicateSession();
        setDuplicate(receivedData.type === "duplicate");
      }
    };

    return () => {
      broadcast.close();
    };
  }, []);

  return {
    duplicate,
  };
}
