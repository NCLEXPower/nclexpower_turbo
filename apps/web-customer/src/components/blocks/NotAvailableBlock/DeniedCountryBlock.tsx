import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeniedCountryType, notAvailableSchema } from "./validation";
import { DeniedCountry } from "./DeniedCountry";
import { useExecuteToast } from "core-library/contexts";
import {
  SocialMediaConfig,
  useDesignVisibility,
  useSocialMediaIcons,
  useApiCallback,
} from "core-library/hooks";

export const DeniedCountryBlock: React.FC = () => {
  const { showToast } = useExecuteToast();
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
    (api, data: DeniedCountryType) => api.web.sendNotify({
        email: data.email,
        emailNotificationType: 1,
      })
  );

  const onSubmit = async (data: DeniedCountryType) => {
    try {
      const response = await sendNotifyCallback.execute(data);
      reset();
    } catch (error) {
      showToast("Error sending notification", "error");
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