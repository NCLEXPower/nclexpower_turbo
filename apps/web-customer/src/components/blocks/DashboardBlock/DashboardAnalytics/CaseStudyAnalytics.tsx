import React from "react";
import { caseStudyData, finalData } from "./DashboardMock";
import { Typography, Box } from "@mui/material";
import { useResolution } from "core-library/hooks";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  color: "white",
  flexDirection: "column",
  width: "100%",
};

export const CaseStudyAnalytics = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      {caseStudyData &&
        caseStudyData.length > 0 &&
        caseStudyData.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              pt: 10,
              height: "90%",
              width: "50%",
            }}
          >
            <Box sx={containerStyle}>
              <Typography
                sx={{
                  fontSize: isMobile ? "1.2rem" : "clamp(1rem, 1.3vw, 1.4rem)",
                  fontFamily: "PT Sans Narrow",
                  fontWeight: "bold",
                  color: "rgba(0, 23, 63, 1)",
                }}
              >
                {item.programType}
              </Typography>
              <Typography
                sx={{
                  fontSize: "clamp(5rem, 5vw, 6rem)",
                  fontFamily: "Rajdhani",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.totalDays}
              </Typography>
            </Box>
          </Box>
        ))}
    </React.Fragment>
  );
};

export const FinalStudyAnalytics = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      {finalData &&
        finalData.length > 0 &&
        finalData.map((item, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: 2,
              pt: 10,
              mb: 6,
              height: "90%",
              width: "50%",
              backgroundColor: "white",
            }}
          >
            <Box sx={containerStyle}>
              <Typography
                sx={{
                  fontSize: isMobile ? "1.2rem" : "clamp(1rem, 1.3vw, 1.4rem)",
                  fontFamily: "PT Sans Narrow",
                  fontWeight: "bold",
                  maxWidth: "100%",
                  width: "fit-content",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                  color: "rgba(0, 23, 63, 1)",
                }}
              >
                {item.programType}
              </Typography>
              <Typography
                sx={{
                  fontSize: "clamp(5rem, 5vw, 6rem)",
                  fontFamily: "Rajdhani",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(360deg, hsla(224, 32%, 14%, 1) 26%, hsla(223, 77%, 25%, 1) 49%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.totalDays}
              </Typography>
            </Box>
          </Box>
        ))}
    </React.Fragment>
  );
};
