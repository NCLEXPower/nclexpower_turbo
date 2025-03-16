import {
  SectionDataType,
  SectionListType,
  SectionVideosType,
} from "core-library/types/wc/programList";

type SectionAccumulator = {
  videoSections: SectionListType[];
  otherSections: SectionListType[];
};

export const getVideoPagePath = (
  sectionList: SectionVideosType[],
  programId: string,
  lastPathSegment: string
): string => {
  if (!lastPathSegment) {
    throw new Error("Missing lastPathSegment for video page path");
  }
  if (!programId) {
    throw new Error("Missing programId for video page path");
  }
  const secVids = JSON.stringify(sectionList);
  const encodedSecVids = encodeURIComponent(secVids);
  return `/hub/programs/${lastPathSegment}/watch?secVids=${encodedSecVids}&programId=${programId}`;
};

export const isVideoSectionType = (
  item: SectionVideosType[] | SectionDataType[]
): item is SectionVideosType[] => {
  return item && typeof item === "object" && "secVidId" in item;
};

export const getVideoSectionStatus = (
  section: SectionListType[]
): "available" | "in-progress" | "completed" => {
  if (!section.length) return "completed";
  if (section.every((s) => s.sectionStatus === "available")) return "available";
  if (section.every((s) => s.sectionStatus === "completed")) return "completed";
  return "in-progress";
};

export const separateSectionType = (section: SectionListType[]) => {
  return (section || []).reduce<SectionAccumulator>(
    (acc, s) => {
      if (s.sectionType === "video") {
        acc.videoSections.push(s);
      } else {
        acc.otherSections.push(s);
      }
      return acc;
    },
    {
      videoSections: [],
      otherSections: [],
    }
  );
};
