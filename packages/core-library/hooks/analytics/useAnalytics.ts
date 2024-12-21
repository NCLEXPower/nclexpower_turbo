import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import {
  TimePeriodSalesProps,
  DemographicSalesProps,
  ProductSalesProps,
  RepeatSalesProps,
  SalesPercentageProps,
} from "./types";
import { config } from "../../config";
import { useApi } from "../useApi";
import { useAccessToken } from "../../contexts/auth/hooks";
import { getTimeZone } from "../../utils";

interface Props {
  timePeriodSales: TimePeriodSalesProps[];
  productSales: ProductSalesProps[];
  repeatSales: RepeatSalesProps[];
  demographicSales: DemographicSalesProps[];
  salesPercentage: SalesPercentageProps[];
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

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<Props | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accessToken] = useAccessToken();
  const initialAnalyticsCb = useApi(
    async (api) => await api.web.getInitialAnalytics()
  );

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/salesHub`, {
        withCredentials: true,
        accessTokenFactory: async () => {
          return accessToken ? accessToken : "";
        },
        headers: headers,
      })
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");
          setIsConnected(true);

          connection.on("ReceiveAnalyticsUpdates", (data: Props) => {
            console.log("Real-time analytics data received:", data);
            setAnalyticsData(data);
          });
        })
        .catch((error) => {
          console.error("SignalR connection failed", error);
          setIsConnected(false);
        });

      return () => {
        connection.off("ReceiveAnalyticsUpdates");
        connection.stop();
      };
    }
  }, [connection]);

  useEffect(() => {
    if (!analyticsData && initialAnalyticsCb.result?.data) {
      setAnalyticsData(initialAnalyticsCb.result.data);
    }
  }, [initialAnalyticsCb.result?.data, analyticsData]);

  return { analyticsData, isConnected, connection };
};
