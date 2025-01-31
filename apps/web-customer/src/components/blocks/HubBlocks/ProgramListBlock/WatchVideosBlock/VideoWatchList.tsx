/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { SectionVideosType } from "core-library/types/wc/programList";
import Image from "next/image";

interface VideoWatchListProps {
  isWideScreen: boolean;
  sectionMainTitle: string;
  sectionVideos: SectionVideosType[] | null;
  selectedVid: SectionVideosType | null;
  handleVideoSelect: (video: SectionVideosType) => void;
}

export const VideoWatchList: React.FC<VideoWatchListProps> = ({
  isWideScreen,
  sectionMainTitle,
  sectionVideos,
  selectedVid,
  handleVideoSelect,
}) => {
  return (
    <div
      className={`${isWideScreen ? "col-span-3 lg:col-span-1 order-2" : "col-span-3 lg:col-span-1 order-1"} flex flex-col w-full lg:w-auto`}
    >
      <h4 className="font-ptSans text-black text-[20px] lg:text-[22px] font-bold">
        {sectionMainTitle}
      </h4>
      <p className="font-ptSans text-[#232323] text-[16px] lg:text-[18px] font-bold my-2">
        Watchlist
      </p>
      <div className="flex flex-col gap-2">
      {sectionVideos && sectionVideos.length > 0 ? (
        sectionVideos.map((item) => {
          const {
            secVidId,
            secVidTitle,
            secVidPlaceholder,
            secVidDuration,
            secVidAuthor,
          } = item;
          const isSelected = selectedVid?.secVidId === secVidId;
          return (
            <div
              key={secVidId}
              className={`transition duration-300 ease-in-out ${isSelected ? "bg-[#D9D9D9]" : "bg-transparent hover:bg-[#D9D9D9]"} p-2 rounded-[8px] flex gap-4 cursor-pointer w-auto`}
              onClick={() => handleVideoSelect(item)}
            >
              <Image
                src={secVidPlaceholder}
                alt="placeholder"
                className="w-[150px] rounded-[8px] drop-shadow-lg"
              />
              <div className="flex flex-col">
                <h4 className="font-ptSans text-[#232323] font-bold text-[14px]">
                  {secVidTitle}
                </h4>
                {secVidDuration && (
                  <h4 className="font-ptSans text-[#9A9A9A] text-[14px]">
                    {secVidDuration} minutes
                  </h4>
                )}
                <h4 className="font-ptSans text-[#9A9A9A] text-[14px]">
                  Author: {secVidAuthor}
                </h4>
              </div>
            </div>
          );
        })
      ) : (
        <div className="font-ptSansNarrow text-center text-gray-500">No available videos</div>
      )}
      </div>
    </div>
  );
};
