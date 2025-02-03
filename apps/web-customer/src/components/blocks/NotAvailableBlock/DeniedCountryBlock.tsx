import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeniedCountryType, notAvailableSchema } from "./validation";
import { DeniedCountry } from "./DeniedCountry";
import { SocialMediaConfig, useSocialMediaIcons } from "core-library/hooks";

export const DeniedCountryBlock: React.FC = () => {
  const form = useForm<DeniedCountryType>({
    mode: "all",
    resolver: yupResolver(notAvailableSchema),
  });
  const { control, handleSubmit, formState:{ errors, isValid} } = form;
  const onSubmit = (data: DeniedCountryType) => {
    console.log("value: ", data); //temporarily log the data as API is not yet available
  };

  const socialMediaConfigs: SocialMediaConfig[] = [
    { platform: "facebook", link: "https://facebook.com" },
    { platform: "instagram", link: "https://instagram.com" },
    { platform: "twitter", link: "https://twitter.com" },
  ];
  const socialMediaIcons = useSocialMediaIcons(socialMediaConfigs);

  return (
    <FormProvider {...form}>
    <DeniedCountry
      socialMediaIcons={socialMediaIcons}
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isValid={isValid}
      />
    </FormProvider>
      
  );
};
