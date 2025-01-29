import { useEffect, useRef, useState } from "react";
import { config } from "../../config";
import { getTimeZone } from "../../utils";
import { useDebounce } from "../useDebounce";
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

  const sendNotifCb = useApiCallback(
    async (api) => await api.web.sendNotification()
  );

  const websocketUrl =
      process.env.NODE_ENV === "development"
        ? `${localApiUrl.replace("http://", "ws://")}/golive-websocket?timezone=${getTimeZone()}`
        : `${apiUrl.replace("https://", "wss://")}/golive-websocket?timezone=${getTimeZone()}`;

  const handleNormalClose = (code: number) => {
    if (code === 1000) {
      setConnectionError("Connection closed normally");
      return false;
    }
    if (code === 1008) {
      setConnectionError("Invalid timezone configuration");
      return false;
    }
    return true;
  }

  const scheduleReconnect = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts || !isMounted.current) {
      setConnectionError("Max reconnect attempts reached");
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    reconnectTimeout.current = window.setTimeout(() => {
      reconnectAttempts.current++;
      connectWebSocket();
    }, delay)
  }

  const sendNotification = async () => {
    if (notificationSent.current) return;

    try {
      const result = await sendNotifCb.execute();
      if (result.status === 200) {
        notificationSent.current = true;
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const connectWebSocket = () => {
    if (!isMounted.current) return;

    websocketRef.current?.close();

    const ws = new WebSocket(websocketUrl);
    websocketRef.current = ws;

    ws.onopen = () => {
      reconnectAttempts.current = 0;
      setConnectionError(null);
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "JoinGroup", timeZone: getTimeZone() }));
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "ReceiveCountdownUpdate") {
          setCountdown(data.payload);
        } else if (data.type === "CountdownCompleted") {
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
      if (handleNormalClose(event.code)) {
        console.log(`Connection closed (${event.reason}), reconnecting...`);
        scheduleReconnect();
      }
    };
  };

  useEffect(() => {
    isMounted.current = true;
    connectWebSocket();

    return () => {
      isMounted.current = false;
      websocketRef.current?.close();
      clearTimeout(reconnectTimeout.current);
    };
  }, []);

  return { countdown, connectionError };
};
