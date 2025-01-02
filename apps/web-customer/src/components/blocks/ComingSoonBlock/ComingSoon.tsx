import React from 'react'
import {
  ComingSoon,
  CoreZigmaLogo,
  NCLEXYellowLogo
} from "core-library/assets";
import Image from "next/image";
import { useCountdown } from 'core-library/hooks/useCountdown';
import { Box, Typography } from "@mui/material";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from 'core-library/components/Icons';
import { FormProvider, useForm } from 'react-hook-form';
import { comingSoonSchema, ComingSoonType } from './validation';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from 'core-library/components';
import { dateData } from './ComingSoonBlock';
import { useResolution } from 'core-library/hooks';


export const ComingSoonPage: React.FC = () => {
  //The value of timeRemaining should be changed once the data is provided from the backend unless it is enforced to return this value.
  const { timeRemaining } = useCountdown({ timeRemaining: '30:04:30:00' });
  const { isMobile } = useResolution();

  const method = useForm<ComingSoonType>({
    mode: "onSubmit",
    resolver: yupResolver(comingSoonSchema),
  })

  const { handleSubmit, control, formState: { isValid } } = method;

  const onSubmit = (values: ComingSoonType) => {
    console.log(values);
  }

  return (
    <div className="w-full h-full lg:h-screen">
      <div className="w-full flex justify-center items-center h-full flex-col ">
        <Image
          src={ComingSoon}
          alt="CoreZigma"
          style={{
            width: "100%",
            height: isMobile ? "100%" : "100vh",
            position: "absolute",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            gap: { xs: '8px', lg: '12px' },
            px: { xs: 0, lg: 96 },
          }}
        >
          <div className="flex items-center justify-center gap-6">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: isMobile ? "100px" : "130px",
                height: isMobile ? "100px" : "130px",
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
            Coming Soon
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
              {timeRemaining}
            </Typography>
            {dateData.length > 0 && dateData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.days}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.hours}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.minutes}
                </div>
                <div className="font-pt-sans-narrow text-[#f3f3f3] text-[clamp(1.3rem,4cqw,2.5rem)] md:ml-4">
                  {item.seconds}
                </div>
              </div>
            ))}
          </div>
          <FormProvider {...method}>
            <Box
              sx={{
                display: 'flex',
                width: isMobile ? "100%" : '55%',
                gap: { xs: 2, lg: 4 },
                px: { xs: 2, lg: 0 },
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                "@media (max-width: 1316px)": {
                  flexDirection: 'column',
                },
              }}
            >
              <TextField
                control={control}
                name="email"
                placeholder='Email'
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  flexGrow: 1,
                  border: "1px solid #f3f3f3",
                  color: "#f3f3f3",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    lg: "16px",
                  },
                  '& .MuiInputBase-input': {
                    color: '#f3f3f3',
                  },
                  '& .MuiInputBase-input:focus': {
                    color: '#000',
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
                disabled={!isValid}
                sx={{
                  width: isMobile ? "100%" : "fit-content",
                  color: "#0F2A71",
                  bgcolor: "#FFF",
                  borderRadius: "10px",
                  fontFamily: "PT Sans",
                  fontSize: "clamp(10px, 5cqw, 16px)",
                  fontWeight: "bold",
                  alignSelf: {
                    lg: 'end'
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
                  "@media (max-width: 1316px)": {
                    width: "100%",
                  },
                }}
              >
                Notify Me
              </Button>
            </Box>
          </FormProvider>
          <p className="pt-sans-narrow-regular text-white text-[clamp(1.2rem,3cqw,1.7rem)] text-center p-4">
            Stay tuned as we prepare to unveil a brand-new experience just for you.
            Our team is working hard behind the scenes to bring something innovative and engaging.
            Check back soon for updates—you won&apos;t want to miss this!
          </p>
          <div className="flex items-center justify-center space-x-3 text-white">
            <FacebookIcon width='2rem' />
            <InstagramIcon width='2rem' />
            <TwitterIcon width='2rem' />
          </div>
        </Box>
      </div>
    </div>
  )
}