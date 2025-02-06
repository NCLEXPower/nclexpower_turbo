import React, { useEffect, useState } from "react";
import {
  ComingSoon,
  CoreZigmaLogo,
  NCLEXYellowLogo,
} from "core-library/assets";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { comingSoonSchema, ComingSoonType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "core-library/components";
import {
  SocialMediaConfig,
  useSocialMediaIcons,
} from "core-library/hooks";
import { Schedule } from "core-library/api/types";

interface Props {
  schedule?: Schedule | undefined
  daysRemaining?: number | undefined;
  onSubmit: (values: ComingSoonType) => void;
  loading: boolean;
}

const dateData = [
  {
    days: "Days"
  },
];

const socialMediaConfigs: SocialMediaConfig[] = [
  { platform: "facebook", link: "https://facebook.com" },
  { platform: "instagram", link: "https://instagram.com" },
  { platform: "twitter", link: "https://twitter.com" },
];

export const ComingSoonPage: React.FC<Props> = ({
  schedule,
  daysRemaining,
  onSubmit,
  loading,
}) => {

  const socialMediaIcons = useSocialMediaIcons(socialMediaConfigs);

  const method = useForm<ComingSoonType>({
    mode: "onSubmit",
    resolver: yupResolver(comingSoonSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = method;

  return (
    <div className="w-full h-full lg:h-screen ">
      <div className="w-full flex justify-center items-center h-full flex-col">
        <Image
          src={ComingSoon}
          alt="CoreZigma"
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div className="flex items-center justify-center flex-col z-10 px-12 lg:px-80 space-y-2 lg:space-y-3">
          <div className="flex items-center justify-center gap-6">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
              }}
            />
            <Image
              src={NCLEXYellowLogo}
              alt="CoreZigma"
              style={{
                width: "161px",
                height: "40px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: "PT Sans",
              fontWeight: "bold",
              color: "#f3f3f3",
              marginBottom: 4,
              fontSize: "clamp(1.6rem, 2.5vw, 3rem)",
            }}
          >
            {schedule?.eventName}
          </Typography>
          <div className="pt-sans-bold">
            <Typography
              sx={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
                color: "#f3f3f3",
                marginBottom: 4,
                fontSize: "clamp(2.3rem, 5cqw, 8rem)",
                textAlign: "center",
              }}
            >
              {daysRemaining}
            </Typography>
           <div className="flex items-center justify-between">
              <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                {daysRemaining === 1 ? "Day to go" : `Days to go`}
              </div>
            </div>
          </div>
          <FormProvider {...method}>
            <div className="flex w-3/4 gap-2 flex-col justify-center items-center lg:flex-row lg:gap-4 ">
              <TextField
                control={control}
                name="email"
                placeholder="Email"
                disabled={loading}
                sx={{
                  borderRadius: "10px",
                  flexGrow: 1,
                  border: "1px solid #f3f3f3",
                  color: "#f3f3f3",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    lg: "16px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f3f3f3",
                  },
                  "& .MuiInputBase-input:focus": {
                    color: "#f3f3f3",
                  },
                }}
                inputProps={{
                  style: {
                    borderRadius: "16px",
                    boxShadow: "none",
                  },
                }}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid || loading}
                loading={loading}
                sx={{
                  color: "#0F2A71",
                  bgcolor: "#FFF",
                  borderRadius: "10px",
                  fontFamily: "'PT Sans', sans-serif",
                  fontSize: "clamp(10px, 5cqw, 16px)",
                  fontWeight: "bold",
                  alignSelf: {
                    lg: "end",
                  },
                  flexGrow: 1,
                  zIndex: 1,
                  padding: {
                    xs: "6px 12px",
                    lg: "8px 16px",
                  },
                  "&:hover": {
                    backgroundColor: "#F3f3f3",
                  },
                }}
              >
                Notify Me
              </Button>
            </div>
          </FormProvider>
          <p className="pt-sans-narrow-regular text-white text-[clamp(1.2rem,3cqw,1.7rem)] text-center px-4">
            {schedule?.description}
          </p>
          <div className="flex items-center justify-center space-x-1.5 text-white">
            {socialMediaIcons}
          </div>
        </div>
      </div>
    </div>
  );
};
