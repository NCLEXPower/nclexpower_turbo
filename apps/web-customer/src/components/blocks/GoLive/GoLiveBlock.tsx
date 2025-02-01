import React from "react";
import {
  useApi,
  useApiCallback,
  useWebSocketCountdown,
} from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";
import { ComingSoonType } from "../ComingSoonBlock/validation";
import { NotifyParams } from "core-library/api/types";

export const GoLiveBlock: React.FC = () => {
  const { countdown, connectionError } = useWebSocketCountdown();
  const notifyCb = useApiCallback(
    async (api, args: NotifyParams) => await api.web.sendNotify(args)
  );

  if (connectionError) {
    return <p>Error: {connectionError}</p>;
  }

  if (!countdown) {
    return <p>No active countdown.</p>;
  }
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
        goLiveId: countdown?.Id,
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
