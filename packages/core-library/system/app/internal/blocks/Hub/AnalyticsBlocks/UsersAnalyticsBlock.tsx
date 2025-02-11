import { Box, Grid, Typography } from "@mui/material";
import { UsersAnalyticsData } from "../types";
import { Checkbox } from "../../../../../../components";
import { useState } from "react";
import { StatCard } from "./AnalyticsCards/StatCard";
import { GaugeCard } from "./AnalyticsCards/GaugeCard";

interface Props {
  data: UsersAnalyticsData;
}

export const UsersAnalyticsBlock: React.FC<Props> = ({ data }) => {
  const { RNUsers, PNUsers } = data;
  const [selectedPeriod, setSelectedPeriod] = useState<string>("All");

  const handleCheckboxChange = (label: string) => {
    setSelectedPeriod(label);
  };

  const totalRNUsers = RNUsers.fastTrack + RNUsers.standard;
  const totalPNUsers = PNUsers.fastTrack + PNUsers.standard;
  const totalUsers = totalRNUsers + totalPNUsers;

  return (
    <Box
      sx={{
        bgcolor: "#0C808730",
        padding: "40px 20px",
        borderRadius: "0 15px 15px 15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginLeft: "30px",
            marginRight: "10px",
          }}
        >
          Time Period:
        </Typography>
        {["All", "Today", "Weekly", "Monthly", "YTD"].map((label) => (
          <Checkbox
            key={label}
            label={label}
            checked={selectedPeriod === label}
            onChange={() => handleCheckboxChange(label)}
          />
        ))}
      </Box>
      <Grid container>
        <StatCard
          title="Total Users"
          value={totalUsers}
          bgColor="linear-gradient(135deg, #0F2A71 0%, #1D50D7 100%)"
        />
        <StatCard
          title="Total RN Users"
          value={totalRNUsers}
          bgColor="linear-gradient(120deg, #2A61AC 25%, #112746 100%)"
        />
        <StatCard
          title="Total PN Users"
          value={totalPNUsers}
          bgColor="linear-gradient(120deg, #0C8087 25%, #031F21 100%)"
        />

        <GaugeCard
          cardFor="users"
          gaugeValue={RNUsers.gaugeValue}
          gaugeColor="#2A61AC"
          title="Registered Nurse Users"
          titleColor="#00173F"
          label={[
            {
              color: "#181E2F",
              labelColor: "#6C6C6C",
              title: "Total Count: ",
              value: RNUsers.standard,
              sub: "23 Days (Standard)",
            },
            {
              color: "#2A61AC",
              labelColor: "#2A61AC",
              title: "Total Count: ",
              value: RNUsers.fastTrack,
              sub: "8 Days (Fast Track)",
            },
          ]}
        />
        <GaugeCard
          cardFor="users"
          gaugeValue={PNUsers.gaugeValue}
          gaugeColor="#0C8087"
          title="Practical Nurse Users"
          titleColor="#0C8087"
          label={[
            {
              color: "#074548",
              labelColor: "#074548",
              title: "Total Count: ",
              value: PNUsers.standard,
              sub: "23 Days (Standard)",
            },
            {
              color: "#0C8087",
              labelColor: "#0C8087",
              title: "Total Count: ",
              value: PNUsers.fastTrack,
              sub: "8 Days (Fast Track)",
            },
          ]}
        />
      </Grid>
    </Box>
  );
};
