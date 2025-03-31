import React, { useEffect, useState } from "react";
import { useApi } from "../useApi";
import { Schedule } from "../../api/types";
import { useRouter } from "../../core";

export const useScheduleCountdown = () => {
  const activeSchedule = useApi(
    async (api) => await api.web.getActiveSchedule("Philippines/Manila")
  );
  
  const router = useRouter();
  const [daysRemaining, setDaysRemaining] = useState<number | undefined>(
    undefined
  );
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  async function initialize() {
    try {
      const response = await activeSchedule.result?.data;
      if (response?.daysRemaining === 0) {
        await router.push((route) => route.home);
      }
      setDaysRemaining(response?.daysRemaining);
      setSchedule(response?.schedule);
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    initialize();
  }, [activeSchedule.result?.data]);

  return { daysRemaining, error, schedule };
};
