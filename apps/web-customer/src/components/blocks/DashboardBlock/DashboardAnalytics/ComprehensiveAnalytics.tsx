import { Chart, SelectField } from "core-library/components";
import React from "react";
import { analytics } from "./DashboardMock";
import { Box } from "@mui/material";
import { useResolution } from "core-library/hooks";
import { BarChartOptions } from "core-library/components/Charts/generic/charts/type";

const HorizontalBarOptions: BarChartOptions = {
  series: [
    { dataKey: "Current", label: "Current Value", color: "#0F2A71" },
    { dataKey: "Target", label: "Target Value", color: "#181E2F" },
  ],
  xAxis: [{ scaleType: "linear", label: "No. Items", min: 0 }],
  yAxis: [
    {
      scaleType: "band",
      dataKey: "label",
    },
  ],
  layout: "horizontal",
  grid: { horizontal: true, vertical: false },
  borderRadius: 4,
};

export const ComprehensiveAnalytics = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
        }}
      >
        <div className="flex items-start w-full lg:w-2/3 flex-col ">
          <h1 className="text-[#232323] pt-sans-bold mt-5 text-2xl">
            Final/Comprehensive CAT
          </h1>
          <Box sx={{ width: "100%" }}>
            <SelectField
              options={[]}
              placeholder="Patient Needs Categories (% Correct)"
              label="Patient Needs Categories (% Correct)"
              sx={{ width: "100%" }}
              variant="standard"
            />
          </Box>
        </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center my-6 lg:items-end lg:justify-end">
          <SelectField
            options={[]}
            placeholder="Test"
            label="Test #1"
            sx={{ width: 150 }}
            variant="filled"
          />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          pt: 5,
        }}
      >
        <Chart
          type="Bar"
          dataSet={analytics.data.comprehensiveData}
          width={isMobile ? 550 : 450}
          height={isMobile ? 500 : 750}
          options={HorizontalBarOptions}
          sx={{ width: "100%" }}
        />
      </Box>
    </React.Fragment>
  );
};
