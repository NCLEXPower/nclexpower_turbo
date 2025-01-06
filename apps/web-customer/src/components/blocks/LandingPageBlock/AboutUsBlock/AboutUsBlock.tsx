import React from 'react'
import {
  AboutUsHeroBlock,
  OurHistoryBlock,
  MeetOurTeamBlock,
  FAQBlock,
} from "./index";
import { Stack } from '@mui/material';

export const AboutUsBlock = () => {
  return (
    <Stack>
      <AboutUsHeroBlock/>
      <OurHistoryBlock/>
      <FAQBlock/>
      <MeetOurTeamBlock/>
    </Stack>
  )
}
