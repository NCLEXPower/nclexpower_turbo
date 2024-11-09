/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Gauge } from "@mui/x-charts";
import { GaugeChartOptions, getGaugeStyles } from "../Type";
import { SxProps } from "@mui/material";

interface GaugeChartRendererProps {
  dataSet: { [key: string]: any }[];
  width: number;
  height: number;
  options: GaugeChartOptions;
  sx?: SxProps;
}

export const Gaugechart: React.FC<GaugeChartRendererProps> = ({
  dataSet,
  width,
  height,
  options,
  sx,
}) => {
  const percentage = dataSet[0]?.value ?? 0;

  return (
    <Gauge
      value={percentage}
      sx={(theme) => ({
        ...sx,
        ...getGaugeStyles(options, theme),
      })}
      text={({ value, valueMax }) => {
        const validValue = value ?? 0;
        const validMax = valueMax ?? 1;
        return validMax > 0
          ? `${((validValue / validMax) * 100).toFixed(0)}%`
          : "0%";
      }}
      width={width}
      height={height}
      {...options}
    />
  );
};
