/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { SectionVideosType } from "core-library/types/wc/programList";
import ReactPlayer from "react-player";
import { useResolution } from "core-library/hooks";

interface VideoPlayerProps {
  isWideScreen: boolean;
  selectedVid: SectionVideosType | null;
  toggleWideScreen?: () => void;
  showTheaterMode?: boolean;
}

const playerDimensions = {
  wide: { width: "1050px", height: "588px" },
  tablet: { width: "900px", height: "450px" },
  mobile: { width: "100%", height: "225px" },
  default: { width: "700px", height: "386px" },
};

const getPlayerDimensions = (isWideScreen: boolean, isTablet: boolean, isMobile: boolean) => {
  if (isWideScreen) {
    return playerDimensions.wide;
  }
  if (isTablet) {
    return playerDimensions.tablet;
  }
  if (isMobile) {
    return playerDimensions.mobile;
  }
  return playerDimensions.default;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isWideScreen,
  selectedVid,
  toggleWideScreen,
  showTheaterMode = true,
}) => {

  const { isMobile, isTablet } = useResolution();

  const { width: playerWidth, height: playerHeight } = getPlayerDimensions(
    isWideScreen,
    isTablet,
    isMobile
  );

  return (
    <div
      className={`${isWideScreen ? "col-span-3" : "col-span-3 lg:col-span-2"} flex flex-col gap-4`}
    >
      {selectedVid ? (
        <>
          <div className="flex rounded-[10px] overflow-hidden">
            <ReactPlayer
              url={selectedVid.secVidUrl}
              controls={true}
              playsinline={true}
              pip={true}
              stopOnUnmount={false}
              width={playerWidth}
              height={playerHeight}
            />
          </div>
          {showTheaterMode && (
            <div className="hidden lg:flex items-center">
              <p
                onClick={toggleWideScreen}
                className="cursor-pointer font-ptSansNarrow text-[14px] text-black font-bold bg-white p-2 rounded-[10px]"
              >
                Theater Mode {""}
                <span className={isWideScreen ? "text-red-500" : "text-green-500"}>
                  {isWideScreen ? "OFF" : "ON"}
                </span>
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="font-ptSansNarrow">No video selected.</p>
        </div>
      )}
    </div>
  );
};
