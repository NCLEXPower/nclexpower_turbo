import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "core-library";
import { DetectDevice, NCLEXBlueLogo } from "core-library/assets";
import { Button } from "core-library/components";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import {
  useAccountId,
  useDeviceNotRecognized,
} from "core-library/contexts/auth/hooks";
import { DeviceInfo, useApiCallback } from "core-library/hooks";
import { useDeviceId } from "core-library/hooks/useCookie";
import { EnrollDeviceType } from "core-library/types/types";
import Image from "next/image";
import React from "react";

interface Props {
  deviceInfo: DeviceInfo | null;
}

export const DeviceEnrollmentBlock: React.FC<Props> = ({ deviceInfo }) => {
  const enrollCb = useApiCallback(
    async (api, args: EnrollDeviceType) => await api.auth.enroll_device(args)
  );
  const [accountId] = useAccountId();
  const { loginFromSso, softLogout } = useAuthContext();
  const toast = useExecuteToast();
  const [, setDeviceId] = useDeviceId();
  const [, , clearDeviceNotRecognized] = useDeviceNotRecognized();

  const handleApprove = async () => {
    try {
      const obj = {
        accountId: accountId,
        deviceFingerprint: deviceInfo?.fingerprint,
        deviceName: deviceInfo?.deviceName,
        deviceType: deviceInfo?.deviceType,
        ipAddress: deviceInfo?.ipAddress,
      } as EnrollDeviceType;
      const result = await enrollCb.execute({ ...obj });
      if (result.status === 200) {
        setDeviceId(result.data.deviceId ?? null, {
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          domain: `.${window.location.hostname}`,
        });
        clearDeviceNotRecognized();
        toast.executeToast(
          `${deviceInfo?.deviceName} successfully enrolled`,
          "top-right",
          false,
          {
            type: "success",
          }
        );
        await loginFromSso();
      }
    } catch (e) {
      console.error(`Something went wrong`, e);
    }
  };
  const handleDecline = async () => await softLogout();

  return (
    <Box sx={{ width: "100dvw", height: "100dvh" }}>
      <Grid container sx={{ width: "100%", display: "flex", height: "100%" }}>
        <Grid
          lg={6}
          sm={12}
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingX: "80px",
            paddingTop: "80px",
          }}
        >
          <Image alt="Detect Device" src={DetectDevice} width={350} />
        </Grid>
        <Grid
          lg={6}
          sm={12}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            alignItems: "start",
            justifyContent: "center",
            paddingX: "25px",
          }}
        >
          <Image alt="NCLEX Logo" src={NCLEXBlueLogo} />
          <Box>
            <Typography variant="h5" fontWeight={600} color="#0d2b71">
              Do you want to enroll this device ?
            </Typography>
            <Typography fontWeight={600} color="GrayText">
              This device is currently not recognized by the application
            </Typography>
            <Typography fontSize="14px" fontWeight={600} color="GrayText">
              Device Information :
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={500}>
              Device type : {deviceInfo?.deviceType}
            </Typography>
            <Typography fontWeight={500}>
              Device name : {deviceInfo?.deviceName}
            </Typography>
            <Typography fontWeight={500}>
              Device IPAddress : {deviceInfo?.ipAddress}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="GrayText" fontWeight={600}>
              This device is unrecognized.
            </Typography>
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
                loading={enrollCb.loading}
                disabled={enrollCb.loading}
              >
                Yes
              </Button>
            </Grid>
            <Grid item lg={3} md={5} sm={3} xs={12}>
              <Button
                fullWidth
                onClick={handleDecline}
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  bgcolor: "red",
                  "&:hover": { bgcolor: "#bf0000" },
                }}
                loading={enrollCb.loading}
                disabled={enrollCb.loading}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
