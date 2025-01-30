import { useEffect, useRef, useState } from "react";
import { config } from "../../config";
import { getTimeZone } from "../../utils";
import { useApiCallback } from "../useApi";
import { useRouter } from "../../core";

export interface CountdownState {
  Id: string;
  EventName: string;
  Days: number;
  Hours: number;
  Minutes: number;
  Seconds: number;
  Description: string;
}

const apiUrl = config.value.API_URL as string;
const localApiUrl = config.value.LOCAL_API_URL as string;

export const useWebSocketCountdown = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const notificationSent = useRef(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number>();
  const isMounted = useRef(false);
  const maxReconnectAttempts = 10;
  const reconnectAttempts = useRef(0);
  const heartbeatInterval = useRef<number>();
  const isSending = useRef(false);

  const sendNotifCb = useApiCallback(
    async (api) => await api.web.sendNotification()
  );

  const websocketUrl = `${
    process.env.NODE_ENV === "development"
      ? localApiUrl.replace("http://", "ws://")
      : apiUrl.replace("https://", "wss://")
  }/golive-websocket?timezone=${encodeURIComponent(getTimeZone())}`;

  const handleNormalClose = (code: number) => {
    if (code === 1000) return false; // Normal closure
    if (code === 1008) {
      setConnectionError("Invalid timezone configuration");
      return false;
    }
    return true;
  };

  const scheduleReconnect = () => {
    if (
      !isMounted.current ||
      reconnectAttempts.current >= maxReconnectAttempts
    ) {
      setConnectionError("Max reconnect attempts reached");
      return;
    }

    const baseDelay = Math.min(
      1000 * Math.pow(2, reconnectAttempts.current),
      30000
    );
    const jitter = Math.random() * 1000;
    const delay = baseDelay + jitter;

    reconnectTimeout.current = window.setTimeout(() => {
      reconnectAttempts.current++;
      connectWebSocket();
    }, delay);
  };

  const startHeartbeat = (ws: WebSocket) => {
    heartbeatInterval.current = window.setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "Heartbeat" }));
      }
    }, 25000);
  };

  const connectWebSocket = () => {
    if (!isMounted.current) return;

    websocketRef.current?.close();
    clearTimeout(reconnectTimeout.current);
    clearInterval(heartbeatInterval.current);

    const ws = new WebSocket(websocketUrl);
    websocketRef.current = ws;

    ws.onopen = () => {
      reconnectAttempts.current = 0;
      setConnectionError(null);
      console.log("WebSocket connected");
      startHeartbeat(ws);
      ws.send(
        JSON.stringify({
          type: "JoinGroup",
          timeZone: getTimeZone(),
          timestamp: Date.now(),
        })
      );
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "ReceiveCountdownUpdate") {
          setCountdown(data.payload);
        } else if (data.type === "CountdownCompleted") {
          websocketRef.current?.close(1000, "Countdown completed");
          await sendNotification();
          await router.push((route) => route.home);
        }
      } catch (error) {
        console.error("Message handling error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionError("Connection error. Reconnecting...");
      scheduleReconnect();
    };

    ws.onclose = (event) => {
      console.log(`Connection closed (${event.code}: ${event.reason})`);
      clearInterval(heartbeatInterval.current);

      if (!handleNormalClose(event.code)) {
        scheduleReconnect();
      }
    };
  };

  const sendNotification = async () => {
    if (notificationSent.current || isSending.current) return;
    isSending.current = true;
    notificationSent.current = true;

    try {
      const result = await sendNotifCb.execute();
      if (result.status !== 200) {
        notificationSent.current = false;
      }
    } catch (error) {
      notificationSent.current = false;
      console.error("Notification error:", error);
    } finally {
      isSending.current = false;
    }
  };

  useEffect(() => {
    isMounted.current = true;
    connectWebSocket();

    return () => {
      isMounted.current = false;
      websocketRef.current?.close(1000, "Component unmounted");
      clearTimeout(reconnectTimeout.current);
      clearInterval(heartbeatInterval.current);
    };
  }, []);

  return { countdown, connectionError };
};
