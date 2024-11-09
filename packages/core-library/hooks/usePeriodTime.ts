import { useState } from "react";

type PeriodType = "all" | "today" | "weekly" | "monthly" | "ytd";

interface UsePeriodDataProps<T> {
  Data: Record<PeriodType, T>;
  defaultPeriod?: PeriodType;
}

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
