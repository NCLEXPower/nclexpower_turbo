import { useEffect, useState } from "react";
import { config } from "../config";
import axios from "axios";

const APIIP_BASE_URL = config.value.APIIPURL;
const GET_IP_URL = `${config.value.API64URL}?format=json`;

interface useFetchIpFromIpProps {
  ip: string | null;
  error: string | null;
  loading: boolean;
}

/**
 * Custom hook to get the user's IP address.
 */

export const useFetchIpFromIp = (apiKey?: string): useFetchIpFromIpProps => {
  const [ip, setIp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      Boolean(config.value.APIIPKEY)
    ) {
      fetchIp();
    }
  }, [apiKey]);

  async function fetchIp() {
    if (!apiKey) {
      console.warn(
        "API key for apiip.net is not provided. Defaulting to null country."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const ipResponse = await axios.get<{ ip: string }>(GET_IP_URL);
      const ip = ipResponse.data?.ip;

      if (!ip) {
        throw new Error("Failed to retrieve client IP address.");
      }

      const response = await axios.get<{ ip: string }>(
        `${APIIP_BASE_URL}/api/check?ip=${ip}&accessKey=${apiKey}`
      );

      if (response.data) {
        console.log("ip", response.data);
        setIp(response.data.ip);
      } else {
        throw new Error("Failed to retrieve client IP address.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  }
  return { ip, error, loading };
};
