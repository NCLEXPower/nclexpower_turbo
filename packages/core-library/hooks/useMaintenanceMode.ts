/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useEffect, useState } from "react";
import { getMaintenanceMode } from "../ssr";
import { MaintenanceSsr } from "../types/global";

function useMaintenanceMode() {
  const [data, setData] = useState<MaintenanceSsr | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const mode = await getMaintenanceMode();
        setData(mode);
      } catch (error) {
        console.error("Error fetching maintenance mode:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenanceMode();
  }, []);

  const dateCommenced = data?.updatedDate
    ? dateFormatter(new Date(data.updatedDate))
    : "Invalid Date";

  return { data, loading, dateCommenced };
}

function dateFormatter(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Singapore",
  };

  return date.toLocaleString("en-US", options).replace(",", " -");
}

export default useMaintenanceMode;
