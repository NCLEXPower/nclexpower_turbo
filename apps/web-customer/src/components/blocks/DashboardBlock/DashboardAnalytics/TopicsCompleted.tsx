import React from "react";
import { analytics } from "./DashboardMock";
import { Box, CircularProgress, Typography } from "@mui/material";
import Divider from "core-library/components/Divider/Divider";

export const TopicsCompleted = () => {
  return (
    <Box>
      <Typography sx={{
        fontWeight: "bold",
        marginBottom: 2,
        color: "#04081470",
        fontFamily: "PT Sans",
        fontSize: "1.3rem"
      }}>
        Percent Topic Completed
      </Typography>
      {analytics.data.topics.map((topic, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            marginY: 6,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={topic.percentage}
              size={200}
              thickness={5}
              sx={{
                color: index % 2 === 0 ? "#0F2A71" : "#181E2F",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.primary"
                sx={{ fontSize: 18, fontWeight: "bold" }}
              >
                {`${topic.percentage}%`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginLeft: 2, width: "100%", marginY: 4 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#181E2F",
                fontFamily: "PT Sans",
                fontSize: "1.5rem"
              }}
            >
              {`${topic.percentage}%`}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                marginTop: 1,
                display: "inline-block",
                fontFamily: "PT Sans",
                fontSize: "1.3rem",
                color: "#23232380"
              }}
            >
              {topic.name}
              <Divider sx={{
                my: 2,
                width: "100%",
                backgroundColor: index % 2 === 0
                  ? "#0F2A71"
                  : "#181E2F",
                height: "4px"
              }}
              />
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};