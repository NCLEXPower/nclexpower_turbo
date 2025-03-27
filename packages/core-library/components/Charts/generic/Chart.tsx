/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import {
  BarChartOptions,
  ChartOptions,
  GaugeChartOptions,
  LineChartOptions,
} from "./charts/type";
import { BarChart, GaugeChart, LineChart } from "./charts";
import { SxProps } from "@mui/material";

interface ChartOption {
  type: "Bar" | "Line" | "Gauge";
  dataSet: { [key: string]: any }[];
  width?: number;
  height?: number;
  options: ChartOptions;
  sx?: SxProps;
}

export const Chart: React.FC<ChartOption> = ({
  type,
  dataSet,
  width = 800,
  height = 400,
  options,
  sx,
}) => {
  switch (type) {
    case "Bar":
      return (
        <BarChart
          dataSet={dataSet}
          Width={width}
          Height={height}
          options={options as BarChartOptions}
          sx={sx}
        />
      );
    case "Line":
      return (
        <LineChart
          dataSet={dataSet}
          width={width}
          height={height}
          options={options as LineChartOptions}
          sx={sx}
        />
      );
    case "Gauge":
      return (
        <GaugeChart
          dataSet={dataSet}
          width={width}
          height={height}
          options={options as GaugeChartOptions}
          sx={sx}
        />
      );
    default:
      return <div>No chart type selected</div>;
  }
};
