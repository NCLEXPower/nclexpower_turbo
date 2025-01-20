import React from "react";
import { Box, Typography } from "@mui/material";
import { currentProgress, analytics } from "./DashboardMock";
import { Chart, EvaIcon } from "core-library/components";
import { useResolution } from "core-library/hooks";
import { CoreZigmaLogo } from "core-library/assets";
import Image from "next/image";

const CurrentProgressOption = {
  colors: [
    "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
    "#E6E6EC",
  ],
  startAngle: 0,
  endAngle: 360,
  innerRadius: 75,
  outerRadius: 100,
};

export const CurrentProgress = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", py: isMobile ? 4 : 0 }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentProgress &&
            currentProgress.length > 0 &&
            currentProgress.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  pl: 5,
                  width: "100%",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    color: "#181E2F",
                    fontFamily: "Rajdhani",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Day {item.currentDay}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(15, 42, 113, 1)",
                    fontFamily: "Rajdhani",
                    lineHeight: 0.8,
                    fontSize: isMobile ? "2rem" : "clamp(1.7rem, 2.2vw, 3rem)",
                    fontWeight: "bold",
                    zIndex: 100,

                    maxWidth: "100%",
                    width: "fit-content",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Progress Percentage
                </Typography>
                <EvaIcon
                  name="trending-up-outline"
                  width={200}
                  height={200}
                  fill="rgba(15, 42, 113, 0.18)"
                  className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full "
                />
              </Box>
            ))}
        </Box>

        <Box sx={{ width: "50%" }}>
          <Chart
            type="Gauge"
            width={isMobile ? 200 : 275}
            height={isMobile ? 200 : 275}
            dataSet={analytics.data.currentProgressChart}
            options={CurrentProgressOption}
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export const CurrentProgress2 = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <Box>
          <Image
            src={CoreZigmaLogo}
            alt="logo"
            style={{
              backgroundColor: "rgba(231, 234, 241, 1)",
              borderRadius: "100%",
              position: "absolute",
              left: -20,
              top: -10,
            }}
            height={60}
            width={80}
          />
        </Box>
        <Box
          sx={{
            height: "90%",
            display: "flex",
            backgroundColor: "white",
            marginTop: 9,
          }}
        >
          {currentProgress &&
            currentProgress.length > 0 &&
            currentProgress.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  px: 2,
                  paddingRight: isMobile ? 12 : 5,
                  width: "100%",
                  gap: 3,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      color: "#181E2F",
                      fontFamily: "Rajdhani",
                      fontWeight: "bold",
                      maxWidth: "100%",
                      width: "fit-content",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",

                      pr: 12,
                    }}
                  >
                    DAY
                  </Typography>

                  <Typography
                    sx={{
                      background:
                        "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "Rajdhani",

                      lineHeight: 0.8,
                      fontSize: "clamp(5.5rem, 7vw, 9rem)",
                      fontWeight: "bold",

                      maxWidth: "100%",
                      width: "fit-content",

                      whiteSpace: "normal",
                    }}
                  >
                    {item.currentDay}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)",
                      color: "#181E2F",
                      ml: 18,
                      fontFamily: "PT Sans Narrow",
                      fontWeight: "bold",
                      maxWidth: "100%",
                      width: "fit-content",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.currentFocus}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",

                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "PT Sans Narrow",
                      maxWidth: "100%",
                      width: "fit-content",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                      fontWeight: "bold",
                      color: "rgba(154, 154, 154, 1)",
                    }}
                  >
                    {item.programType}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "PT Sans",
                      fontWeight: "bold",
                      color: "rgba(154, 154, 154, 1)",
                    }}
                  >
                    ({item.totalDays})
                  </Typography>

                  <EvaIcon
                    name="calendar-outline"
                    width={120}
                    height={120}
                    fill="rgba(15, 42, 113, 0.18)"
                    className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-0 w-full "
                  />
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};
