import { useMemo } from "react";
import moment from "moment";

export const formatMomentDate = (date: string | Date) => {
  return useMemo(() => {
    const dateMoment = moment(date);

    if (dateMoment.isBefore(moment().subtract(7, "days"))) {
      return dateMoment.format("MMMM D, YYYY h:mm A");
    }

    return dateMoment.fromNow();
  }, [date]);
};