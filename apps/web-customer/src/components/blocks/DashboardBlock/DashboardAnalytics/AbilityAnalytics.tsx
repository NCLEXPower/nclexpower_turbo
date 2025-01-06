import { Chart } from "core-library/components"
import React from "react"
import { analytics } from "./DashboardMock"
import { Box } from "@mui/material"
import { useResolution } from "core-library/hooks"
import { LineChartOptions } from "core-library/components/Charts/generic/charts/type"

const LineOptions: LineChartOptions = {
  series: [
    { dataKey: "theta", label: "Theta (Θ)", color: "#0F2A71" },
  ],
  xAxis: [
    { scaleType: "linear", dataKey: "catTaken", label: "Total No. CAT Taken" },
  ],
  yAxis: [
    { scaleType: "linear", label: "Theta (Θ)", min: -4, max: 4 },
  ],
  grid: { horizontal: true, vertical: true },
};

export const AbilityAnalytics = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 className="text-[#04081470] pt-sans-bold mt-5 text-xl">
          Ability Estimate (θ) Consistency
        </h1>
      </Box>
      <Box>
        <Chart
          type="Line"
          dataSet={analytics.data.thetaData}
          options={LineOptions}
          width={isMobile ? 550 : 500}
          height={isMobile ? 500 : 600}
        />
      </Box>
    </React.Fragment>
  )
}