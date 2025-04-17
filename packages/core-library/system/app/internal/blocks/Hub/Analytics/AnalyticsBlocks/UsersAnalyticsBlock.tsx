import { Box, Grid } from "@mui/material";
import { TimePeriodCheckboxes } from "../Checkbox/TimePeriodCheckBox";
import { contentBgColor, contentBox } from "../AnalyticsStyles";
import { useUsersAnalyticsData } from "../../../../../../../hooks/useUsersAnalyticsData";
import { GaugeCard, RenderStatCards } from "../Cards";
import { calculateGaugeData } from "../utils";

export const UsersAnalyticsBlock = () => {
  const { data, handlePeriodChange, selectedPeriod, statsCardData } =
    useUsersAnalyticsData();

  return (
    <Box
      sx={{
        bgcolor: contentBgColor.users,
        ...contentBox,
      }}
    >
      <TimePeriodCheckboxes
        selectedPeriod={selectedPeriod}
        handlePeriodChange={handlePeriodChange}
      />
      <Grid container>
        <RenderStatCards data={statsCardData} />
        <GaugeCard
          cardFor="users"
          dataSet={calculateGaugeData(
            data.RNStandardUsers,
            data.RNFastTrackUsers
          )}
          gaugeColors={["#181E2F", "#2A61AC"]}
          title="Registered Nurse Users"
          titleColor="#00173F"
          label={[
            {
              color: "#181E2F",
              labelColor: "#6C6C6C",
              title: "Total Count: ",
              value: data.RNStandardUsers,
              sub: "23 Days (Standard)",
            },
            {
              color: "#2A61AC",
              labelColor: "#2A61AC",
              title: "Total Count: ",
              value: data.RNFastTrackUsers,
              sub: "8 Days (Fast Track)",
            },
          ]}
        />

        <GaugeCard
          cardFor="users"
          dataSet={calculateGaugeData(
            data.PNStandardUsers,
            data.PNFastTrackUsers
          )}
          gaugeColors={["#074548", "#0C8087"]}
          title="Practical Nurse Users"
          titleColor="#0C8087"
          label={[
            {
              color: "#074548",
              labelColor: "#6C6C6C",
              title: "Total Count: ",
              value: data.PNStandardUsers,
              sub: "23 Days (Standard)",
            },
            {
              color: "#0C8087",
              labelColor: "#0C8087",
              title: "Total Count: ",
              value: data.PNFastTrackUsers,
              sub: "8 Days (Fast Track)",
            },
          ]}
        />
      </Grid>
    </Box>
  );
};
