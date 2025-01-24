import React from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonManagement from "./ComingSoonManagement";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const ComingSoonManagementBlock: React.FC = () => {
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;

  function onSubmit(values: ContentDateType) {
    console.log("go live value", values);
    setValue("isActive", true);
  }

  function handleDeactivate() {
    setValue("isActive", false);
  }

  const watchEventName = watch("eventName");
  const watchEnvironment = watch("environment");
  const watchDescription = watch("description");
  const watchConfetti = watch("confetti");
  const watchAnnouncement = watch("announcement");

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: "550px", width: "auto" }}
      >
        <FormProvider {...form}>
          <ComingSoonManagement control={control} />
          <ComingSoonForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watchEventName={watchEventName}
            watchEnvironment={watchEnvironment}
            watchDescription={watchDescription}
            watchConfetti={watchConfetti}
            watchAnnouncement={watchAnnouncement}
            handleDeactivate={handleDeactivate}
            isActive={watch("isActive")}
          />
        </FormProvider>
      </Stack>
      <EmailsNotification />
    </Stack>
  );
};
