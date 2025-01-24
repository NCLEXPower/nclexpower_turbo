import React from "react";
import {
  useApi,
  useApiCallback,
  useSignalRCountdown,
} from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";
import { ComingSoonType } from "../ComingSoonBlock/validation";
import { NotifyParams } from "core-library/api/types";

export const GoLiveBlock: React.FC = () => {
  const { countdown } = useSignalRCountdown();
  const goLiveCb = useApi(
    async (api) => await api.web.getActiveGoLiveSchedule()
  );
  const notifyCb = useApiCallback(
    async (api, args: NotifyParams) => await api.web.sendNotify(args)
  );

  if (countdown === null) return <p>Something went wrong.</p>;

  return (
    <ComingSoonPage
      countdown={countdown}
      onSubmit={handleSubmit}
      loading={notifyCb.loading}
    />
  );

  async function handleSubmit(values: ComingSoonType) {
    try {
      const result = await notifyCb.execute({
        email: values.email,
        goLiveId: countdown?.id,
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
