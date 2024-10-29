/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "core-library";
import { SectionVideosType } from "core-library/types/wc/programList";
import { VideoDetails } from "./VideoDetails";
import { VideoWatchList } from "./VideoWatchList";
import { VideoPlayer } from "./VideoPlayer";
import useGetProgramList from "core-library/hooks/useGetProgramList";

export function WatchVideosBlock() {
  const router = useRouter();
  const [sectionVideos, setSectionVideos] = useState<SectionVideosType[] | null>(null);
  const [selectedVid, setSelectedVid] = useState<SectionVideosType | null>(null);
  const [sectionMainTitle, setSectionMainTitle] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(false);
  const { programList } = useGetProgramList();
  const toggleWideScreen = () => setIsWideScreen((prev) => !prev);

  useEffect(() => {
    const { secVids, programId } = router.query;
    const fetchedProgramList = programList ?? [];

    if (secVids) {
      const decodedVideos = JSON.parse(decodeURIComponent(secVids as string));
      setSectionVideos(decodedVideos);
      if (decodedVideos.length > 0) {
        setSelectedVid(decodedVideos[0]);
      }
    }

    if (programId) {
      const programTitle = fetchedProgramList?.find((item) => item.id === programId)?.title || "Welcome to CORE Zigma System";
      setSectionMainTitle(programTitle);
    }
  }, [router.query]);

  const handleVideoSelect = (video: SectionVideosType) => setSelectedVid(video);

  const backToProgramList = () => router.back();

  return (
    <section className="flex h-auto w-full justify-center bg-[#e7eaf1]">
      <Box className="flex flex-col w-auto lg:w-[1045px] mt-[30px] lg:mt-[70px] mb-[40px] mx-4 gap-6">
        <div className="flex gap-2 items-center">
          <ArrowBackIosNewIcon fontSize="inherit" />
          <h4
            onClick={backToProgramList}
            className="font-ptSans text-mainBlue font-bold text-[16px] cursor-pointer hover:underline"
          >
            Go Back
          </h4>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 fade-In`}>
          <VideoPlayer
            isWideScreen={isWideScreen}
            selectedVid={selectedVid}
            toggleWideScreen={toggleWideScreen}
          />

          <VideoWatchList
            selectedVid={selectedVid}
            isWideScreen={isWideScreen}
            sectionMainTitle={sectionMainTitle}
            sectionVideos={sectionVideos}
            handleVideoSelect={handleVideoSelect}
          />

          <VideoDetails selectedVid={selectedVid} isWideScreen={isWideScreen} />
        </div>
      </Box>
    </section>
  );
}
