import { addMinutes, parseISO } from "date-fns";
import { useIdleTimer } from "react-idle-timer";
import { useApiCallback } from "../../../hooks";
import { useAuthSession } from "../hooks";
import { config } from "../../../config";
import { useCallback } from "react";

export type AliveCheck = { lastRequest: string } | undefined;

interface Props {
  sessionId?: string;
  onSessionExpired: () => Promise<void>;
}

const startSessionCheckAfterMinutes =
  process.env.NODE_ENV === "development" ? 10 : 1;

export const useAuthSessionIdleTimer = ({
  onSessionExpired,
  sessionId,
}: Props) => {
  if (config.value.BASEAPP !== "webc_app") {
    return { start: () => {}, stop: () => {} };
  }

  const sessionCb = useApiCallback(
    async (api, sessionId: string) => await api.auth.session(sessionId)
  );
  const keepAliveCb = useApiCallback(
    async (api, sessionId: string) => await api.auth.keepAlive(sessionId)
  );
  const [aliveCheck, setAliveCheck, clearAliveCheck] = useAuthSession();

  const handleSessionExpiration = useCallback(async () => {
    clearAliveCheck();
    await onSessionExpired();
  }, [onSessionExpired]);

  const idleTimer = useIdleTimer({
    onIdle: async () => {
      if (!sessionId) {
        await handleSessionExpiration();
        return;
      }

      try {
        await sessionCb.execute(sessionId);
        idleTimer.reset();
      } catch (e: any) {
        if (e.response?.status === 401 || e.response?.status === 403) {
          await handleSessionExpiration();
        } else {
          idleTimer.reset();
        }
      }
    },
    onAction: async () => {
      if (!aliveCheck) {
        setAliveCheck({ lastRequest: new Date().toISOString() });
        return;
      }

      if (oneMinutePassed(aliveCheck)) {
        try {
          await keepAliveCb.execute(sessionId!);
          setAliveCheck({ lastRequest: new Date().toISOString() });
        } catch (e: any) {
          if (e.response?.status === 401 || e.response?.status === 403) {
            await handleSessionExpiration();
          }
        }
      }
    },
    startManually: true,
    stopOnIdle: true,
    debounce: 400,
    crossTab: true,
    syncTimers: 400,
    name: sessionId,
    timeout: startSessionCheckAfterMinutes * 60000,
  });

  const startIdleTimer = useCallback(() => {
    setAliveCheck({ lastRequest: new Date().toISOString() });
    idleTimer.start();
  }, [idleTimer]);

  const stopIdleTimer = useCallback(() => {
    clearAliveCheck();
    idleTimer.reset();
    idleTimer.pause();
  }, [idleTimer]);

  return { start: startIdleTimer, stop: stopIdleTimer };
};

const oneMinutePassed = (session: AliveCheck) =>
  session && new Date() >= addMinutes(parseISO(session.lastRequest), 1);
