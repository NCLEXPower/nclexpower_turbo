import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { config } from "../../config";
import { getTimeZone } from "../../utils";

export interface CountdownState {
  eventName: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  description: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? config.value.API_URL
    : config.value.LOCAL_API_URL;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": config.value.XAPIKEY,
  "X-Environment": config.value.SYSENV,
  "X-Time-Zone": getTimeZone(),
};

export const useSignalRCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/golive-signalr`, {
        headers,
        transport: signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Connected to SignalR hub");

        connection.invoke("JoinGroup", getTimeZone());
        connection.on("ReceiveCountdownUpdate", (scheduleId, data) => {
          if (data) {
            setCountdown(data);
          }
        });

        connection.on("CountdownCompleted", (scheduleId, eventName) => {
          console.log(`Countdown for ${eventName} has completed`);
          setCountdown(null);
        });
      } catch (error) {
        console.error("Error connecting to SignalR hub:", error);
        setConnectionError(
          "Failed to connect to the server. Please try again."
        );
        setTimeout(() => startConnection(), 5000);
      }
    };

    startConnection();

    connection.onreconnecting((error) => {
      console.log("SignalR reconnecting:", error);
      setConnectionError("Reconnecting to the server...");
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
      setConnectionError(null);
    });

    connection.onclose((error) => {
      console.error("SignalR connection closed:", error);
      setConnectionError("Connection lost. Reconnecting...");
      setTimeout(() => startConnection(), 5000);
    });

    return () => {
      connection.stop().then(() => console.log("SignalR connection stopped."));
    };
  }, []);

  return { countdown, connectionError };
};
