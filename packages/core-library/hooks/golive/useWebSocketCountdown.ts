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
  const [pendingData, setPendingData] = useState<CountdownState | null>(null);
  const notificationSent = useRef(false);
  const websocketRef = useRef<WebSocket | null>(null);

  const sendNotifCb = useApiCallback(
    async (api) => await api.web.sendNotification()
  );

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
    if (!apiUrl || !localApiUrl) {
      console.error(
        "API_URL or LOCAL_API_URL is not defined in the environment variables."
      );
      setConnectionError("Invalid WebSocket URL configuration.");
      return;
    }

    const websocketUrl =
      process.env.NODE_ENV === "development"
        ? `${localApiUrl.replace("http://", "ws://")}/golive-websocket?timezone=${getTimeZone()}`
        : `${apiUrl.replace("https://", "wss://")}/golive-websocket?timezone=${getTimeZone()}`;

    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      console.log("WebSocket already connected.");
      return;
    }

    if (websocketRef.current) {
      websocketRef.current.close();
    }

    const ws = new WebSocket(websocketUrl);
    websocketRef.current = ws;

    ws.onopen = () => {
      setConnectionError(null);
      ws.send(JSON.stringify({ type: "JoinGroup", timeZone: getTimeZone() }));
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "ReceiveCountdownUpdate") {
          setPendingData(data.payload);
        } else if (data.type === "CountdownCompleted") {
          if (!notificationSent.current) {
            console.log("Countdown completed!");
            notificationSent.current = true;
            await sendNotification();
            await router.push((route) => route.home);
            setCountdown(null);
          }
        } else {
          console.log("Unhandled message type:", data);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", event.data, error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionError("WebSocket error occurred.");
    };

    ws.onclose = () => {
      console.error("WebSocket connection closed. Reconnecting...");
      setConnectionError("Connection lost. Reconnecting...");
      setTimeout(() => connectWebSocket(), 5000);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (websocketRef.current) {
        console.log("Cleaning up WebSocket connection.");
        websocketRef.current.close();
      }
    };
  }, []);

  useDebounce(
    () => {
      if (pendingData) setCountdown(pendingData);
    },
    500,
    [pendingData]
  );

  return { countdown, connectionError };
};
