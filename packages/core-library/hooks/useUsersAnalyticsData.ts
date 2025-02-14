import { useMemo } from "react";
import { UsersMockData } from "../system/app/internal/blocks/Hub/Analytics/AnalyticsMockData";
import { usePeriodTime } from "./usePeriodTime";
import { PeriodicUserMockData } from "../system/app/internal/blocks/Hub/Analytics/types";
import { statBgColor } from "../system/app/internal/blocks/Hub/Analytics/AnalyticsStyles";

export const useUsersAnalyticsData = () => {
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
