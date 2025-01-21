import { useEffect, useState } from "react";
import { BillingSummaryType, billlingSummaryMockData as data} from "../constant/BillingSummaryMock/BillingSummaryMock";

export const useGetBillingSummary = () => {
  const [selectedData, setSelectedData] = useState<BillingSummaryType | null>(
    null
  );

  useEffect(() => {
    if (data.length > 0) {
      setSelectedData(data[0]);
    }
  }, [data]);

  return { selectedData, setSelectedData, data };
};