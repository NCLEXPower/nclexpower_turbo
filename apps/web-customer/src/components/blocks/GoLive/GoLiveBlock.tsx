import React from "react";
import {
  useApiCallback,
  useScheduleCountdown,
} from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";
import { ComingSoonType } from "../ComingSoonBlock/validation";
import { NotifyParams } from "core-library/api/types";
import { config } from "core-library/config";
import { sanitizedEnvironment } from "core-library";

export const GoLiveBlock: React.FC = () => {
  const notifyCb = useApiCallback(
    async (api, args: NotifyParams) => await api.web.sendNotify(args)
  );
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ComingSoonPage
      schedule={schedule}
      daysRemaining={daysRemaining}
      onSubmit={handleSubmit}
      loading={notifyCb.loading}
    />
  );

  async function handleSubmit(values: ComingSoonType) {
    try {
      const result = await notifyCb.execute({
        email: values.email,
        goLiveId: schedule?.id,
      });
      if (result.data === 200 || result.status === 200) {
        alert("Successfully submitted.");
        return;
      }
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      alert("Failed to submit. Please try again.");
      return;
    }
  }
};
