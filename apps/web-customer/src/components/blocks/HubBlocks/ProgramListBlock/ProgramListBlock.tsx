/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useState } from "react";
import { Box } from "@mui/material";
import { ProgramHeader } from "./ProgramHeader";
import { ProgramGridView } from "./ProgramGridView";
import {
  SectionDataType,
  SectionListType,
  SectionVideosType,
  StandardProgramListType,
} from "core-library/types/wc/programList";
import {
  ControlledAccordion,
  EvaIcon,
  IconButton,
  Link,
} from "core-library/components";
import Image from "next/image";
import { ProgressCircle } from "../../../../components/ProgressCircle/ProgressCircle";
import useCalculateProgramProgress from "../../../../core/hooks/useCalculateProgramProgress";
import {
  getSectionStatusIcons,
  getSectionTypeIcons,
  getStatusIcons,
} from "core-library/utils/IconUtils";
import { useRouter } from "core-library";
import { ProgramSkeletonLoader } from "@/components/Skeleton/ProgramSkeletonLoader";
import { useModal } from "core-library/hooks";
import { ContentCardsModal } from "./ContentCardsModal/ContentCardsModal";
import {
  getVideoPagePath,
  getVideoSectionStatus,
  isVideoSectionType,
  separateSectionType,
} from "./ProgramListBlockUtils";
interface ProgramListBlockProps {
  program: StandardProgramListType[];
  programTitle: string;
  programSubtitle: string;
  isLoading: boolean;
}

interface AccordionHeaderProps {
  item: StandardProgramListType;
  expanded: boolean;
  onToggle: (event?: React.SyntheticEvent, newExpanded?: boolean) => void;
}

interface AccordionDetailsProps {
  id: string;
  sections?: SectionListType[];
}

