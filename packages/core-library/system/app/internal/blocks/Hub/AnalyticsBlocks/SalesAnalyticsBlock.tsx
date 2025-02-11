import { Box, Grid, Typography } from "@mui/material";
import { SalesAnalyticsData } from "../types";
import { Checkbox } from "../../../../../../components";
import { useState } from "react";
import { StatCard } from "./AnalyticsCards/StatCard";
import { GaugeCard } from "./AnalyticsCards/GaugeCard";
import { BarCard } from "./AnalyticsCards/BarCard";
import { LineCard } from "./AnalyticsCards/LineCard";

interface Props {
  data: SalesAnalyticsData;
  dataFor: "All" | "RN" | "PN";
}

export const SalesAnalyticsBlock: React.FC<Props> = ({ data, dataFor }) => {
  const { currency, RNData, PNData } = data;
  const [selectedPeriod, setSelectedPeriod] = useState<string>("All");

  const handleCheckboxChange = (label: string) => {
    setSelectedPeriod(label);
  };

  const RNTotalSales = RNData.demographic.reduce(
    (total, curr) => total + curr.totalRevenue,
    0
  );
  const PNTotalSales = PNData.demographic.reduce(
    (total, curr) => total + curr.totalRevenue,
    0
  );

  const totalProductSales = RNTotalSales + PNTotalSales;

  const duration =
    dataFor === "All"
      ? data.RNData.productsDurations + data.PNData.productsDurations
      : data[`${dataFor}Data`].productsDurations;

  const repeat =
    dataFor === "All"
      ? data.RNData.salesRepeat + data.PNData.salesRepeat
      : data[`${dataFor}Data`].salesRepeat;

  const demographics =
    dataFor === "All"
      ? [...RNData.demographic, ...PNData.demographic]
      : [...data[`${dataFor}Data`].demographic];

  const allDemographic = Array.from(
    demographics.reduce(
      (map, { country, totalRevenue }) =>
        map.set(country, (map.get(country) || 0) + totalRevenue),
      new Map()
    ),
    ([country, totalRevenue]) => ({ country, totalRevenue })
  );

  return (
    <Box
      sx={{
        bgcolor: "#2A61AC2B",
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
          title="Products Total Sales"
          value={totalProductSales}
          bgColor="linear-gradient(135deg, #0F2A71 0%, #1D50D7 100%)"
          currency={currency}
        />
        <StatCard
          title="RN Total Sales"
          value={RNTotalSales}
          bgColor="linear-gradient(120deg, #2A61AC 25%, #112746 100%)"
          currency={currency}
        />
        <StatCard
          title="PN Total Sales"
          value={PNTotalSales}
          bgColor="linear-gradient(120deg, #0C8087 25%, #031F21 100%)"
          currency={currency}
        />

        {dataFor === "All" ? (
          <LineCard
            lineData={duration}
            title="Products Durations"
            titleColor="#00173F"
            label={[
              {
                color: "#181E2F",
                title: "23 Days (Standard)",
                labelColor: "#6C6C6C",
              },
              {
                color: "#2A61AC",
                title: "8 Days (Fast Track)",
                labelColor: "#2A61AC",
              },
            ]}
          />
        ) : (
          <GaugeCard
            cardFor="sales"
            gaugeValue={duration}
            gaugeColor="#2A61AC"
            title="Products Durations"
            titleColor="#00173F"
            label={[
              {
                color: "#181E2F",
                title: "23 Days (Standard)",
                labelColor: "#6C6C6C",
              },
              {
                color: "#2A61AC",
                title: "8 Days (Fast Track)",
                labelColor: "#2A61AC",
              },
            ]}
          />
        )}
        <GaugeCard
          cardFor="sales"
          gaugeValue={repeat}
          gaugeColor="#0C8087"
          title="Repeat Sales"
          titleColor="#085156"
          label={[
            {
              color: "#074548",
              title: "First Time",
              labelColor: "#074548",
            },
            {
              color: "#0C8087",
              title: "Repeated",
              labelColor: "#0C8087",
            },
          ]}
          span={dataFor === "All" ? 5 : 6}
        />

        <BarCard
          cardTitle="Demographic/Location"
          demographic={allDemographic}
        />
      </Grid>
    </Box>
  );
};
