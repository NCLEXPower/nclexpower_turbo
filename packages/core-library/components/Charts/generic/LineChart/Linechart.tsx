/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SxProps } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts";
import { LineChartOptions } from "../Type";

interface LineChartProps {
  options: LineChartOptions;
  height?: number;
  width?: number;
  dataSet: { [key: string]: any }[];
  sx?: SxProps;
}

export const Linechart: React.FC<LineChartProps> = ({
  options,
  height,
  width,
  dataSet,
  sx,
}) => {
  return (
    <MuiLineChart
      dataset={dataSet}
      {...options}
      height={height}
      width={width}
      sx={sx}
    />
  );
};
