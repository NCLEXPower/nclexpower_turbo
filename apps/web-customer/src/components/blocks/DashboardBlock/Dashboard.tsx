import { Box, Typography } from "@mui/material";
import {
  CurrentProgress,
  TopicsCompleted,
  PerformanceIndicator,
  ComprehensiveAnalytics,
  AbilityAnalytics,
  TestsTaken,
  CaseStudyAnalytics,
  FinalStudyAnalytics
} from "./DashboardAnalytics";

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-auto gap-3 p-6 h-full">
      <div className="col-span-4 row-span-4 bg-white rounded-lg p-6 w-full">
        <CurrentProgress />
      </div>
      <div className="col-span-4 col-start-5 w-full">
        <Box sx={{
          backgroundColor: "#0F2A71",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
        }}>
          <Typography sx={{
            color: "#f3f3f3",
            fontSize: "1.5rem",
            fontFamily: "PT Sans",
            fontWeight: "bold"
          }}>
            Numbers of Tests Taken
          </Typography>
        </Box>
      </div>
      <div className="col-span-4 row-span-3 col-start-5 row-start-2 bg-white rounded-lg w-full ">
        <TestsTaken />
      </div>
      <div className="col-span-4 row-span-2 col-start-9  w-full">
        <CaseStudyAnalytics />
      </div>
      <div className="col-span-4 row-span-2 col-start-9 row-start-3  w-full">
        <FinalStudyAnalytics />
      </div>
      <div className="col-span-3 row-span-4 row-start-5 bg-white rounded-lg p-6  w-full">
        <TopicsCompleted />
      </div>
      <div className="col-span-9 row-span-4 col-start-4 row-start-5 bg-white p-6  w-full">
        <PerformanceIndicator />
      </div>
      <div className="col-span-8 row-span-4 row-start-9 bg-white rounded-lg p-6  w-full">
        <ComprehensiveAnalytics />
      </div>
      <div className="col-span-4 row-span-4 col-start-9 row-start-9 bg-white rounded-lg p-6  w-full">
        <AbilityAnalytics />
      </div>
    </div>
  )
};