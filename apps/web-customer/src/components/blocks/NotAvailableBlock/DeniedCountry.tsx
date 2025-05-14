import {
  CoreZigmaLogo,
  ArxeniusLogoYellow,
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
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        margin: 0,
        padding: 0,
        left: 0, 
        boxSizing: "border-box",
        }}
    >
    
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        zIndex: -1,
        backgroundColor: "#000", 
      }}>
        <Image
          src={NotAvailableBG}
          alt="CoreZigma"
          priority
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="max-w-2xl mx-auto py-8 flex flex-col items-center">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={CoreZigmaLogo}
            alt="CoreZigma"
            className="w-auto h-[70px] object-cover"
          />
          <Image
            src={ArxeniusLogoYellow}
            alt="ArxeniusLogoYellow"
            className="w-auto h-[30px] object-cover z-0"
          />
        </div>
        <div
          style={{
            width: "90%",
            height: "2px",
            backgroundColor: "grey",
            zIndex: 1,
            marginTop: "15px",
            marginBottom: "24px",
            opacity: 0.3,
          }}
        />
        <div className="mx-10">
          <Typography
            variant="h2"
            fontWeight={600}
            color="white"
            className="opacity-80 "
            fontFamily="Poppins"
            sx={{
              fontSize: "clamp(1rem, 5cqw, 2rem)",
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
              fontSize: "clamp(1.5rem, 5cqw, 3rem)",
            }}
          >
            Arxenius is currently
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(1.5rem, 5cqw, 3rem)",
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
            Thank you for your patience – we&apos;re looking forward to seeing
            you here very soon when we open our doors!
          </Typography>
        </div>
        <div className="flex w-[80%] max-w-3xl gap-2 flex-col justify-center sm:items-end sm:flex-row sm:gap-4 mt-6 sm:mb-6">
          <TextField
            control={control}
            name="email"
            placeholder="Email"
            sx={{
              borderRadius: "10px",
              flexGrow: 1,
              height: "56px",
              border: "2px solid #D9D9D9",
              fontSize: "1rem",
              "& .MuiInputBase-input": {
                color: "#D9D9D9",
              },
              "& .MuiInputBase-input:focus": {},
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
            sx={{
              color: "#0F2A71",
              backgroundColor: "#ffffff !important",
              borderRadius: "10px",
              fontFamily: "'Poppins'",
              fontSize: "1rem",
              fontWeight: "bold",
              minWidth: "180px",
              height: "56px",
              minHeight: "56px",
              maxHeight: "56px",
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
        <div
          style={{
            width: "90%",
            height: "2px",
            backgroundColor: "grey",
            zIndex: 1,
            marginTop: "15px",
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
      </div>
    </Box>
  );
};
