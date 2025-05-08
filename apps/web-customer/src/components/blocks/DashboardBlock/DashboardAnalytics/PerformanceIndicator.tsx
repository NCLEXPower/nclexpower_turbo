import { Chart, SelectField } from "core-library/components";
import React from "react";
import { analytics } from "./DashboardMock";
import { Box, Typography } from "@mui/material";
import { useResolution } from "core-library/hooks";
import { BarChartOptions } from "core-library/components/Charts/generic/charts/type";

const BarOptions: BarChartOptions = {
  series: [
    { dataKey: "Daily", label: "Daily", color: "#0F2A71" },
    { dataKey: "Section", label: "Section", color: "#181E2F" },
  ],
  xAxis: [{ scaleType: "band", dataKey: "country" }],
  yAxis: [{ scaleType: "linear", min: 0 }],
  grid: { horizontal: true },
  layout: "vertical",
  borderRadius: 4,
};

export const PerformanceIndicator = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "PT Sans",
              fontWeight: "bold",
              marginBottom: 2,
              color: "#232323",
              fontSize: "1.5rem",
            }}
          >
            Performance Indicator
          </Typography>
          <Box sx={{ width: "70%" }}>
            <SelectField
              options={[]}
              placeholder="Body Systems (% Correct)"
              label="Body Systems (% Correct)"
              sx={{ width: "100%", my: 4 }}
              variant="standard"
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: !isMobile ? 10 : 0,
        }}
      >
        <Chart
          type="Bar"
          dataSet={analytics.data.performanceData}
          options={BarOptions}
          width={isMobile ? 500 : 550}
          height={isMobile ? 450 : 1000}
          sx={{
            width: "100%",
          }}
        />
      </Box>
    </React.Fragment>
  );
};
