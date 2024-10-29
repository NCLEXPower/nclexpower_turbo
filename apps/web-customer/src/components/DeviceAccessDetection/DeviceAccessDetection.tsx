import { Box, Grid, Typography } from "@mui/material";
import { DetectDevice, NCLEXBlueLogo } from "core-library/assets";
import { Button, Checkbox } from "core-library/components";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  model: string;
  location: string;
}

export const DeviceDetectionDialog = () =>
// details:Props //Uncomment this in actual implementation
{
  const details: Props = {
    model: "IPhone 15 Pro Max",
    location: "Angeles, Pampanga",
  };

  const [isGranted, setIsGrant] = useState<boolean>(false);
  const handleApprove = () => {
    console.log("Approve", "isGranted : ", isGranted);
  };
  const handleDecline = () => {
    console.log("Declined", "isGranted : ", isGranted);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center md:flex-col lg:flex-row">
      <div className="w-full hidden md:flex  items-center justify-center px-20 pt-20">
        <Image alt="Detect Device" src={DetectDevice} width={400} className="hidden md:flex" />
      </div>
      <div className="w-full flex flex-col gap-2 h-full items-start justify-center px-6 ">
        <Image alt="NCLEX Logo" src={NCLEXBlueLogo} />
        <Box>
          <Typography variant="h5" fontWeight={600} color="#0d2b71">
            Device Transfer Notice
          </Typography>
          <Typography fontWeight={600} color="GrayText">
            Someone is trying to access your account
          </Typography>
          <Typography fontSize="14px" fontWeight={600} color="GrayText">
            Device Information :
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {details.model}
          </Typography>
          <Typography fontWeight={500}>
            Location : {details.location}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" color="GrayText" fontWeight={600}>
            This device is trying to access your account.
          </Typography>
          <Typography
            variant="subtitle1"
            color="GrayText"
            width="70%"
            fontSize="14px"
            lineHeight="20px"
          >
            Note: Approving a new device request will log out your current
            primary device. Please confirm if you wish to proceed.
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="start">
            <Checkbox onChange={(e) => setIsGrant(e.target.checked)} />
            <Typography marginLeft="-20px">
              Grant this&nbsp;
              <Typography component="span" fontWeight={500}>
                {details.model}
              </Typography>
              &nbsp;as primary device
            </Typography>
          </Box>
        </Box>
        <Grid container gap={2} sx={{ paddingY: "15px" }}>
          <Grid item lg={3} md={5} sm={3} xs={12}>
            <Button
              onClick={() => handleApprove()}
              fullWidth
              sx={{
                display: "flex",
                flexGrow: 1,
                padding: "10px",
                borderRadius: "10px",
                bgcolor: "green",
                "&:hover": { bgcolor: "#006000" },
              }}
            >
              Approve
            </Button>
          </Grid>
          <Grid item lg={3} md={5} sm={3} xs={12}>
            <Button
              fullWidth
              onClick={() => handleDecline()}
              sx={{
                display: "flex",
                flexGrow: 1,
                padding: "10px",
                borderRadius: "10px",
                bgcolor: "red",
                "&:hover": { bgcolor: "#bf0000" },
              }}
            >
              Decline
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
