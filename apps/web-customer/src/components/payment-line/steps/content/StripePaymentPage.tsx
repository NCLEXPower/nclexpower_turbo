import React, { useEffect } from 'react'
import { NCLEXBanner, ProceedButton, SignOutButton } from './components';
import { Card, Checkbox, EvaIcon } from 'core-library/components';
import { Box } from '@mui/material';
import { usePageLoaderContext } from 'core-library/contexts';
import { ProductInformationLoader } from 'core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader';

interface Props {
  nextStep({ }): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export function StripePaymentPage({
  previousStep,
  nextStep,
  next,
  previous,
  reset,
}: Props) {
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

  const handleProceed = () => {
    next();
    nextStep('ProductInformation');
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
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div className="w-full lg:w-[800px] ">
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
        <div className="w-full">
          <h1 className="pt-sans-bold md:text-3xl text-2xl lg:text-4xl text-[#0F2A71] mb-4">Payment</h1>
          <Card sx={{ padding: 5, width: "100%", }} elevation={4}>
            <Box sx={{ width: "100%" }}>
              <h1 className="pt-sans-bold text:lg md:text-2xl text-[#0F2A71]">User Information</h1>
              <hr className="w-full bg-[#0F2A71]/5 my-4" />
            </Box>
            <Checkbox
              label="By clicking this, I agree to the terms and conditions."
              sx={{
                fontSize: "clamp(0.80rem, 2.5vw, 1.2rem)",
                fontFamily: "PT Sans Narrow",
              }}
            />
          </Card>
          <ProceedButton onClick={handleProceed} btnTitle='Confirm Payment' />
        </div>
      </div>
      <NCLEXBanner />
    </Box>
  )
}