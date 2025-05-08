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
import { useSensitiveInformation } from "core-library/hooks";
import { formatCustomerName } from "@/utils/formatHelper/formatCustomerName";
import { progressTaken } from "./DashboardAnalytics/DashboardMock";

export const Dashboard: React.FC = () => {
  const { customer } = useSensitiveInformation();
  const customerName = formatCustomerName(customer);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-dvw flex flex-col flex-wrap xl:grid xl:grid-cols-12 xl:auto-rows-auto xl:w-full gap-3 p-6 h-full lg:grid-flow-row xl:grid-flow-row-dense">
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

      {progressTaken.map((item, index) => (
        <div
          className={`${
            index === 0 ? "col-start-3" : "col-start-6"
          } col-span-3 row-span-2 row-start-2 bg-white rounded-lg overflow-hidden`}
          data-tour="step-6"
        >
          <TestsTaken
            key={item.programTitle}
            programTitle={item.programTitle}
            programSubtitleOne={item.programSubTitleOne}
            programDay={item.programDay}
            programSection={item.programSection}
            programSubtitleTwo={item.programSubtitleTwo}
          />
        </div>
      ))}

      <div
        className="col-span-4 row-span-2 col-start-9 row-start-2 rounded-lg w-full flex relative flex-wrap overflow-hidden "
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
        className="col-span-6 row-span-1 col-start-1 row-start-4 bg-white rounded-lg w-full"
        data-tour="step-5"
      >
        <CurrentProgress />
      </div>

      <div
        className="col-start-7 col-span-6 row-span-1 row-start-4 bg-white rounded-lg p-3 w-full"
        data-tour="step-8"
      >
        <TopicsCompleted />
      </div>

      <div
        className="col-span-6 row-span-4 col-start-1 row-start-6 row-end-9 bg-white rounded-lg p-6 w-full "
        data-tour="step-10"
      >
        <PerformanceIndicator />
      </div>

      <div
        className="col-span-6 row-span-2 col-start-7 row-start-6 bg-white rounded-lg p-6 w-full"
        data-tour="step-9"
      >
        <ComprehensiveAnalytics />
      </div>
      <div
        className="col-start-7 col-span-6 row-span-1 row-start-8 bg-white rounded-lg p-6 w-full"
        data-tour="step-11"
      >
        <AbilityAnalytics />
      </div>
    </div>
  );
};
