import React from "react";
import { Box, Typography } from "@mui/material";
import { useRegisterWizardSteps } from "./steps/useSteps";
import { OrderSummaryBlock } from "../blocks";
import { Button } from "core-library/components";
import { GoogleIcon } from "../icons/GoogleIcon";
import { useDesignVisibility } from "core-library/hooks";
import Image from "next/image";
import { RegistrationBG } from "core-library/assets";
import Link from "next/link";

export const RegistrationWalkthroughForm = () => {
  useDesignVisibility();
  const { render } = useRegisterWizardSteps();

  return (
    <div className='w-full h-screen '>
      <div className=''>
        <Image
          src={RegistrationBG}
          alt='Registration Background'
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -1,
          }}
        />
        <div className='w-[clamp(1px,84.41vw,2954px)] lg:w-[clamp(1px,76.9271vw,2954px)] m-auto py-[clamp(1px,11.1628vw,96px)] lg:py-0'>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center h-screen">
            <Box className='md:w-[clamp(1px,40.079vw,900px)] lg:w-[clamp(1px,33.594vw,1290px)] '>
              <OrderSummaryBlock />
            </Box>
            <Box className='md:w-[clamp(1px,40.079vw,900px)] lg:w-[clamp(1px,28.907vw,1110px)] flex flex-col lg:py-5 py-[clamp(1px,6.51041vw,96px)]'>
              <div className='flex flex-col leading-none text-center gap-3.5'>
                <div className='text-[clamp(1px,5.81395vw,36px)] md:text-[clamp(1px,2.54154vw,80px)] lg:text-[clamp(1px,2.083331vw,80px)] font-Poppins font-bold text-[#0F2A71]'>
                  Start Your NCLEX Journey
                </div>
                <div className='text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] font-ptSans font-normal text-center'>
                  Register now to prepare for your nursing board exam and succeed in
                  your career!
                </div>
                <div className='flex items-center justify-center w-full'>
                  <Button
                    sx={{
                      borderRadius: {
                        xs: 'clamp(1px,2vw,20px)',
                        sm: 'clamp(1px,0.5vw,20px)'
                      },
                      boxShadow: 2,
                      borderColor: 'darkGray',
                      minHeight: {
                        xs: 'clamp(1px, 10.466vw, 50px)',
                        md: 'clamp(1px, 3.911vw, 112px)',
                        lg: 'clamp(1px, 2.917vw, 112px)'
                      },
                      padding: '0'
                    }}
                    fullWidth
                    variant='outlined'
                  >
                    <span className='mr-4 font-ptSans font-bold text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,1.041665vw,40px)] text-black normal-case '>
                      Sign up with Google
                    </span>
                    <GoogleIcon />
                  </Button>
                </div>
              </div>
              <div className='flex items-center my-4'>
                <span className='h-[2px] flex-1 bg-[rgba(51,51,51,0.3)]'></span>
                <span className='shrink-0 px-3 pt-sans-bold text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.041665vw,40px)] text-[rgba(51,51,51,0.3)]'>
                  OR
                </span>
                <span className='h-[2px] flex-1 bg-[rgba(51,51,51,0.3)]'></span>
              </div>
              <div
                className="lg:h-[clamp(1px,26.042vw,1000px)] overflow-auto"
                style={{ scrollbarWidth: 'none' }}
              >
                {render}
              </div>
              <h4 className='text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-regular font-ptSans text-center pt-5'>
                Already have an account?{' '}
                <span className=' font-bold underline font-mainBlue'>
                  <Link href='/login' style={{ backgroundColor: 'transparent' }}>
                    Login
                  </Link>
                </span>
              </h4>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
