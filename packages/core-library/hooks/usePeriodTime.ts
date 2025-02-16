import { useState } from "react";
import { timePeriod } from "../system/app/internal/blocks/Hub/Analytics/constants";

export type PeriodType = "all" | "today" | "weekly" | "monthly" | "ytd";

interface UsePeriodDataProps<
  T extends Record<string, Record<PeriodType, any>>,
> {
  Data: T;
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

export const usePeriodTime = <
  T extends Record<string, Record<PeriodType, any>>,
>({
  Data,
  defaultPeriod = "all",
}: UsePeriodDataProps<T>) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodType>(defaultPeriod);
  const [data, setData] = useState(() =>
    extractPeriodData(Data, defaultPeriod)
  );

  function extractPeriodData(source: T, period: PeriodType) {
    if (!source || typeof source !== "object") {
      console.error(
        "extractPeriodData: Invalid data structure, expected an object."
      );
      return {};
    }

    if (!timePeriod.includes(period)) {
      console.warn(
        `extractPeriodData: Invalid period "${period}". Defaulting to "all".`
      );
      period = "all";
    }

    return Object.fromEntries(
      Object.entries(source).map(([key, value]) => [
        key,
        value?.[period] ?? (Array.isArray(value) ? [] : {}),
      ])
    ) as { [K in keyof T]: T[K][PeriodType] };
  }

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = event.target.value as PeriodType;
    setSelectedPeriod(period);
    setData(extractPeriodData(Data, period));
  };

  return { selectedPeriod, data, handlePeriodChange };
};
