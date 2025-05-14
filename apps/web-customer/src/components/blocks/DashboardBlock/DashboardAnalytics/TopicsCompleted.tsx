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
import { getLayoutConfig } from "@/utils/getLayoutConfig";
import { ProgressRing } from "core-library/components";

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
        const config = getLayoutConfig(isMobile, index);

        return (
          <Box
            key={topic.label}
            sx={{
              position: "absolute",
              top: config.top,
              left: config.left,
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
                size={config.progressSize}
                color={config.progressColor}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                top: config.labelTop,
                left: config.labelLeft,
              }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  my: 2,
                  mr: 2,
                  width: "4px",
                  height: config.dividerHeight,
                  backgroundColor: config.progressColor,
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
