import React, { useEffect } from 'react'
import { NCLEXBanner, ProceedButton, SignOutButton } from './components';
import { Card, EvaIcon } from 'core-library/components';
import { Box, Typography } from '@mui/material';
import { productData } from './constant/ContentData';
import Divider from 'core-library/components/Divider/Divider';
import { ProductInformationLoader } from 'core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader';
import { usePageLoaderContext } from 'core-library/contexts';

interface Props {
  nextStep({ }): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
  reset: () => void;
}

export function ProductInformation({
  previousStep,
  nextStep,
  next,
  previous,
  reset
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
    nextStep('TermsConditionsPage');
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
        <div className="w-full">
          <h1 className="pt-sans-bold text-2xl md:text-3xl lg:text-4xl text-[#0F2A71] mb-4">Contact Information</h1>
          <Card sx={{ padding: 5, width: "100%", }} elevation={4}>
            {productData && productData.length > 0 ? productData?.map((item, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <h1 className="pt-sans-bold text-2xl text-[#0F2A71] mb-4">Order Summary</h1>
                <Divider color='#0F2A71/50%' thickness={3} />
                <div className='px-2 lg:px-24'>
                  <div className="flex items-center justify-between pt-sans-narrow-bold text-[#0f2A71] mt-4 ">
                    <Typography sx={{ fontFamily: "PT Sans", fontSize: "clamp(0.90rem, 2.5vw, 1rem)", fontWeight: "bold", color: "#0F2A71" }}>Plan Name :  </Typography>
                    <Typography sx={{ fontFamily: "PT Sans", fontSize: "clamp(0.90rem, 2.5vw, 1rem)", fontWeight: "bold", color: "#0F2A71" }}>Duration : </Typography>
                  </div>
                  <div className="w-full flex items-center justify-between text-darkBlue">
                    <Typography sx={{ fontFamily: "PT Sans Narrow", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: "bold" }}>{item.planName} </Typography>
                    <Typography sx={{ fontFamily: "PT Sans Narrow", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: "bold" }}>{item.duration}</Typography>
                  </div>
                </div>
                <div className="flex items-start justify-around flex-col pt-sans-bold mt-6">
                  <p className="text-[#0F2A71]">Product Description:</p>
                  <p className="text-slate-700 -mt-4 pt-sans-narrow-regular pr-6 md:pr-20 pl-4">{item.productDesc}</p>
                </div>
                <Divider color='#0F2A71/50%' thickness={3} />
                <div className="flex items-center justify-end gap-3 pt-sans-narrow-bold text-[#0f2A71] text-xl mt-3">
                  <Typography sx={{ fontFamily: "PT Sans", fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)", fontWeight: "bold", color: "#0F2A71" }}>Product Price : </Typography>
                  <p className="text-2xl md:text-3xl lg:text-4xl">{item.productPrice}</p>
                </div>
              </Box>
            )) :
              <div>No data...</div>
            }
          </Card>
          <ProceedButton onClick={handleProceed} />
        </div>
      </div>
      <NCLEXBanner />
    </Box >
  )
}