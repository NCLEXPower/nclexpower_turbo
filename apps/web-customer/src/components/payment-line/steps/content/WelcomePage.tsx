import React from 'react'
import { NCLEXBanner, ProceedButton, SignOutButton } from './components';
import { Card, EvaIcon } from 'core-library/components';
import { Box } from "@mui/material";
import { useEffect } from "react";
import { VideoPlayer } from '@/components/blocks/HubBlocks/ProgramListBlock/WatchVideosBlock/VideoPlayer';
import { useAuthContext, usePageLoaderContext } from 'core-library/contexts';
import Divider from 'core-library/components/Divider/Divider';
import { ProductInformationLoader } from 'core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader';
import { welcomeData } from './constant/ContentData';

interface Props {
  nextStep({ }): void;
  previousStep(): void;
  values: {};
  previous: () => void;
  reset: () => void;
}

export function WelcomePage({
  previousStep,
  previous,
  reset,
}: Props) {
  const { logout } = useAuthContext();
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      setContentLoader(true);
    };
  }, []);

  if (contentLoader) {
    return <ProductInformationLoader />;
  }

  const handlePrevious = () => {
    previousStep();
    previous();
    reset();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div className="lg:w-[800px] w-full">
        <Box sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 2
        }}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={handlePrevious}>
            <EvaIcon name="arrow-back-outline" fill="#0F2A71" width={20} height={20} />
            <span className="pt-sans-regular text-[#0F2A71] text-lg">Back</span>
          </div>
          <SignOutButton />
        </Box>
        <div className="w-full flex items-center justify-center flex-col">
          <h1 className="pt-sans-bold md:text-3xl text-2xl lg:text-4xl text-[#0F2A71] my-4 text-center"
          >
            Thank you for your purchase
          </h1>
          <Card sx={{ padding: 5, width: "100%", }} elevation={4}>
            <div className="w-full">
              <h1 className="pt-sans-bold text-lg md:text-2xl text-[#0F2A71] mb-4">NCLEX Power Welcomes You!</h1>
              <Divider color='#0F2A71/50%' thickness={3} />
              <div className="w-full flex items-center justify-center mt-4">
                <VideoPlayer
                  isWideScreen={false}
                  selectedVid={welcomeData[0]}
                  showTheaterMode={false}
                />
              </div>
            </div>
          </Card>
          <ProceedButton onClick={logout} btnTitle='Proceed to Login' />
        </div>
        <NCLEXBanner />
      </div>
    </Box>
  )
}