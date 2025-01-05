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
}

export const CaseStudyAnalytics = () => {
  const { isMobile } = useResolution();

  return (
    <React.Fragment>
      {caseStudyData
        && caseStudyData.length > 0
        && caseStudyData.map((item, index) => (
          <Box key={index} sx={{ backgroundColor: "#0F2A71", borderRadius: 2, p: 6 }}>
            <Box sx={containerStyle}
            >
              <Typography sx={{
                fontSize: isMobile ? "6rem" : "7rem",
                fontFamily: "PT Sans",
                fontWeight: "bold"
              }}>
                {item.totalDays}
              </Typography>
              <Typography sx={{
                fontSize: "1.25rem",
                fontFamily: "PT Sans",
                fontWeight: "bold"
              }}>
                {item.programType}
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
      {finalData
        && finalData.length > 0
        && finalData.map((item, index) => (
          <Box key={index} sx={{ backgroundColor: "#181E2F", borderRadius: 2, p: 6 }}>
            <Box sx={containerStyle}>
              <Typography sx={{
                fontSize: isMobile ? "6rem" : "7rem",
                fontFamily: "PT Sans",
                fontWeight: "bold"
              }}>
                {item.totalDays}
              </Typography>
              <Typography sx={{
                fontSize: "1.25rem",
                fontFamily: "PT Sans",
                fontWeight: "bold"
              }}>
                {item.programType}
              </Typography>
            </Box>
          </Box>
        ))}
    </React.Fragment>
  );
};
