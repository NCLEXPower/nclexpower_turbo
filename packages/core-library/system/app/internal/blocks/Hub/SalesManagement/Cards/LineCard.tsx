import { Box, Grid, Typography } from "@mui/material";
import { cardBox, gridItemSx, labelBox } from "../AnalyticsStyles";
import { Chart } from "../../../../../../../components";
import { SaleLinChartOptions } from "../constants";
import { LineData } from "../types";

interface Props {
  lineData: LineData[];
  title: string;
  titleColor: string;
  label: {
    color: string;
    title: string;
    labelColor: string;
  }[];
}

export const LineCard: React.FC<Props> = ({
  lineData,
  title,
  titleColor,
  label,
}) => {
  return (
    <Grid item xs={7} sx={gridItemSx}>
      <Box
        sx={{
          ...cardBox,
          bgcolor: "#E6EAF2",
        }}
      >
        <div className="flex flex-col justify-between h-[200px]">
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              width: "100px",
              lineHeight: 1,
              color: titleColor || "",
            }}
          >
            {title}
          </Typography>

          <Box className="flex flex-col">
            {label.map((l, i) => (
              <div key={i} className="flex items-start gap-2 relative w-fit">
                <Box
                  sx={{
                    ...labelBox,
                    bgcolor: l.color,
                  }}
                />

                <Typography
                  sx={{
                    color: l.labelColor,
                    fontWeight: "bold",
                  }}
                >
                  {l.title}
                </Typography>
              </div>
            ))}
          </Box>
        </div>
        <div className="w-[350px]">
          <Chart
            type="Line"
            dataSet={lineData}
            width={350}
            height={200}
            options={SaleLinChartOptions}
            sx={{ bgcolor: "#FFF" }}
          />
        </div>
      </Box>
    </Grid>
  );
};
