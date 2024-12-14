import React from "react";
import {
  AboutUsHeroBlock,
  OurHistoryBlock,
  MeetOurTeamBlock,
  FAQBlock,
} from "./index";
import { Stack } from "@mui/material";
import { ScrollTopIcon } from "core-library/components";

export const AboutUsBlock = () => {
  return (
    <Stack>
      <AboutUsHeroBlock />
      <OurHistoryBlock />
      <FAQBlock />
      <MeetOurTeamBlock />
      <ScrollTopIcon />
    </Stack>
  );
};
