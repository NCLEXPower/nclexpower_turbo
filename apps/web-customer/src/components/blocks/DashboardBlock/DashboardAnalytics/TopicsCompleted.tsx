import React from "react";
import { analytics } from "./DashboardMock";
import { Box, CircularProgress, Typography } from "@mui/material";
import Divider from "core-library/components/Divider/Divider";
import { useResolution } from "core-library/hooks";

export const TopicsCompleted = () => {
  const { isMobile } = useResolution();

  return (
    <Box sx={{ position: "relative", height: 180 }}>
      <Typography
        sx={{
          fontWeight: "bold",
          marginBottom: 8,
          color: "#00173F",
          fontFamily: "PT Sans Narrow",
          fontSize: "1.75rem",
          textAlign: "center",
        }}
      >
        Percent Topic Completed
      </Typography>

      {analytics.data.topicCompleted.map((topic, index) => {
        const isFirst = index === 0;
        const isSecond = index === 1;

        const top = !isMobile
          ? isFirst
            ? 40
            : isSecond
              ? 20
              : 50
          : isFirst
            ? 65
            : 50;

        const left = !isMobile
          ? isFirst
            ? 35
            : isSecond
              ? 15
              : 20
          : isFirst
            ? 35
            : 20;

        const progressSize = !isMobile
          ? isFirst
            ? 90
            : isSecond
              ? 130
              : 80
          : isFirst
            ? 50
            : 80;

        const labelTop = !isMobile
          ? isFirst
            ? "35%"
            : isSecond
              ? "40%"
              : "30%"
          : isFirst
            ? "17%"
            : "30%";

        const labelLeft = !isMobile
          ? isFirst
            ? "42%"
            : isSecond
              ? "72%"
              : "63%"
          : isFirst
            ? "26%"
            : "63%";

        const progressColor = index % 2 === 0 ? "#0F2A71" : "#181E2F";
        const dividerHeight = !isMobile ? "80px" : "60px";

        return (
          <Box
            sx={{
              position: "absolute",
              top,
              left,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={100}
                size={progressSize}
                thickness={5}
                sx={{
                  color: "#E6E6EC",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "butt",
                  },
                }}
              />
              <CircularProgress
                variant="determinate"
                value={topic.value}
                size={progressSize}
                thickness={5}
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: progressColor,
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "butt",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                top: labelTop,
                left: labelLeft,
              }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  my: 2,
                  mr: 2,
                  width: "4px",
                  height: dividerHeight,
                  backgroundColor: progressColor,
                }}
              />
              <Box sx={{ paddingTop: 2 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "rgba(59, 61, 83, 1)",
                    fontFamily: "PT Sans Narrow",
                    fontSize: "clamp(1rem, 0.7rem + 1.5vw, 2.5rem)",
                  }}
                >
                  {`${topic.value}%`}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginTop: 1,
                    display: "inline-block",
                    fontFamily: "PT Sans Narrow",
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)",
                    color: "#23232380",
                  }}
                >
                  {topic.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
