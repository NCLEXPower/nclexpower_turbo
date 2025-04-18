/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SxProps } from "@mui/material";
import { LineChart as MuiLineChart } from "@mui/x-charts";
import { LineChartOptions } from "./type";

interface LineChartProps {
  options: LineChartOptions;
  height?: number;
  width?: number;
  dataSet: { [key: string]: any }[];
  sx?: SxProps;
}

export const LineChart: React.FC<LineChartProps> = ({
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
