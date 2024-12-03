import { Box, Stack, Typography } from "@mui/material";
import { CoreZigmaLogo, NCLEXBlueLogo } from "core-library/assets";
import { useResolution } from "core-library/hooks";
import Image from "next/image";

export function NCLEXBanner() {
  const { isMobile } = useResolution();
  return (
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
  )
}