export const ProgramListBlock: React.FC<ProgramListBlockProps> = ({
  program,
  programTitle,
  programSubtitle,
  isLoading,
}) => {
  const [listView, setListView] = useState<boolean>(true);
  const toggleView = () => setListView((prev) => !prev);
  const progress = useCalculateProgramProgress(program);
  const { open, close, props } = useModal<SectionDataType[]>();
  const router = useRouter();
  const lastPathSegment = router.asPath.split("/").filter(Boolean).pop() ?? "";

  const handleShowVideos = (
    sectionList: SectionVideosType[],
    programId: string
  ) => {
    router.push(getVideoPagePath(sectionList, programId, lastPathSegment));
  };

  const handleShowContentCards = (sectionData: SectionDataType[]) => {
    if (sectionData && sectionData.length && !isVideoSectionType(sectionData)) {
      open(sectionData);
    }
  };

  const handleNonVideoStatusChange = (sectionId: string) => {
    // call api and update status
  };

  const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    item,
    expanded,
    onToggle,
  }) => {
    const { videoSections, otherSections } = separateSectionType(
      item.sections ?? []
    );
    const combinedSectionsCount =
      otherSections.length + (videoSections.length > 0 ? 1 : 0);

    return (
      <Box className="flex flex-row gap-4 items-center w-full">
        <div className="h-[162px] flex w-full">
          <Image
            src={item.programImage}
            alt={item.title}
            width={180}
            height={162}
            loading="lazy"
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: expanded ? "0px" : "16px",
            }}
          />
          <div className="flex flex-col px-8 py-2 md:py-6 justify-around md:justify-between w-full">
            <h2 className="font-ptSansNarrow font-bold text-[18px] md:text-[20px] text-center md:text-start text-white">
              {item.title}
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="relative flex gap-1 items-center bg-[#181E2F] px-4 py-1 rounded-[10px]">
                {item.programStatus === "progress" && (
                  <>
                    <ProgressCircle progress={progress} />
                    <h4 className="text-white font-ptSansNarrow font-regular text-[14px] md:text-[16px] pl-4">
                      {progress}%
                    </h4>
                  </>
                )}
                <h4 className="font-ptSansNarrow text-white font-regular text-[14px] md:text-[16px] capitalize">
                  {item.programStatus === "unavailable" ||
                  item.programStatus === "available"
                    ? "Start"
                    : item.programStatus}
                </h4>
                <Image
                  src={getStatusIcons(item.programStatus)}
                  alt="Completed"
                  width={16}
                  height={16}
                  loading="lazy"
                />
              </div>
              <div className="flex gap-2 items-center">
                <h4 className="text-white text-[14px] md:text-[18px] font-regular font-ptSansNarrow">
                  {combinedSectionsCount} Sections
                </h4>
                <IconButton
                  className={`text-white cursor-pointer transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                  onClick={(e) => {
                    e?.stopPropagation();
                    onToggle(e, !expanded);
                  }}
                >
                  <EvaIcon
                    name="arrow-ios-downward-outline"
                    fill="#ffffff"
                    width={20}
                    height={20}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
  };

  const AccordionDetails: React.FC<AccordionDetailsProps> = ({
    id,
    sections,
  }) => {
    const { videoSections, otherSections } = separateSectionType(
      sections ?? []
    );

    const secVidDetails = !!videoSections.length
      ? {
          secVidTitle: videoSections[0].sectionTitle,
          secVidIcon: getSectionTypeIcons(videoSections[0].sectionType),
          secVidStatusIcon: getSectionStatusIcons(
            getVideoSectionStatus(videoSections)
          ),
        }
      : null;

    return (
      <>
        <Box className="h-auto">
          <div className="flex w-full justify-between bg-[#dbdfea] px-8 py-2">
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Sections
            </h4>
            <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
              Status
            </h4>
          </div>
        </Box>
        <Box className="flex flex-col space-y-2 bg-white px-10 py-2 pt-4 rounded-b-[16px]">
          {!sections?.length ? (
            <div className="text-center text-gray-500">
              No available sections
            </div>
          ) : (
            <>
              {secVidDetails && (
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={secVidDetails.secVidIcon}
                      alt={videoSections[0].sectionType}
                      width={16}
                      height={16}
                    />

                    <h4
                      onClick={() =>
                        handleShowVideos(
                          videoSections
                            .map((s) => s.sectionData as SectionVideosType[])
                            .flat(),
                          id
                        )
                      }
                      className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer"
                    >
                      {secVidDetails.secVidTitle}
                    </h4>
                  </div>
                  <Image
                    src={secVidDetails.secVidStatusIcon}
                    alt={getVideoSectionStatus(videoSections)}
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
                    <div
                      key={sectionId}
                      className="flex justify-between items-center"
                    >
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
                            className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer"
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
                            className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer"
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
        </Box>
      </>
    );
  };
  return (
    <section className="flex h-auto w-full justify-center bg-[#e7eaf1]">
      <Box className="flex flex-col w-full lg:w-[1045px] mt-[30px] lg:mt-[70px] mb-[40px] mx-4 gap-8 ">
        <ProgramHeader
          title={programTitle}
          subtitle={programSubtitle}
          listView={listView}
          handleClick={toggleView}
        />
        <ContentCardsModal
          open={props.isOpen}
          onClose={close}
          data={props.context || []}
        />
        {isLoading ? (
          <ProgramSkeletonLoader listView={listView} />
        ) : listView ? (
          <div className="fadeIn">
            <ControlledAccordion
              accordionRadius="16px"
              items={program}
              renderSummary={(item, expanded, onToggle) => (
                <AccordionHeader
                  item={item}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              )}
              renderDetails={(item) => {
                const { id, sections } = item;
                return <AccordionDetails id={id} sections={sections} />;
              }}
              noAvailableDataText="No programs available at the moment."
            />
          </div>
        ) : (
          <ProgramGridView program={program} />
        )}
      </Box>
    </section>
  );
};
