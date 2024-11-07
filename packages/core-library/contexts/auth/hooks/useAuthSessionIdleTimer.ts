import { addMinutes, parseISO } from "date-fns";
import { useIdleTimer } from "react-idle-timer";
import { useApiCallback } from "../../../hooks";
import { useAuthSession } from "../hooks";
import { config } from "../../../config";

export type AliveCheck = { lastRequest: string } | undefined;

interface Props {
  sessionId?: string;
  onSessionExpired: AsyncFunction;
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

  const idleTimer = useIdleTimer({
    onIdle: async () => {
      try {
        await sessionCb.execute(sessionId);
        idleTimer.start();
      } catch (e: any) {
        await handleSessionExpiration();
      }
    },
    onAction: async () => {
      if (!aliveCheck) {
        resetAliveCheck();
      }

      if (oneMinutePassed(aliveCheck!)) {
        try {
          await keepAliveCb.execute(sessionId);
          resetAliveCheck();
        } catch {
          await handleSessionExpiration();
        }
      }
    },
    startManually: true,
    stopOnIdle: true,
    debounce: 400,
    crossTab: true,
    syncTimers: 400,
    name: sessionId,
    onMessage: handleSessionExpiration,
    timeout: startSessionCheckAfterMinutes * 60000,
  });

  function startIdleTimer() {
    resetAliveCheck();
    idleTimer.start();
  }

  function resetAliveCheck() {
    setAliveCheck({ lastRequest: new Date().toISOString() });
  }

  function stopIdleTimer() {
    clearAliveCheck();
    idleTimer.message({}, false);
    idleTimer.reset();
  }

  async function handleSessionExpiration() {
    clearAliveCheck();
    await onSessionExpired();
  }

  return { start: startIdleTimer, stop: stopIdleTimer };
};

const oneMinutePassed = (session: AliveCheck) =>
  session &&
  new Date() >= addMinutes(parseISO(session.lastRequest as string), 1);
