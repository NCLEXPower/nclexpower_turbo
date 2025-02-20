import React, { useState } from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonManagement from "./ComingSoonManagement";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiCallback } from "../../../../../../hooks";

export const ComingSoonManagementBlock: React.FC = () => {
  const [mappedCountries, setMappedCountries] = useState<
    Array<{ code: string; name: string; daysLeft: number }>
  >([]);

  const getCountryTimezones = useApiCallback((api, args) => {
    const { countryKey, goLiveDate } = args as {
      countryKey: any;
      goLiveDate: any;
    };
    return api.webbackoffice.getCountryTimezone({
      countryKey,
      goLiveDate,
      daysRemaining: undefined,
      country: undefined,
    });
  });

  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;

  function mapResponseToCountry(data: {
    countryKey: string;
    country: string;
    daysRemaining: { hoursRemaining: number; daysRemaining: number }[];
  }): { code: string; name: string; daysLeft: number } {
    const bestTimezone = data.daysRemaining.reduce(
      (prev, curr) => (curr.hoursRemaining > prev.hoursRemaining ? curr : prev),
      data.daysRemaining[0]
    );
    return {
      code: data.countryKey,
      name: data.country,
      daysLeft: bestTimezone.daysRemaining,
    };
  }

  async function onSubmit(values: ContentDateType) {
    console.log("go live value", values);
    if (Array.isArray(values.countryKey)) {
      try {
        const responses = await Promise.all(
          values.countryKey.map((key) =>
            getCountryTimezones.execute({
              countryKey: key,
              goLiveDate: values.goLiveDate?.toString() || "",
            })
          )
        );
        const flattenedResponses = responses.flatMap((response) =>
          Array.isArray(response.data) ? response.data : [response.data]
        );
        const mapped = flattenedResponses.map(mapResponseToCountry);
        setMappedCountries(mapped);
      } catch (error) {
        console.error("Error fetching timezones:", error);
      }
    }
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
  const watchEnvironment = watch("TargetEnvironment");
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
          <ComingSoonManagement
            control={control}
            isSwitchOn={isSwitchOn}
            onSwitchChange={handleSwitchChange}
            isActive={watch("isActive")}
            mappedCountries={mappedCountries}
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
