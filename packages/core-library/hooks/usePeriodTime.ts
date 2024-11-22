import { useState } from "react";

type PeriodType = "all" | "today" | "weekly" | "monthly" | "ytd";

interface UsePeriodDataProps<T> {
  Data: Record<PeriodType, T>;
  defaultPeriod?: PeriodType;
}

/**
 * Custom hook for managing period-based data and formatting revenue.
 * @param Data An object containing data for each period type (e.g., 'all', 'today', 'weekly', etc.).
 * @param defaultPeriod The default selected period (default is 'all').
 * @returns An object with:
 * - `selectedPeriod`: The currently selected period.
 * - `data`: Data corresponding to the selected period.
 * - `handlePeriodChange`: Handler to update the period and corresponding data.
 * - `formatRevenue`: Function to format revenue values as `$xk`.
 * @example
 * const { selectedPeriod, data, handlePeriodChange, formatRevenue } = usePeriodData({
 *   mockData: AllSalesMockData,
 *   defaultPeriod: 'all',
 * });
 */

export const usePeriodTime = <T>({
  Data,
  defaultPeriod = "all",
}: UsePeriodDataProps<T>) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodType>(defaultPeriod);
  const [data, setData] = useState<T>(Data[defaultPeriod]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = event.target.value as PeriodType;
    setSelectedPeriod(period);
    setData(Data[period]);
  };

  const formatRevenue = (value: number) => {
    const kValue = value / 1000;
    return `$${kValue.toFixed(0)}k`;
  };

  return { selectedPeriod, data, handlePeriodChange, formatRevenue };
};
