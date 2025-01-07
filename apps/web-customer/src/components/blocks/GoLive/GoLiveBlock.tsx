import React from "react";
import { useApi, useCountdown } from "core-library/hooks";

export const GoLiveBlock: React.FC = () => {
  const { countdown } = useCountdown();
  const goLiveCb = useApi(
    async (api) => await api.web.getActiveGoLiveSchedule()
  );
  console.log("goLiveCb", goLiveCb.result?.data);
  console.log("countdown", countdown);
  return (
    <div>
      <h1>Go Live Block</h1>
      <p>Go Live Block content</p>
    </div>
  );
};
