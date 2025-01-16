import { useEffect, useState } from "react";
import { BillingSummaryType, billlingSummaryMockData as data} from "../constant/BillingSummaryMock/BillingSummaryMock";

export const useGetBillingSummary = () => {
  // Use standard api call instead of using react query once api is ready
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<BillingSummaryType | null>(
    null
  );

  useEffect(() => {
    if (data.length === 1) {
      setSelectedData(data[0]);
    } else if (data.length > 1) {
      const latestOrder = [...data].sort(
        (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      )[0];
      setSelectedData(latestOrder);
    }
  }, [data]);

  return { isLoading, setIsLoading, selectedData, setSelectedData, data };
};