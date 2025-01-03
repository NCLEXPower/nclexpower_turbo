import { Chart, SelectField } from "core-library/components"
import React from "react"
import { analytics } from "./DashboardMock"
import { Box } from "@mui/material"
import { useResolution } from "core-library/hooks";
import { BarChartOptions } from "core-library/components/Charts/generic/charts/type";

const HorizontalBarOptions: BarChartOptions = {
  series: [
    { dataKey: "Current", label: "Current Value", color: "#0F2A71", },
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row" }}>
        <div className="flex items-center w-full lg:w-2/3 gap-6 flex-col lg:flex-row">
          <h1 className="text-[#232323] pt-sans-bold mt-5 text-2xl">
            Final/Comprehensive CAT
          </h1>
          <SelectField
            options={[]}
            placeholder="Patient Needs Categories (% Correct)"
            label="Patient Needs Categories (% Correct)"
            sx={{ width: 350 }}
            variant="standard"
          />
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Chart
          type="Bar"
          dataSet={analytics.data.comprehensiveData}
          width={isMobile ? 550 : 1000}
          height={isMobile ? 500 : 600}
          options={HorizontalBarOptions}
        />
      </Box>
    </React.Fragment>
  )
}