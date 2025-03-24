import React, { useEffect, useState, useMemo, useRef } from "react";
import { contentDateSchema, ContentDateType } from "./validation";
import { EmailsNotification } from "./EmailsNotification";
import { Stack } from "@mui/material";
import ComingSoonManagement from "./ComingSoonManagement";
import ComingSoonForm from "./ComingSoonForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiCallback } from "../../../../../../hooks";
import { CreateGoliveSchedule } from "../../../../../../api/types";
import { useExecuteToast } from "../../../../../../contexts";
import { MappedCountry } from "./types";
import { cacheKeyFor } from "../../../../../../utils/cacheKey";

const mapResponseToCountry = (data: {
  countryKey: string;
  country: string;
  daysRemaining: {
    selectedTimezone: string;
    daysRemaining: number;
  }[];
}): MappedCountry => {
  const defaultTimezone = data.daysRemaining[0];
  return {
    countryKey: data.countryKey,
    countryName: data.country,
    daysRemaining: defaultTimezone.daysRemaining,
    timezones: data.daysRemaining,
  };
};

export const ComingSoonManagementBlock: React.FC = () => {
  const [mappedCountries, setMappedCountries] = useState<MappedCountry[]>([]);
  const cache = useRef<Map<string, MappedCountry>>(new Map());

  const getCountryTimezones = useApiCallback((api, args) => {
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

  const createGoliveScheduleCb = useApiCallback(
    (api, args: CreateGoliveSchedule) =>
      api.webbackoffice.createGoliveSchedule(args)
  );

  const { showToast } = useExecuteToast();

  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
    defaultValues: {
      hasNoSchedule: false,
      countdownEnabled: false,
    },
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

  const [countdownEnabled, setCountdownEnabled] = useState(false);
  const handleCountdownToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCountdownEnabled(isChecked);
    setValue("countdownEnabled", isChecked);
    if (!isChecked) {
      setValue("goLiveDate", undefined);
      setValue("timeZone", undefined);
      cache.current.clear();
      setMappedCountries([]);
    }
  };

  const selectedCountries = watch("countryKey");
  const goLiveDate = watch("goLiveDate");

  async function fetchTimezones() {
    if (!selectedCountries || !goLiveDate) {
      setMappedCountries([]);
      return;
    }

    const missingKeys = selectedCountries.filter(
      (key): key is string =>
        key !== undefined && !cache.current.has(cacheKeyFor(goLiveDate, key))
    );

    if (missingKeys.length > 0) {
      try {
        const responses = await Promise.all(
          missingKeys.map((countryKey) =>
            getCountryTimezones.execute({
              countryKey,
              goLiveDate: goLiveDate.toString(),
            })
          )
        );

        const newFlattenedResponses = responses.flatMap((response) =>
          Array.isArray(response.data) ? response.data : [response.data]
        );
        const newMapped = newFlattenedResponses.map(mapResponseToCountry);
        newMapped.forEach((mapped) => {
          cache.current.set(cacheKeyFor(goLiveDate, mapped.countryKey), mapped);
        });
      } catch (error) {
        console.error("Error fetching timezones:", error);
        showToast("Error fetching timezones", "error");
      }
    }

    const newMappedCountries = selectedCountries
      .filter((key): key is string => key !== undefined)
      .map((key) => cache.current.get(cacheKeyFor(goLiveDate, key))!);
    setMappedCountries(newMappedCountries);
  }

  useEffect(() => {
    fetchTimezones();
  }, [selectedCountries, goLiveDate]);

  const memoizedMappedCountries = useMemo(
    () => mappedCountries,
    [mappedCountries]
  );

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
            mappedCountries={memoizedMappedCountries}
            isCountdownEnabled={countdownEnabled}
            onCountdownToggle={handleCountdownToggle}
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
            isLoading={createGoliveScheduleCb.loading}
          />
        </FormProvider>
      </Stack>
      <EmailsNotification />
    </Stack>
  );

  async function onSubmit(values: ContentDateType) {
    try {
      const payload: CreateGoliveSchedule = {
        eventName: values.eventName,
        description: values.description,
        targetEnvironment: values.TargetEnvironment,
        countries: values.countryKey as string[],
        isActive: true,
      };

      if (values.countdownEnabled) {
        payload.endDate = values.goLiveDate?.toISOString() || "";
        payload.timeZone = values.timeZone;
        payload.selectedCountriesTimezones = mappedCountries.flatMap(
          (country) => country.timezones.map((tz) => tz.selectedTimezone)
        );
      }
      const {endDate, timeZone, selectedCountriesTimezones} = payload;
      // Temporary while API is not ready
      // await createGoliveScheduleCb.execute(payload);
      console.log("Payload:", payload);

      setValue("isActive", true);
      showToast("Successful", "success");
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Submission failed", "error");
    }
  }
};
