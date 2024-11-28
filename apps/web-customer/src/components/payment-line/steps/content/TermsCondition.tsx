import React, { useEffect } from 'react'
import { NCLEXBanner, ProceedButton, SignOutButton } from './components';
import { Card, Checkbox, EvaIcon } from 'core-library/components';
import { Box, Typography } from '@mui/material';
import { termsData } from './constant/ContentData';
import Divider from 'core-library/components/Divider/Divider';
import { usePageLoaderContext } from 'core-library/contexts';
import { ProductInformationLoader } from 'core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader';

interface Props {
  nextStep({ }): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
}

export function TermsCondition({ previousStep, nextStep, next, previous }: Props) {
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
    nextStep('StripePaymentPage');
  }

  const handlePrevious = () => {
    previousStep();
    previous();
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
          <h1 className="pt-sans-bold text-2xl md:text-3xl lg:text-4xl text-darkBlue mb-4">More Information</h1>
          <Card sx={{ padding: 5, width: "100%", }} elevation={4}>
            <Box sx={{ width: "100%" }}>
              <h1 className="pt-sans-bold text:lg md:text-2xl text-darkBlue">Terms and Conditions</h1>
              <Divider color='#0F2A71' thickness={3} sx={{ marginY: '20px' }} />
              <Card sx={{
                padding: 5,
                width: "100%",
                height: "20rem",
                overflowY: 'auto',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
              }}
                elevation={4}>
                {termsData?.map((term, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography gutterBottom sx={{
                      color: "#0F2A71",
                      fontWeight: 'bold',
                      fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)",
                    }}>
                      {index + 1}. {term.title}
                    </Typography>
                    {term?.content.map((paragraph, i) => (
                      <Typography
                        key={i}
                        variant="body1"
                        sx={{
                          mb: 2,
                          textIndent: "2em",
                          lineHeight: 1.6,
                          color: "#0F2A71",
                          fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)",
                        }}
                      >
                        {paragraph}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Card>
            </Box>
          </Card>
          <div className="w-full flex items-center justify-between my-4">
            <Checkbox
              label="By clicking this, I agree to the terms and conditions."
              sx={{ fontSize: '1.2rem', width: '100%', fontFamily: 'PT Sans Narrow' }}
            />
          </div>
          <ProceedButton onClick={handleProceed} />
        </div>
      </div>
      <NCLEXBanner />

    </Box>
  )
}