/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { SxProps } from "@mui/material";
import { BarChart as MuiBarChart } from "@mui/x-charts";
import { BarChartOptions } from "../Type";

interface BarchartProps {
  options: BarChartOptions;
  Height?: number;
  Width?: number;
  dataSet: { [key: string]: any }[];
  sx?: SxProps;
}

export const Barchart: React.FC<BarchartProps> = ({
  options,
  Height,
  Width,
  dataSet,
  sx,
}) => {
  return (
    <MuiBarChart
      dataset={dataSet}
      {...options}
      height={Height}
      width={Width}
      borderRadius={options.borderRadius}
      sx={sx}
    />
  );
};
