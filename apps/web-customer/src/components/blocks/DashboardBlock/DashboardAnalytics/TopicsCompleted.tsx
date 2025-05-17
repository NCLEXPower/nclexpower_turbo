/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import { analytics } from "./DashboardMock";
import { Box, Typography } from "@mui/material";
import Divider from "core-library/components/Divider/Divider";
import { useResolution } from "core-library/hooks";
import { ProgressRing } from "core-library/components";
import { getLayoutConfig } from "./LayoutConfig";

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
        const {
          top,
          left,
          size: progressSize,
          labelTop,
          labelLeft,
        } = getLayoutConfig(isMobile, index);

        const progressColor = index % 2 === 0 ? "#0F2A71" : "#181E2F";
        const dividerHeight = isMobile ? "60px" : "80px";

        return (
          <Box
            key={topic.label}
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
              <ProgressRing
                value={topic.value}
                size={progressSize}
                color={progressColor}
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
