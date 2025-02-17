import React, { useEffect, useState } from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonManagement from "./ComingSoonManagement";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi, useApiCallback } from "../../../../../../hooks";
import { CountryMockData } from "./ComingSoonMock";

export const ComingSoonManagementBlock: React.FC = () => {
  const getCountryTimezones = useApi((api) =>
    api.webbackoffice.getCountryTimezone()
  );

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

  const hasNoSchedule = watch("hasNoSchedule");
  const [isSwitchOn, setIsSwitchOn] = useState(!hasNoSchedule);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked);
    setValue("hasNoSchedule", !event.target.checked);
  };

  const watchEventName = watch("eventName");
  const watchEnvironment = watch("environment");
  const watchDescription = watch("description");
  const watchConfetti = watch("confetti");
  const watchAnnouncement = watch("announcement");
  const watchCountryKey = watch("countryKey");

  useEffect(() => {
    const countryNames = (watchCountryKey || []).map((key) => 
      CountryMockData.find(c => c.value === key)?.label || key
    );
    setValue("countryName", countryNames);
  }, [watchCountryKey, setValue]);

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: "550px", width: "auto" }}
      >
        <FormProvider {...form}>
          <ComingSoonManagement
            control={control}
            isSwitchOn={isSwitchOn}
            onSwitchChange={handleSwitchChange}
            isActive={watch("isActive")}
          />
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
            isSwitchOn={isSwitchOn}
          />
        </FormProvider>
      </Stack>
      <EmailsNotification />
    </Stack>
  );
};
