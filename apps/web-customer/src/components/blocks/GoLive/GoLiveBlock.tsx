import React from "react";
import { useApi, useSignalRCountdown } from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";

export const GoLiveBlock: React.FC = () => {
  const { countdown } = useSignalRCountdown();
  const goLiveCb = useApi(
    async (api) => await api.web.getActiveGoLiveSchedule()
  );

  if (countdown === null) return <p>Something went wrong.</p>;

  return <ComingSoonPage countdown={countdown} />;
};
