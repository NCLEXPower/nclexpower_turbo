/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Stack, Typography } from "@mui/material";
import {
  CoreZigmaLogo,
  DuplicateSession,
  NCLEXBlueLogo,
} from "../../../../../assets";
import Image from "next/image";
import { useResolution } from "../../../../../hooks";
export function DuplicateSessionBlock() {
  const { isMobile } = useResolution();

  const BorderLine = () => (
    <hr
      style={{
        height: "2px",
        width: "80%",
        borderColor: "#0F2A71",
        backgroundColor: "#0F2A71",
        border: "none",
      }}
    />
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: "40px", lg: "0px" },
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BorderLine />
        <Typography
          className="font-ptSans"
          sx={{
            fontSize: { xs: "20px", sm: "25px", md: "38px" },
            fontWeight: "bold",
            color: "#0F2A71",
            textAlign: "center",
          }}
        >
          Duplicate Session Detected!
        </Typography>
        <Image
          src={DuplicateSession}
          width={isMobile ? 220 : 426}
          height={isMobile ? 150 : 338}
          alt="Duplicate Session Image"
        />

        <Box
          sx={{
            width: { xs: "100%", sm: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            paddingX: { xs: "24px", md: "0px" },
          }}
        >
          <Box>
            <Typography
              className="font-ptSans"
              sx={{
                fontSize: { xs: "18px", sm: "20px", md: "22px" },
                fontWeight: "bold",
                color: "#0F2A71",
              }}
            >
              How did this happen?
            </Typography>
            <Typography
              className="font-ptSansNarrow"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                fontWeight: "normal",
                color: "#0F2A71",
                mt: 1,
              }}
            >
              A "Duplicate Session" occurs when a user opens up multiple web
              browser windows or tabs simultaneously, as the system identifies
              multiple active sessions for a single user.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              className="font-ptSans"
              sx={{
                fontSize: { xs: "18px", sm: "20px", md: "22px" },
                fontWeight: "bold",
                color: "#0F2A71",
              }}
            >
              How to avoid this?
            </Typography>
            <Typography
              className="font-ptSansNarrow"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                fontWeight: "normal",
                color: "#0F2A71",
                mt: 1,
              }}
            >
              Maintain one tab in a browser when accessing contents from NCLEX
              Power.
            </Typography>
          </Box>
        </Box>
        <BorderLine />
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Image
            src={CoreZigmaLogo}
            width={isMobile ? 32 : 52}
            height={isMobile ? 32 : 52}
            alt="Core Zigma Logo"
          />
          <Image
            src={NCLEXBlueLogo}
            width={isMobile ? 120 : 180}
            height={isMobile ? 40 : 40}
            alt="NCLEX Blue Logo"
          />
        </Stack>

        <hr
          style={{
            height: "1px",
            width: "80%",
            borderColor: "#6D7081",
            backgroundColor: "#6D7081",
            border: "none",
          }}
        />

        <Typography
          className="font-ptSansNarrow"
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#6D7081",
            marginTop: "10px",
          }}
        >
          © 2024 NCLEX POWER. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
