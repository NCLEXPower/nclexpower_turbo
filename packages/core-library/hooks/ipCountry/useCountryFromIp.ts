import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config";
import { CountryResponse } from "./types";

const APIIP_BASE_URL = config.value.APIIPURL;
const GET_IP_URL = `${config.value.API64URL}?format=json`;

interface UseCountryFromIpProps {
  geoData: CountryResponse | null;
  error: string | null;
  loading: boolean;
}

/**
 * Custom hook to get the user's country from their IP address.
 *
 * @param apiKey - The API key for apiip.net. If not provided, the hook will not make a request.
 */

export const useCountryFromIp = (apiKey?: string): UseCountryFromIpProps => {
  const [geoData, setGeoData] = useState<CountryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // temporarily since we don't need to fetch geoData in localdev env.
    if (
      process.env.NODE_ENV !== "production" &&
      Boolean(config.value.APIIPKEY)
    ) {
      fetchCountry();
    }
  }, [apiKey]);

  async function fetchCountry() {
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

      const response = await axios.get<CountryResponse>(
        `${APIIP_BASE_URL}/api/check?ip=${ip}&accessKey=${apiKey}`
      );

      if (response.data) {
        console.log("country", response.data);
        setGeoData(response.data);
      } else {
        setError("Failed to fetch country from IP.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return { geoData, error, loading };
};
