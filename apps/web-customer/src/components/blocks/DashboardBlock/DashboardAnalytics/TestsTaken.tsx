import { Typography } from "@mui/material"
import { progressTaken } from "./DashboardMock"
import { useResolution } from "core-library/hooks";

export const TestsTaken: React.FC = () => {
  const { isMobile } = useResolution();

  return (
    <div className="w-full flex rounded-lg overflow-hidden">
      {progressTaken.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col ${item.id === 1 ? "bg-darkBlue text-white" : "text-white bg-[#181E2F]"
            } w-1/2`}
        >
          <div className="py-2 px-4 font-semibold text-center">
            {item.programTitle}
          </div>
          <div className={`flex flex-col items-center justify-center flex-1 bg-white ${item.id === 1 ? "text-darkBlue" : "text-[#181E2F]"} pt-sans-bold`}>
            <p>{item.programSubTitle}</p>
            <Typography sx={{
              fontSize: isMobile ? "6rem" : "8rem",
              fontFamily: "PT Sans",
              fontWeight: "bold"
            }}>{item.programDay}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}