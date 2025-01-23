import React, { useState } from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonConfiguration from "./ComingSoonConfiguration";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const ComingSoonManagementBlock: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false); // remove this change isActive

  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, handleSubmit, watch } = form;

  function onSubmit(values: ContentDateType) {
    console.log("go live value", values);
    setShowPreview(true);
  }

  const watchEventName = watch("eventName");
  const watchEnvironment = watch("environment");
  const watchDescription = watch("description");
  const watchConfetti = watch("confetti");
  const watchAnnouncement = watch("announcement");

  const test = watch();
  console.log(test);

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction="row" spacing={2} sx={{ height: "550px" }}>
        <FormProvider {...form}>
          <ComingSoonConfiguration control={control} />
          <ComingSoonForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watchEventName={watchEventName}
            watchEnvironment={watchEnvironment}
            watchDescription={watchDescription}
            watchConfetti={watchConfetti}
            watchAnnouncement={watchAnnouncement}
            showPreview={showPreview}
          />
        </FormProvider>
      </Stack>
      <EmailsNotification />
    </Stack>
  );
};
