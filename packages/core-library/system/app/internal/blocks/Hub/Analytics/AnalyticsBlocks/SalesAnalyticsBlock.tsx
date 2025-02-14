import { Box, Grid } from "@mui/material";
import { TimePeriodCheckboxes } from "../Checkbox/TimePeriodCheckBox";
import { BarCard, GaugeCard, LineCard, RenderStatCards } from "../Cards";
import { contentBgColor, contentBox } from "../AnalyticsStyles";
import { useSalesData } from "../../../../../../../hooks/useSalesData";
import { SalesType } from "../types";
import { calculateGaugeData } from "../utils";

interface Props {
  salesType: SalesType;
  lineChart?: boolean;
}

export const SalesAnalyticsBlock: React.FC<Props> = ({
  salesType,
  lineChart = false,
}) => {
  const { data, handlePeriodChange, selectedPeriod, statCardsData } =
    useSalesData(salesType);

  return (
    <Box
      sx={{
        bgcolor: contentBgColor.sales,
        ...contentBox,
      }}
    >
      <TimePeriodCheckboxes
        selectedPeriod={selectedPeriod}
        handlePeriodChange={handlePeriodChange}
      />
      <Grid container>
        <RenderStatCards data={statCardsData} />

        {lineChart ? (
          <LineCard
            lineData={data.lineData}
            title="Products Durations"
            titleColor="#00173F"
            label={[
              {
                color: "#181E2F",
                title: "23 Days (Standard)",
                labelColor: "#6C6C6C",
              },
              {
                color: "#2A61AC",
                title: "8 Days (Fast Track)",
                labelColor: "#2A61AC",
              },
            ]}
          />
        ) : (
          <GaugeCard
            cardFor={"sales"}
            dataSet={calculateGaugeData(
              data.productDurations.fastTrack,
              data.productDurations.standard
            )}
            gaugeColors={["#181E2F", "#2A61AC"]}
            title="Products Durations"
            titleColor="#00173F"
            label={[
              {
                title: "23 Days (Standard)",
                color: "#181E2F",
                labelColor: "#6C6C6C",
              },
              {
                title: "8 Days (Fast Track)",
                color: "#2A61AC",
                labelColor: "#2A61ACB0",
              },
            ]}
          />
        )}

        <GaugeCard
          cardFor={"sales"}
          dataSet={calculateGaugeData(
            data.repeatSales.firstTime,
            data.repeatSales.repeated
          )}
          gaugeColors={["#074548", "#0C8087"]}
          title="Repeat Sales"
          titleColor="#085156"
          label={[
            {
              color: "#074548",
              title: "First Time",
              labelColor: "#074548",
            },
            {
              color: "#0C8087",
              title: "Repeated",
              labelColor: "#0C8087",
            },
          ]}
          span={lineChart ? 5 : 6}
        />

        <BarCard cardTitle="Demographic/Location" dataSet={data.barData} />
      </Grid>
    </Box>
  );
};
