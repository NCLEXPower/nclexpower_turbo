/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as React from "react";
import Box from "@mui/material/Box";
import { CloseIcon } from "core-library/assets";
import Image from "next/image";
import {
  SectionDataType,
  SectionListType,
  SectionVideosType,
} from "core-library/types/wc/programList";
import { getSectionTypeIcons, getSectionStatusIcons } from "../../../../utils";
import { useRouter } from "core-library";
import { ContentCardsModal } from "./ContentCardsModal/ContentCardsModal";
import { useModal } from "core-library/hooks";
import {
  getVideoPagePath,
  getVideoSectionStatus,
  isVideoSectionType,
  separateSectionType,
} from "./ProgramListBlockUtils";
import { Link } from "core-library/components";

interface Props {
  title: string;
  closeModal: () => void;
  sections: SectionListType[];
  programId: string;
}

export const ProgramGridContent: React.FC<Props> = ({
  title,
  sections,
  closeModal,
  programId,
}) => {
  const { videoSections, otherSections } = separateSectionType(sections);

  const secVidDetails = !!videoSections?.length
    ? {
        secVidTitle: videoSections[0]?.sectionTitle ?? "",
        secVidIcon: getSectionTypeIcons(videoSections[0]?.sectionType ?? ""),
        secVidStatusIcon: getSectionStatusIcons(
          getVideoSectionStatus(videoSections)
        ),
      }
    : null;
  const { open, close, props } = useModal<SectionDataType[]>();

  const router = useRouter();

  const lastPathSegment = router.asPath.split("/").filter(Boolean).pop() ?? "";

  const handleShowContentCards = (sectionData: SectionDataType[]) => {
    if (sectionData && sectionData.length && !isVideoSectionType(sectionData)) {
      open(sectionData);
    }
  };

  const handleNonVideoStatusChange = (sectionId: string) => {
    // call api and update status
  };

  const handleShowVideos = (
    sectionList: SectionVideosType[],
    programId: string
  ) => {
    router.push(getVideoPagePath(sectionList, programId, lastPathSegment));
  };

  return (
    <div className="h-full w-full">
      <ContentCardsModal
        open={props.isOpen}
        onClose={close}
        data={props.context || []}
      />
      <Box className="absolute top-0 left-0 h-full w-full">
        <div className="flex justify-between items-center w-full bg-gradient-to-r from-mainBlue to-[#181E2F] px-4 py-2">
          <h4 className="font-bold font-ptSansNarrow text-[20px] text-white">
            {title}
          </h4>
          <Image
            src={CloseIcon}
            alt="Close"
            width={16}
            height={16}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col w-full h-auto px-6 lg:px-8 py-2 gap-4">
          <div className="flex justify-between w-full">
            <h4 className="font-ptSansNarrow text-black font-regular text-[16px]">
              Section
            </h4>
            <h4 className="font-ptSansNarrow text-black font-regular text-[16px]">
              Status
            </h4>
          </div>
          {!sections?.length ? (
            <div className="text-center text-gray-500">
              No available sections
            </div>
          ) : (
            <>
              {secVidDetails && (
                <div className="flex justify-between px-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={secVidDetails.secVidIcon}
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <h4
                      onClick={() =>
                        handleShowVideos(
                          videoSections
                            .map((s) => s.sectionData as SectionVideosType[])
                            .flat(),
                          programId
                        )
                      }
                      className="font-ptSansNarrow font-regular text-[16px] text-[#6C6C6C] hover:underline cursor-pointer"
                    >
                      {secVidDetails.secVidTitle}
                    </h4>
                  </div>
                  <Image
                    src={getSectionStatusIcons(status)}
                    alt="status"
                    width={16}
                    height={16}
                  />
                </div>
              )}
              {otherSections &&
                !!otherSections.length &&
                otherSections.map((item) => {
                  const {
                    sectionId,
                    sectionType,
                    sectionTitle,
                    sectionStatus,
                    sectionData,
                  } = item;

                  const isDocumentOrMedCards =
                    sectionType === "document" || sectionType === "med-cards";

                  const hasData = sectionData && sectionData.length > 0;

                  const isNonVideoSection =
                    hasData && !isVideoSectionType(sectionData);

                  const sectionLink =
                    isNonVideoSection && sectionData[0].link
                      ? sectionData[0].link
                      : "";

                  return (
                    <div key={sectionId} className="flex justify-between px-2">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={getSectionTypeIcons(sectionType)}
                          alt={sectionType}
                          width={16}
                          height={16}
                        />
                        {isDocumentOrMedCards && isNonVideoSection ? (
                          <Link
                            href={sectionLink}
                            target="_blank"
                            naked
                            className="font-ptSansNarrow font-regular text-[16px] text-[#6C6C6C] hover:underline cursor-pointer"
                            onClick={() =>
                              handleNonVideoStatusChange(sectionId)
                            }
                          >
                            {sectionTitle}
                          </Link>
                        ) : (
                          <h4
                            onClick={() =>
                              isNonVideoSection &&
                              handleShowContentCards(sectionData)
                            }
                            className="font-ptSansNarrow font-regular text-[16px] text-[#6C6C6C] hover:underline cursor-pointer"
                          >
                            {sectionTitle}
                          </h4>
                        )}
                      </div>
                      <Image
                        src={getSectionStatusIcons(sectionStatus)}
                        alt={sectionStatus}
                        width={16}
                        height={16}
                      />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </Box>
    </div>
  );
};
