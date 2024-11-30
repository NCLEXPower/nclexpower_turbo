/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useEffect, useState } from "react";
import { getMaintenanceMode } from "../ssr";
import { MaintenanceSsr } from "../types/global";
import { dateFormatter } from "../core";

function useMaintenanceMode() {
  const [data, setData] = useState<MaintenanceSsr | undefined>();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchMaintenanceMode();
  }, []);

  const dateCommenced = data?.updatedDate
    ? dateFormatter(new Date(data.updatedDate))
    : "Invalid Date";

  return { data, loading, dateCommenced, refetch: fetchMaintenanceMode };
}

export default useMaintenanceMode;
