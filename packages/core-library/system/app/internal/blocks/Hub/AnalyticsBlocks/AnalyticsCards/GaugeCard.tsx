import { Box, Grid, Typography } from "@mui/material";
import {
  cardBox,
  gaugeSubTitle,
  gridItemSx,
  labelBox,
} from "../AnalyticsStyles";
import { Chart } from "../../../../../../../components";
import { CurrentProgressOption } from "../constants";

interface Props {
  cardFor: "sales" | "users";
  gaugeValue: number;
  gaugeColor: string;
  title: string;
  titleColor: string;
  label: {
    color: string;
    title: string;
    labelColor: string;
    sub?: string;
    value?: number;
  }[];
  span?: number;
}

export const GaugeCard: React.FC<Props> = ({
  cardFor,
  gaugeValue,
  gaugeColor,
  title,
  titleColor,
  label,
  span = 6,
}) => {
  return (
    <Grid item xs={span} sx={gridItemSx}>
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
              lineHeight: 1,
              width: cardFor === "sales" ? "100px" : "250px",
              color: titleColor || "",
            }}
          >
            {title}
          </Typography>

          <Box
            className="flex flex-col"
            sx={{ gap: cardFor === "users" ? "20px" : "" }}
          >
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
                  {l.value?.toLocaleString()}
                </Typography>
                {l.sub && (
                  <Typography
                    component="span"
                    sx={{
                      ...gaugeSubTitle,
                      color: l.labelColor,
                    }}
                  >
                    {l.sub}
                  </Typography>
                )}
              </div>
            ))}
          </Box>
        </div>
        <div className="w-[200px]">
          <Chart
            type="Gauge"
            width={200}
            height={200}
            dataSet={[
              {
                value: gaugeValue,
              },
            ]}
            options={{
              ...CurrentProgressOption,
              colors: [gaugeColor, "#E6E6EC"],
            }}
            sx={{ fontFamily: "PT Sans", fontWeight: "bold" }}
          />
        </div>
      </Box>
    </Grid>
  );
};
