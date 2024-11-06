/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as React from "react";
import { Box, SxProps } from "@mui/material";
import {
  BarChart,
  LineChart,
  Gauge,
  gaugeClasses,
  BarChartProps,
  AxisConfig,
} from "@mui/x-charts";

type ChartOptions = {
  colors?: string[];
  maxRevenue?: number;

  xAxisTitle?: string;
  yAxisTitle?: string;
  yAxisMin?: number;
  yAxisMax?: number;
  xDataKey?: string;
  yDataKey?: string;
  valueFormatter?: (value: number | null) => string;
  grid?: BarChartProps["grid"];
  scaleType?: AxisConfig["scaleType"];
  borderRadius?: number;

  lineSeries?: Array<{
    dataKey: string;
    label: string;
    color: string;
  }>;
  gaugeSegments?: Array<{ label: string; value: number }>;
  gaugeTotal?: number;
  gaugeCenterLabel?: string;

  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

interface DynamicChartProps {
  type: "Bar" | "Line" | "Gauge" | string;
  width?: number;
  height?: number;
  dataSet: any;
  options?: ChartOptions;
  sx?: SxProps;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({
  type,
  width = 500,
  height = 300,
  dataSet,
  options = {},
  sx,
}) => {
  const processDataForBarChart = (
    data: any[],
    yDataKey: string,
    maxRevenue: number
  ) => {
    return data.map((item) => ({
      ...item,
      revenuePercentage: (item[yDataKey] / maxRevenue) * 100,
    }));
  };

  switch (type) {
    case "Bar":
      const barData = processDataForBarChart(
        dataSet,
        options.yDataKey ?? "TotalSales",
        options.maxRevenue ?? 100000
      );

      return (
        <BarChart
          dataset={barData}
          height={height}
          width={width}
          xAxis={[
            {
              scaleType: options.scaleType ?? "band",
              dataKey: options.xDataKey,
              label: options.xAxisTitle,
            },
          ]}
          yAxis={[
            {
              scaleType: options.scaleType ?? "linear",
              dataKey: options.yDataKey ?? "revenuePercentage",
              label: options.yAxisTitle,
              min: options.yAxisMin ?? 0,
              max: options.yAxisMax ?? 100,
              valueFormatter:
                options.valueFormatter ||
                ((value: number) => `${value.toFixed(1)}%`),
            },
          ]}
          series={[
            {
              dataKey: "revenuePercentage",
              label: options.yAxisTitle ?? "Total Sales Percentage ",
              color: options.colors ? options.colors[0] : "#0F2A71",
              valueFormatter:
                options.valueFormatter ??
                ((value: number | null) =>
                  value !== null ? `${value}%` : "0%"),
            },
          ]}
          sx={sx}
          grid={options.grid ?? { horizontal: true }}
          borderRadius={options.borderRadius}
        />
      );

    case "Line":
      return (
        <LineChart
          dataset={dataSet}
          width={width}
          height={height}
          xAxis={[
            {
              scaleType: options.scaleType ?? "band",
              dataKey: options.xDataKey,
              label: options.xAxisTitle,
            },
          ]}
          yAxis={[
            {
              scaleType: options.scaleType ?? "linear",
              label: options.yAxisTitle,
              min: options.yAxisMin ?? 0,
              max: options.yAxisMax ?? 100000,
              valueFormatter: (value: number) =>
                `$${(value / 1000).toFixed(0)}k`,
            },
          ]}
          series={(options.lineSeries || []).map((series) => ({
            dataKey: series.dataKey,
            ...(series.label && { label: series.label }),
            ...(series.color && { color: series.color }),
          }))}
          grid={options.grid ?? { horizontal: true }}
          sx={sx}
        />
      );
    case "Gauge": {
      const totalValue =
        options.gaugeSegments?.reduce(
          (sum, segment) => sum + (segment.value ?? 0),
          0
        ) || 0;
      const gaugeTotal = options.gaugeTotal ?? 100;
      const percentage = Math.round((totalValue / gaugeTotal) * 100);

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Gauge
            value={percentage}
            startAngle={options.startAngle ?? 0}
            endAngle={options.endAngle ?? 360}
            innerRadius={options.innerRadius ?? "80%"}
            outerRadius={options.outerRadius ?? "100%"}
            sx={(theme) => ({
              ...sx,

              [`& .${gaugeClasses.valueArc}`]: {
                fill: options.colors?.[0] ?? "#4caf50",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: options.colors?.[1] ?? "#f44336",
              },
              [`& .${gaugeClasses.root}`]: {
                background: `conic-gradient(${options.colors?.[0] ?? "#4caf50"} ${totalValue}%, ${options.colors?.[1] ?? "#f44336"} ${totalValue}%, ${options.colors?.[2] ?? "#e0e0e0"} ${100 - totalValue}%)`,
                borderRadius: "50%",
              },
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 50,
                transform: "translate(0px, 0px)",
              },
            })}
            text={({ value, valueMax }) => {
              const validValue = value ?? 0;
              const validMax = valueMax ?? 1;
              return validMax > 0 ? `${(validValue / validMax) * 100}%` : "0%";
            }}
            width={width}
            height={height}
          />
        </Box>
      );
    }
    default:
      return <div>No chart type selected</div>;
  }
};
