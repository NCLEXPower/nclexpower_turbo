import React, { useEffect } from "react";
import { Card } from "core-library/components";
import { Box, Typography } from "@mui/material";
import { NCLEXBanner, SignOutButton, ProceedButton } from "./components";
import Divider from "core-library/components/Divider/Divider";
import { usePageLoaderContext } from "core-library/contexts";
import { BasicInformationLoader } from "core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader";
import { usePaymentWalkthroughFormContext } from "../../PaymentWalkthroughContext";

interface Props {
  nextStep({}): void;
  next: () => void;
}

const infoStyle = {
  fontFamily: "PT Sans",
  fontWeight: "bold",
  color: "#0F2A71",
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
};

const dataStyle = {
  fontFamily: "PT Sans Narrow",
  color: "#030303",
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
};

export const BasicInformation: React.FC<Props> = ({ nextStep, next }) => {
  const { basicInformation, loading } = usePaymentWalkthroughFormContext();

  const middleName =
    basicInformation?.middlename === null
      ? "N/A"
      : basicInformation?.middlename;

  if (loading) {
    return <BasicInformationLoader />;
  }

  const handleProceed = () => {
    next();
    nextStep("ProductInformation");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="w-full p-2 lg:w-[800px] lg:p-0 ">
        <div className="my-2 lg:my-0">
          <SignOutButton />
        </div>
        <Box sx={{ width: "100%" }}>
          <h1 className="pt-sans-bold md:text-3xl text-2xl lg:text-4xl text-[#0F2A71] mb-4">
            Contact Information
          </h1>
          <Card sx={{ padding: 5, width: "100%" }} elevation={4}>
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontFamily: "PT Sans",
                  fontWeight: "bold",
                  color: "#0F2A71",
                  marginBottom: 4,
                  fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                }}
              >
                Basic Information
              </Typography>
              <Divider color="#0F2A71/50%" thickness={3} />
              <Box className="w-full flex items-center justify-between mt-4">
                <Typography sx={infoStyle}>First Name&#58; </Typography>
                <Typography sx={infoStyle}>Middle Initial&#58; </Typography>
                <Typography sx={infoStyle}>Last Name&#58; </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography sx={dataStyle}>
                  {basicInformation?.firstname}{" "}
                </Typography>
                <Typography sx={dataStyle}>{middleName}</Typography>
                <Typography sx={dataStyle}>
                  {basicInformation?.lastname}
                </Typography>
              </Box>
              <Box className="flex items-start justify-start flex-col pt-sans-narrow-regular my-4">
                <Typography sx={infoStyle}>Email&#58;</Typography>
                <Typography sx={dataStyle}>
                  {basicInformation?.email}
                </Typography>
              </Box>
              <Divider color="#0F2A71/50%" thickness={3} />
            </Box>
          </Card>
          <ProceedButton onClick={handleProceed} />
        </Box>
      </div>
      <NCLEXBanner />
    </Box>
  );
};
