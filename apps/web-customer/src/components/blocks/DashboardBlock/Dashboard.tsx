import { Box, Typography } from "@mui/material";
import {
  CurrentProgress,
  TopicsCompleted,
  PerformanceIndicator,
  ComprehensiveAnalytics,
  AbilityAnalytics,
  TestsTaken,
  CaseStudyAnalytics,
  FinalStudyAnalytics,
  CurrentProgress2,
} from "./DashboardAnalytics";
import { userData } from "./DashboardAnalytics/DashboardMock";
import { useSensitiveInformation } from "core-library/hooks";
import { formatCustomerName } from "@/utils/formatHelper/formatCustomerName";
import { HubTourSteps } from "./hubTourSteps";
import { useTourContext } from "core-library/contexts";

export const Dashboard: React.FC = () => {
  const { customer } = useSensitiveInformation();
  const { startTour } = useTourContext();

  const customerName = formatCustomerName(customer);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-dvw flex flex-col flex-wrap xl:grid xl:grid-cols-12 xl:auto-rows-auto xl:w-full gap-3 p-6 h-full lg:grid-flow-row xl:grid-flow-row-dense">
      <button onClick={() => startTour(HubTourSteps)}>START TOUR</button>
      <div className="col-span-12 col-start-3">
        <Typography
          sx={{
            fontFamily: "Rajdhani",
            fontSize: "clamp(2rem, 3vw, 3rem)",
            color: "#232323",
            fontWeight: "bold",
          }}
        >
          WELCOME ! {customerName} |
          <span className="text-[25px]"> {formattedDate}</span>
        </Typography>
      </div>

      <div
        className="col-span-2 row-span-3 col-start-1 row-start-1 bg-darkBlue rounded-lg w-full"
        data-tour="step-4"
      >
        <CurrentProgress2 />
      </div>

      <div
        className="col-span-4 row-span-2 col-start-3 row-start-2 bg-white rounded-lg w-full"
        data-tour="step-5"
      >
        <CurrentProgress />
      </div>

      <div
        className="col-span-3 row-span-2 col-start-7 row-start-2 bg-white rounded-lg w-full"
        data-tour="step-6"
      >
        <TestsTaken />
      </div>

      <div
        className="col-span-5 row-span-2 col-start-10 row-start-2 bg-darkBlue rounded-lg w-full flex relative flex-wrap "
        data-tour="step-7"
      >
        <CaseStudyAnalytics />
        <FinalStudyAnalytics />
        <Box
          sx={{
            position: "absolute",
            width: "2px",
            height: "50%",
            bgcolor: "darkblue",
            right: "50%",
            top: "29%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "12px",
              height: "12px",
              bgcolor: "white",
              border: "2px solid darkblue",
              borderRadius: "50%",
            }}
          />
        </Box>
      </div>
      <div
        className="col-span-3 row-span-4 row-start-5 bg-white rounded-lg p-6 w-full"
        data-tour="step-8"
      >
        <TopicsCompleted />
      </div>
      <div
        className="col-span-5 row-span-4 col-start-4 row-start-5 bg-white p-6 w-full"
        data-tour="step-9"
      >
        <ComprehensiveAnalytics />
      </div>
      <div
        className="col-span-8 row-span-4 row-start-9 bg-white rounded-lg p-6 w-full"
        data-tour="step-11"
      >
        <AbilityAnalytics />
      </div>
      <div
        className="col-span-6 row-span-4 col-start-9 row-start-5 row-end-9 bg-white rounded-lg p-6 w-full "
        data-tour="step-10"
      >
        <PerformanceIndicator />
      </div>
    </div>
  );
};
