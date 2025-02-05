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
  CountdownState,
  SocialMediaConfig,
  useResolution,
  useSocialMediaIcons,
} from "core-library/hooks";
import { Schedule } from "core-library/api/types";

interface Props {
  countdown: CountdownState | null;
  schedule?: Schedule | undefined
  daysRemaining?: number | undefined;
  onSubmit: (values: ComingSoonType) => void;
  loading: boolean;
}

const dateData = [
  {
    days: "Days To Go",
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
  countdown,
  onSubmit,
  loading,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("00");

  const socialMediaIcons = useSocialMediaIcons(socialMediaConfigs);

  const method = useForm<ComingSoonType>({
    mode: "onSubmit",
    resolver: yupResolver(comingSoonSchema),
  });

  useEffect(() => {
    if (countdown) {
      const formattedTime = `${countdown.Days.toString().padStart(2, "0")}`;
      setTimeRemaining(formattedTime);
    }
  }, [countdown]);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = method;

  return (
    <div className="w-full min-h-screen relative bg-[#0F2A71]">
      <div className="w-full flex justify-center items-center min-h-screen flex-col">
        <Image
          src={ComingSoon}
          alt="CoreZigma"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <div className="flex items-center justify-center flex-col z-10 px-8 lg:px-60">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <Image
              src={NCLEXYellowLogo}
              alt="CoreZigma"
              style={{
                width: "135px",
                height: "30px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#CDCDCD",
              marginBottom: 3,
              fontSize: "clamp(3rem, 3.5vw, 4rem)",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {schedule?.eventName}
          </Typography>
          <div>
            <div className="flex items-center justify-center gap-4">
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "#CDCDCD",
                  fontSize: "clamp(7rem, 5cqw, 7rem)",
                  textAlign: "center",
                  marginTop: 0,
                  marginBottom: 0,
                  lineHeight: 1,
                }}
              >
                {daysRemaining}
              </Typography>
              {dateData.length > 0 &&
                dateData?.map((item, index) => (
                  <div key={index} className="font-['Poppins'] font-bold text-[#CDCDCD] text-[clamp(1.3rem,4cqw,2.5rem)] flex flex-col items-start leading-none">
                    <span className="font-[700] text-[clamp(1.2rem,2.5cqw,1.9rem)] font-sans">Days</span>
                    <span className="font-[700] text-[clamp(0.9rem,2cqw,1.4rem)] font-sans">To Go</span>
                  </div>
                ))}
            </div>
          </div>
          <FormProvider {...method}>
            <div className="flex w-[95%] gap-2 flex-col justify-center lg:items-end lg:flex-row lg:gap-4 mt-4">
              <TextField
                control={control}
                name="email"
                placeholder="Email"
                disabled={loading}
                sx={{
                  borderRadius: "10px",
                  flexGrow: 3,
                  height: "56px",
                  border: "2px solid #D9D9D9",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    lg: "16px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#D9D9D9",
                  },
                  "& .MuiInputBase-input:focus": {
                  
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
                  bgcolor: "#FFFFFF",
                  borderRadius: "10px",
                  fontFamily: "'Poppins'",
                  fontSize: "clamp(5px, 3cqw, 14px)",
                  fontWeight: "bold",
                  height: "56px",
                  minHeight: "56px",
                  maxHeight: "56px",
                  flexGrow: 0.5,
                  zIndex: 1,
                  marginTop: "4px",
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
          <p className="font-['Poppins'] text-white text-[clamp(0.4rem,1cqw,1rem)] text-center px-4 flex flex-col mt-8 mb-4">
            {schedule?.description}
          </p>
          <div className="flex items-center justify-center space-x-1.5 text-white mt-4">
            {socialMediaIcons}
          </div>
        </div>
      </div>
    </div>
  );
};
