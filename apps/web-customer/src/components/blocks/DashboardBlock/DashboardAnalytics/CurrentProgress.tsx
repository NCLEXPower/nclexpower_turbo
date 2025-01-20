import React from "react";
import { Box, Typography } from "@mui/material";
import { currentProgress, analytics } from "./DashboardMock";
import { Chart } from "core-library/components";
import { useResolution } from "core-library/hooks";

const CurrentProgressOption = {
  colors: ["#0F2A71", "#E6E6EC"],
  startAngle: 0,
  endAngle: 360,
  innerRadius: "90%",
  outerRadius: "100%",
};

export const CurrentProgress = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      {currentProgress &&
        currentProgress.length > 0 &&
        currentProgress.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flexDirection: "column",
              px: 3,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                color: "#23232370",
              }}
            >
              <Typography sx={{ fontFamily: "PT Sans" }}>
                {item.programType}
              </Typography>
              <Typography sx={{ fontFamily: "PT Sans" }}>
                ({item.totalDays})
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 auto",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                  marginRight: isMobile ? 0 : 12,
                  marginY: isMobile ? 6 : 0
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    color: "#181E2F",
                    fontFamily: "PT Sans",
                    fontWeight: "bold",
                  }}
                >
                  Day
                </Typography>
                <Typography
                  sx={{
                    color: "#0F2A71",
                    fontFamily: "PT Sans",
                    lineHeight: 0.8,
                    fontSize: "clamp(8rem, 2.5vw, 9rem)",
                    fontWeight: "bold",
                  }}
                >
                  {item.currentDay}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    color: "#181E2F",
                    ml: 18,
                    fontFamily: "PT Sans Narrow",
                  }}
                >
                  {item.currentFocus}
                </Typography>
              </Box>
              <Chart
                type="Gauge"
                width={isMobile ? 200 : 275}
                height={isMobile ? 200 : 275}
                dataSet={analytics.data.currentProgressChart}
                options={CurrentProgressOption}
              />
            </Box>
          </Box>
        ))}
    </React.Fragment>
  );
};
