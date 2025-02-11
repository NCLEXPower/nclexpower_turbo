import React from "react";
import { Box, Typography } from "@mui/material";
import { useRegisterWizardSteps } from "./steps/useSteps";
import { OrderSummaryBlock } from "../blocks";
import { Button } from "core-library/components";
import { GoogleIcon } from "../icons/GoogleIcon";
import { useDesignVisibility } from "core-library/hooks";
import Image from "next/image";
import { RegistrationBG } from "core-library/assets";
import { useRegistrationWalkthroughFormContext } from "./RegistrationWalkthroughContext";

export const RegistrationWalkthroughForm = () => {
  useDesignVisibility();
  const { signInWithGoogle } = useRegistrationWalkthroughFormContext();
  const { render } = useRegisterWizardSteps();

  return (
    <div className="w-full lg:flex lg:justify-around lg:flex-row md:flex-col">
      <Image
        src={RegistrationBG}
        alt="Registration Background"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
      />
      <Box className="w-full lg:w-3/5 flex items-center justify-center h-screen">
        <OrderSummaryBlock />
      </Box>
      <Box className="w-full lg:w-2/5 flex flex-col gap-8 px-12 py-8 justify-between h-full">
        <div className="flex flex-col leading-none text-center gap-3.5">
          <Typography sx={{
            color: "#0F2A71",
            textAlign: "center",
            fontFamily: "PT Sans Narrow",
            fontSize: "3rem",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "2.25rem",
          }}>
            Start Your NCLEX Journey
          </Typography>
          <Typography
            sx={{
              color: "#333",
              textAlign: "center",
              fontFamily: "PT Sans Narrow",
              fontSize: "1.25rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "2.25rem",
            }}
          >
            Register now to prepare for your nursing board exam and succeed in
            your career!
          </Typography>
          <div className="flex items-center justify-center w-full">
            <Button
              sx={{
                paddingY: 1.5,
                borderRadius: "10px",
                boxShadow: 2,
                borderColor: "darkGray",
              }}
              fullWidth
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <span className="mr-4 font-ptSansNarrow font-normal text-[18px] lg:text-[20px] text-black normal-case ">
                Sign up with Google
              </span>
              <GoogleIcon />
            </Button>
          </div>
        </div>
        <div className="flex items-center my-4">
          <span className="h-px flex-1 bg-slate-300"></span>
          <span className="shrink-0 px-3 pt-sans-narrow-regular text-2xl text-slate-500">OR</span>
          <span className="h-px flex-1 bg-slate-300"></span>
        </div>
        {render}
      </Box>
    </div>
  )
};
