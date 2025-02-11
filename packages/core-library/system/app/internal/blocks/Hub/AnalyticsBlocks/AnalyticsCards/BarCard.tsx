import { Box, Grid, Typography } from "@mui/material";
import { Demographic } from "../../types";
import { cardBox, gridItemSx } from "../AnalyticsStyles";
import { BarOptions, formatNumber } from "../constants";
import { Chart } from "../../../../../../../components";

interface BarCardProps {
  cardTitle: string;
  demographic: Demographic[];
  currency?: string;
}

export const BarCard: React.FC<BarCardProps> = ({
  cardTitle,
  demographic,
  currency = "$",
}) => {
  return (
    <Grid item xs={12} sx={gridItemSx}>
      <Box
        sx={{
          ...cardBox,
          bgcolor: "#FFF",
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
                {demographic &&
                  !!demographic.length &&
                  demographic.map((d, i) => (
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
                {demographic &&
                  !!demographic.length &&
                  demographic.map((d, i) => (
                    <li key={i} className="pl-5">
                      {currency}
                      {formatNumber(d.totalRevenue)}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Chart
            type="Bar"
            dataSet={demographic}
            height={500}
            options={BarOptions}
          />
        </div>
      </Box>
    </Grid>
  );
};
