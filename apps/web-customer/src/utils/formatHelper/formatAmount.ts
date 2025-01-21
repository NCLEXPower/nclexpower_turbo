import { useMemo } from "react";

export const formatAmount = (amount: number): string => {
  return useMemo(() => {
    if (typeof amount !== "number") {
      return "-";
    }

    const roundedAmount = Math.round(amount);

    return roundedAmount.toString();
  }, [amount]);
};