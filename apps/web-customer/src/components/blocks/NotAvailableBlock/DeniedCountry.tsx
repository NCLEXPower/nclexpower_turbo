import {
  CoreZigmaLogo,
  NCLEXYellowLogo,
  NotAvailableBG,
} from "core-library/assets";
import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Button, TextField } from "core-library/components";
import { useResolution } from "core-library/hooks";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { DeniedCountryType } from "./validation";
import { Box } from "@mui/material";

type DeniedCountryProps = {
  socialMediaIcons: JSX.Element[];
  control: Control<DeniedCountryType>;
  onSubmit: (data: DeniedCountryType) => void;
  handleSubmit: UseFormHandleSubmit<DeniedCountryType>;
  isValid: boolean;
};

export const DeniedCountry = ({
  socialMediaIcons,
  control,
  onSubmit,
  handleSubmit,
  isValid,
}: DeniedCountryProps) => {
  const { isMobile } = useResolution();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Image
        src={NotAvailableBG}
        alt="CoreZigma"
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div className="flex items-center justify-center gap-4">
        <Image
          src={CoreZigmaLogo}
          alt="CoreZigma"
          className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[80px] md:h-[80px] object-cover"
        />
        <Image
          src={NCLEXYellowLogo}
          alt="NCLEXYellowLogo"
          className="w-[100px] h-[25px] sm:w-[130px] sm:h-[30px] md:w-[161px] md:h-[40px] object-cover z-0"
        />
      </div>
      <div
        style={{
          width: "50%",
          height: "2px",
          backgroundColor: "grey",
          zIndex: 1,
          marginTop: "15px",
          marginBottom: isMobile ? "15px" : "0px",
          opacity: 0.3,
        }}
      />
      <div className="mx-10">
        <Typography
          variant="h2"
          fontWeight={600}
          color="white"
          className="opacity-80 lg:pt-10 "
          fontFamily="Poppins"
          sx={{
            fontSize: "clamp(1rem, 5cqw, 3rem)",
          }}
        >
          We&apos;re Sorry
        </Typography>
        <Typography
          variant="h1"
          fontWeight={700}
          color="white"
          className="opacity-90"
          fontFamily="Poppins"
          sx={{
            fontSize: "clamp(1.5rem, 5cqw, 4rem)",
          }}
        >
          NCLEXPower is currently
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "clamp(1.5rem, 5cqw, 4rem)",
            fontWeight: 700,
            color: "#FEB900",
            zIndex: 1,
          }}
        >
          NOT AVAILABLE
        </Typography>
        <Typography
          variant="h2"
          color="white"
          fontWeight={600}
          className="opacity-80 lg:pb-5"
          sx={{
            fontSize: "clamp(1rem, 5cqw, 2rem)",
          }}
          fontFamily="Poppins"
        >
          in your country
        </Typography>
        <Typography
          variant="body1"
          color="white"
          className="opacity-90 pt-5"
          fontFamily="Poppins"
          sx={{
            fontSize: "clamp(0.7rem, 2.5vw, 1rem)",
          }}
        >
          Thank you for your patience – we&apos;re looking forward to seeing you
          here very soon when we open our doors!
        </Typography>
      </div>
      <div className="flex flex-col pt-5 mb-10 lg:mb-10 md:flex-row items-end justify-center gap-4 md:pt-10 md:mb-10">
      <TextField
          control={control}
          name="email"
          placeholder="Email"
          sx={{
            borderRadius: "10px",
            flexGrow: 1,
            border: "1px solid #f3f3f3",
            color: "white",
            width: isMobile ? "100%" : "500px",
            fontSize: {
              xs: "12px",
              sm: "14px",
              lg: "16px",
            },
            "& .MuiInputBase-input": {
              color: "white",
              backgroundColor: "transparent",
            },
            "& .MuiInputBase-input:focus": {
              color: "grey",
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
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            color: "#001E52",
            borderColor: "#001E52",
            borderWidth: "2px",
            borderStyle: "solid",
            width: isMobile ? "100%" : "auto",
            "&:hover": {
              backgroundColor: "#001E52",
              color: "white",
            },
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Notify
        </Button>
      </div>
      <div
        style={{
          width: "50%",
          height: "2px",
          backgroundColor: "grey",
          zIndex: 1,
          marginTop: isMobile ? "15px" : "0px",
          opacity: 0.3,
        }}
      />
      <div className="mb-5">
        <Typography
          variant="body1"
          color="white"
          className="opacity-80 pt-10 pb-3"
          fontFamily="Poppins"
        >
          Visit us at :
        </Typography>
        <div
          className="flex items-center justify-center pt-[-5px] z-10"
          style={{ color: "white", gap: "15px" }}
        >
          {socialMediaIcons}
        </div>
      </div>
    </Box>
  );
};
