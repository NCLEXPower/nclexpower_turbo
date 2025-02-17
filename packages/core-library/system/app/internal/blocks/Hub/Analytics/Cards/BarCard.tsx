import { Box, Grid, Typography } from "@mui/material";
import { cardBox, gridItemSx } from "../AnalyticsStyles";
import { Chart } from "../../../../../../../components";
import { SalesBarChartOptions } from "../constants";
import { BarData } from "../types";
import { formatNumber } from "../utils";

interface BarCardProps {
  cardTitle: string;
  dataSet: BarData[];
  currency?: string;
}

export const BarCard: React.FC<BarCardProps> = ({
  cardTitle,
  dataSet,
  currency = "$",
}) => {
  return (
    <Grid item xs={12} sx={gridItemSx}>
      <Box
        sx={{
          ...cardBox,
          bgcolor: "#FFF",
          alignItems: "start",
        }}
      >
        <div className="flex flex-col gap-8 font-['Poppins']">
          <Typography
            sx={{ color: "#181E2F", fontWeight: "bold", fontSize: "32px" }}
          >
            {cardTitle}
          </Typography>
          <div className="flex gap-5 font-bold">
            <div>
              Country
              <ul className="mt-5 space-y-4">
                {dataSet &&
                  !!dataSet.length &&
                  dataSet.map((d, i) => (
                    <li key={i} className="pl-5">
                      <span className="text-[#9A9A9A] mr-4">{i + 1}.</span>
                      {d.country}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              Total Revenue
              <ul className="mt-5 space-y-4">
                {dataSet &&
                  !!dataSet.length &&
                  dataSet.map((d, i) => (
                    <li key={i} className="pl-5">
                      {currency}
                      {formatNumber(d.TotalRevenue)}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Chart
            type="Bar"
            dataSet={dataSet}
            height={500}
            options={SalesBarChartOptions}
          />
        </div>
      </Box>
    </Grid>
  );
};
