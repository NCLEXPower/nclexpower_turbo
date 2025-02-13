import { useMemo } from "react";
import {
  PeriodicMockData,
  SalesData,
  SalesType,
} from "../system/app/internal/blocks/Hub/SalesManagement/types";
import {
  AllSalesMockData,
  PNSalesMockData,
  RNSalesMockData,
} from "../system/app/internal/blocks/Hub/SalesManagement/AnalyticsMockData";
import { usePeriodTime } from "./usePeriodTime";
import { statBgColor } from "../system/app/internal/blocks/Hub/SalesManagement/AnalyticsStyles";

export const useSalesData = (salesType: SalesType) => {
  const getMockData = (salesType: SalesType): PeriodicMockData => {
    switch (salesType) {
      case "RN":
        return RNSalesMockData;
      case "PN":
        return PNSalesMockData;
      case "All":
      default:
        return AllSalesMockData;
    }
  };

  const getFilteredSales = (salesType: SalesType) => {
    switch (salesType) {
      case "RN":
        return [
          { title: "RN Total Sales", key: "RNTotalSales" },
          { title: "Standard Total Sales", key: "StandardTotalSales" },
          { title: "Fast Track Total Sales", key: "FastTrackTotalSales" },
        ];
      case "PN":
        return [
          { title: "PN Total Sales", key: "PNTotalSales" },
          { title: "Standard Total Sales", key: "StandardTotalSales" },
          { title: "Fast Track Total Sales", key: "FastTrackTotalSales" },
        ];
      case "All":
      default:
        return [
          { title: "Product Total Sales", key: "TotalSales" },
          { title: "RN Total Sales", key: "RNTotalSales" },
          { title: "PN Total Sales", key: "PNTotalSales" },
        ];
    }
  };

  const mockData = getMockData(salesType);

  const { selectedPeriod, handlePeriodChange, data } = usePeriodTime({
    Data: mockData,
  });

  const statCardsData = useMemo(() => {
    return getFilteredSales(salesType).map(({ title, key }, index) => ({
      title,
      value: data.salesData?.[key as keyof SalesData] ?? 0,
      bgColor: Object.values(statBgColor)[index] || "#ccc",
      currency: "$",
    }));
  }, [data, salesType]);

  return {
    selectedPeriod,
    handlePeriodChange,
    statCardsData,
    data,
  };
};
