import { useMemo } from "react";
import { UsersMockData } from "../system/app/internal/blocks/Hub/SalesManagement/AnalyticsMockData";
import { usePeriodTime } from "./usePeriodTime";
import { PeriodicUserMockData } from "../system/app/internal/blocks/Hub/SalesManagement/types";
import { statBgColor } from "../system/app/internal/blocks/Hub/SalesManagement/AnalyticsStyles";

export const useUserAnalyticsData = () => {
  const { data, handlePeriodChange, selectedPeriod } = usePeriodTime({
    Data: UsersMockData,
  });

  const statsCardData = useMemo(() => {
    return [
      { title: "Total Users", key: "TotalUsers" },
      { title: "RN Total Users", key: "RNTotalUsers" },
      { title: "PN Total Users", key: "PNTotalUsers" },
    ].map(({ title, key }, index) => ({
      title,
      value: data[key as keyof PeriodicUserMockData] ?? 0,
      bgColor: Object.values(statBgColor)[index] || "#ccc",
    }));
  }, [data]);

  return { data, handlePeriodChange, selectedPeriod, statsCardData };
};
