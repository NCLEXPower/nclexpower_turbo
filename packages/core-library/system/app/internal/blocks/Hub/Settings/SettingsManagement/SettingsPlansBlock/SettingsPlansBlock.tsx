import { Box, SxProps, Typography } from "@mui/material";
import {
  blockSx,
  boxHeaderSx,
  sectionSx,
  subtitleSx,
  titleSx,
} from "../SettingsStyles";
import { Button } from "../../../../../../../../components";
import React from "react";
import { SubscriptionPlanBlock } from "./SubscriptionPlanBlock";
import { BillingHistoryBlock } from "./BillingHistoryBlock";
import { LatestPaymentBlock } from "./LatestPaymentBlock";

interface SettingsPlansBlockProps {
  title: string;
  subtitle: string;
}

export const SettingsPlansBlock: React.FC<SettingsPlansBlockProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box component="section" sx={sectionSx}>
      <Box className="flex flex-col mb-8">
        <Typography variant="h3" sx={titleSx}>
          {title}
        </Typography>
        <Typography sx={subtitleSx}>{subtitle}</Typography>
      </Box>
      <Box className="flex flex-col gap-10">
        <SubscriptionPlanBlock />
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <LatestPaymentBlock />
          <BillingHistoryBlock />
        </Box>
      </Box>
    </Box>
  );
};