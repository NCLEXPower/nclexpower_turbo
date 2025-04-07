import { Box, Stack, Typography } from "@mui/material";
import { CoreZigmaLogo, ArxeniusLogoBlue } from "core-library/assets";
import { useResolution } from "core-library/hooks";
import Image from "next/image";
import { useMemo } from "react";

export function NCLEXBanner() {
  const { isMobile } = useResolution();
  const yearData = new Date().getFullYear();
  const memoYear = useMemo(() => yearData, [yearData]);
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
          src={ArxeniusLogoBlue}
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
        © {memoYear} Arxenius. All Rights Reserved. Arxenius, the CORE-Zigma
        System and all logos and trademarks displayed are owned by Arxon
        Solutions, LLC.
      </Typography>
    </Box>
  );
}
