import { Theme } from "@mui/material/styles";
import {
  BarChartProps as MuiBarChartProps,
  LineChartProps,
  GaugeProps,
  gaugeClasses,
} from "@mui/x-charts";

export interface BarChartOptions extends MuiBarChartProps {
  series: MuiBarChartProps["series"];
  xAxis?: MuiBarChartProps["xAxis"];
  yAxis?: MuiBarChartProps["yAxis"];
  grid?: MuiBarChartProps["grid"];
  layout?: MuiBarChartProps["layout"];
}
export interface LineChartOptions extends Omit<LineChartProps, "MaxRevenue"> {}

export interface GaugeChartOptions extends GaugeProps {
  colors?: string[];
  startAngle?: GaugeProps["startAngle"];
  endAngle?: GaugeProps["endAngle"];
  innerRadius?: GaugeProps["innerRadius"];
  outerRadius?: GaugeProps["outerRadius"];
}

export const useGaugeStyles = (options: GaugeChartOptions, theme: Theme) => {
  const totalValue = options.endAngle
    ? options.endAngle - (options.startAngle ?? 0)
    : 100;
  const primaryColor = options.colors?.[0] ?? "#4caf50";
  const secondaryColor = options.colors?.[1] ?? "#f44336";
  const backgroundColor = options.colors?.[2] ?? "#e0e0e0";

  return {
    [`& .${gaugeClasses.valueArc}`]: {
      fill: primaryColor,
    },
    [`& .${gaugeClasses.referenceArc}`]: {
      fill: secondaryColor,
    },
    [`& .${gaugeClasses.root}`]: {
      background: `conic-gradient(${primaryColor} ${totalValue}%, ${secondaryColor} ${totalValue}%, ${backgroundColor} ${100 - totalValue}%)`,
      borderRadius: "50%",
    },
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 50,
      transform: "translate(0px, 0px)",
    },
  };
};

export type ChartOptions =
  | BarChartOptions
  | LineChartOptions
  | GaugeChartOptions;
