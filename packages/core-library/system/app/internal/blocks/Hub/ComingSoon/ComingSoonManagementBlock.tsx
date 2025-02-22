import React, { useState } from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonManagement from "./ComingSoonManagement";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiCallback, useBeforeUnload } from "../../../../../../hooks";
import { useExecuteToast } from "../../../../../../contexts";

type MappedCountry = {
  countryKey: string;
  countryName: string;
  daysRemaining: number;
  timezones: {
    selectedTimezone: string;
    daysRemaining: number;
    hoursRemaining: number;
  }[];
};

const mapResponseToCountry = (data: {
  countryKey: string;
  country: string;
  daysRemaining: {
    selectedTimezone: string;
    daysRemaining: number;
    hoursRemaining: number;
  }[];
}): MappedCountry => {
  const bestTimezone = data.daysRemaining.reduce(
    (prev, curr) => (curr.hoursRemaining > prev.hoursRemaining ? curr : prev),
    data.daysRemaining[0]
  );
  return {
    countryKey: data.countryKey,
    countryName: data.country,
    daysRemaining: bestTimezone.daysRemaining,
    timezones: data.daysRemaining,
  };
};

export const ComingSoonManagementBlock: React.FC = () => {
  const [mappedCountries, setMappedCountries] = useState<MappedCountry[]>([]);
  
  useBeforeUnload(true);


  const getCountryTimezonesCb = useApiCallback((api, args) => {
    const { countryKey, goLiveDate } = args as {
      countryKey: string;
      goLiveDate: string;
    };
    return api.webbackoffice.getCountryTimezone({
      countryKey,
      goLiveDate,
      daysRemaining: undefined,
      country: undefined,
    });
  });

  const { showToast } = useExecuteToast();
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, handleSubmit, watch, setValue } = form;

  const handleDeactivate = () => {
    setValue("isActive", false);
  };

  const hasNoSchedule = watch("hasNoSchedule");
  const [isSwitchOn, setIsSwitchOn] = useState(!hasNoSchedule);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked);
    setValue("hasNoSchedule", !event.target.checked);
  };

  const isLoading = getCountryTimezonesCb.loading;

  const watchEventName = watch("eventName");
  const watchEnvironment = watch("TargetEnvironment");
  const watchDescription = watch("description");
  const watchAnnouncement = watch("announcement");

  return (
    <Stack direction="column" spacing={2}>
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
            watchAnnouncement={watchAnnouncement}
            handleDeactivate={handleDeactivate}
            isActive={watch("isActive")}
            isSwitchOn={isSwitchOn}
            isLoading={isLoading}
          />
        </FormProvider>
      </Stack>
      <EmailsNotification />
    </Stack>
  );

  async function onSubmit(values: ContentDateType) {
    if (Array.isArray(values.countryKey)) {
      try {
        const responses = await Promise.all(
          values.countryKey.map((key) =>
            getCountryTimezonesCb.execute({
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
        showToast("Succesful", "success");
      } catch (error) {
        console.error("Error fetching timezones:", error);
        showToast("Error fetching timezones", "error");
      }
    }
    setValue("isActive", true);
  }
};
