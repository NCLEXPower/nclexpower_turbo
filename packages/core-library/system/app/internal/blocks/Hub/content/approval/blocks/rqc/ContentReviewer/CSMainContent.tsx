import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { BackgroundInfoContent } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfoContent";
import { ItemContent } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/ItemContent";

interface Props {
  mainContent: any;
}
export const CSMainContent: React.FC<Props> = ({ mainContent }) => {
  return (
    <Grid
      sx={{ mt: 3 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          BACKGROUND INFO :
        </Typography>
        <Box>
          <BackgroundInfoContent values={mainContent[0]} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" marginBottom="4px">
          ITEMS :
        </Typography>
        <Box>
          <ItemContent values={mainContent[0]} />
        </Box>
      </Grid>
    </Grid>
  );
};
