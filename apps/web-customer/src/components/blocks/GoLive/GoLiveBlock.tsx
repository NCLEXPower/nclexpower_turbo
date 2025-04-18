import React from "react";
import { useApiCallback } from "core-library/hooks";
import { ComingSoonPage } from "../ComingSoonBlock/ComingSoon";
import { ComingSoonType } from "../ComingSoonBlock/validation";
import { NotifyParams } from "core-library/api/types";
import { GoLiveStatusSsr } from "core-library/types/global";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";

type GoLiveBlockType = {
  data: GoLiveStatusSsr | undefined;
};

export const GoLiveBlock: React.FC<GoLiveBlockType> = ({ data }) => {
  const notifyCb = useApiCallback(
    async (api, args: NotifyParams) => await api.web.sendNotify(args)
  );

  if (!data?.goLive) {
    return <NotFoundBlock />;
  }

  return <ComingSoonPage onSubmit={handleSubmit} loading={notifyCb.loading} />;

  async function handleSubmit(values: ComingSoonType) {
    try {
      const result = await notifyCb.execute({
        email: values.email,
        goLiveId: data?.goLive.id,
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
