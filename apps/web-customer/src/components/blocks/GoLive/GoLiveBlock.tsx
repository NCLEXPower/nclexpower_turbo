import React from "react";
import { useApiCallback } from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";
import { ComingSoonType } from "../ComingSoonBlock/validation";
import { NotifyParams } from "core-library/api/types";
import { GoLiveStatusSsr } from "core-library/types/global";

type GoLiveBlockType = {
  data: GoLiveStatusSsr;
};

export const GoLiveBlock: React.FC<GoLiveBlockType> = ({ data }) => {
  const notifyCb = useApiCallback(
    async (api, args: NotifyParams) => await api.web.sendNotify(args)
  );

  return <ComingSoonPage onSubmit={handleSubmit} loading={notifyCb.loading} />;

  async function handleSubmit(values: ComingSoonType) {
    try {
      const result = await notifyCb.execute({
        email: values.email,
        goLiveId: data.goLive.id,
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
