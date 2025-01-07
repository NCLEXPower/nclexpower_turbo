import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { config } from "../../config";
import { getTimeZone } from "../../utils";
import { LogLevel } from "@microsoft/signalr";

interface CountdownState {
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

export const useCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/countdownHub`, {
        headers,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Connected to SignalR hub");
        connection.on(
          "ReceiveCountdownUpdate",
          (scheduleId: string, data: CountdownState) => {
            console.log(`Received countdown update for schedule ${scheduleId}`);
            setCountdown(data);
          }
        );

        connection.on(
          "CountdownCompleted",
          (scheduleId: string, eventName: string) => {
            console.log(`Countdown for ${eventName} has completed`);
            setCountdown(null);
          }
        );
      } catch (error) {
        console.error("Error connecting to SignalR hub:", error);
        setConnectionError(
          "Failed to connect to the server. Please try again."
        );
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, []);

  return { countdown, connectionError };
};
