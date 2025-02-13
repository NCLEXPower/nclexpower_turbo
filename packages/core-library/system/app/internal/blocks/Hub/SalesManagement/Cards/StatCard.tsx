import { Box, Grid, Typography } from "@mui/material";
import { cardBox, gridItemSx } from "../AnalyticsStyles";
import { formatNumber } from "../constants";

type RenderStatCardsProps = {
  data: StatCardProps[];
};

export const RenderStatCards: React.FC<RenderStatCardsProps> = ({ data }) => {
  return (
    <>
      {data &&
        !!data.length &&
        data.map((d, i) => (
          <StatCard
            key={i}
            title={d.title}
            value={d.value}
            bgColor={d.bgColor}
            currency={d.currency}
          />
        ))}
    </>
  );
};

type StatCardProps = {
  title: string;
  value: number;
  currency?: string;
  bgColor?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  currency,
  bgColor,
}) => {
  return (
    <Grid item xs={4} sx={gridItemSx}>
      <Box
        sx={{
          ...cardBox,
          width: "100%",
          height: "150px",
          background: bgColor ?? "",
          color: "#FFF",
        }}
      >
        <Typography
          sx={{ display: "flex", flexDirection: "column", fontSize: "28px" }}
        >
          {title.match(/Fast Track|\S+/g)?.map((line, i) => (
            <span key={i} className="font-bold leading-6">
              {line}
            </span>
          ))}
        </Typography>
        <Typography sx={{ fontWeight: "bolder", fontSize: "40px" }}>
          {currency}
          {currency ? formatNumber(value) : value.toLocaleString()}
        </Typography>
      </Box>
    </Grid>
  );
};
