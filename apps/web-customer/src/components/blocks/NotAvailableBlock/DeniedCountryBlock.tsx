import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeniedCountryType, notAvailableSchema } from "./validation";
import { DeniedCountry } from "./DeniedCountry";
import {
  SocialMediaConfig,
  useDesignVisibility,
  useSocialMediaIcons,
  useApiCallback,
} from "core-library/hooks";

export const DeniedCountryBlock: React.FC = () => {
  const form = useForm<DeniedCountryType>({
    mode: "all",
    resolver: yupResolver(notAvailableSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form;

  const sendNotifyCallback = useApiCallback(
    (api, data: DeniedCountryType) => {
      try {
        return api.web.sendNotify({
          email: data.email,
          emailNotificationType: 0,
        });
      } catch (error) {
        throw error;
      }
    }
  );

  const onSubmit = async (data: DeniedCountryType) => {
    try {
      const response = await sendNotifyCallback.execute(data);
      reset();
    } catch (error) {
      console.error("Failed to execute API call:", error);
    }
  };

  useDesignVisibility();

  const socialMediaConfigs: SocialMediaConfig[] = [
    {
      platform: "facebook",
      link: "https://www.facebook.com/profile.php?id=61573493806921",
    },
    { platform: "instagram", link: "https://www.instagram.com/ncpreview/" },
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
        loading={sendNotifyCallback.loading}
      />
    </FormProvider>
  );
};