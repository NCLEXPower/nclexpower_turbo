/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { StaticImageData } from "next/image";

export type SectionListType = {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
  sectionStatus: string;
  sectionTimer?: string;
  sectionVideos?: SectionVideosType[];
  sectionData?: SectionDataType[];
};

export type SectionDataType = {
  sectionDataId: string;
  title?: string;
  link?: string;
  contentArea?: string | null;
  guided?: boolean | null;
  unguided?: boolean | null;
  practice?: boolean | null;
  cards?: SectionCardsType[] | [];
  catSimulator?: string | null;
  contentAreaCoverage?: string[] | [];
  secVidTitle?: string;
};

export type ImageType = {
  default: {
    src: string;
    height: number;
    width: number;
    blurDataURL: string;
  };
};

export type SectionCardsType = {
  cardTopic: string;
  cardFaces: ImageType[];
};

export type SectionVideosType = {
  secVidId: string;
  secVidTitle: string;
  secVidUrl: string;
  secVidPlaceholder: StaticImageData;
  secVidDuration?: string;
  secVidAuthor: string;
  secVidAuthorImg: StaticImageData;
  secVidDescription: string;
};

export type StandardProgramListType = {
  id: string;
  title: string;
  programStatus: string;
  programImage: StaticImageData;
  sections?: SectionListType[];
  disabled?: boolean;
};

export interface ProgramSectionList {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
  sectionData: SectionData[];
}

type SectionData =
  | DocumentSectionData
  | VideoSectionData
  | SimulatorSectionData
  | ContentCardsSectionData
  | MedCardsSectionData
  | CATSectionData;

interface DocumentSectionData {
  sectionDataId: string;
  title: string;
  link: string;
  description: string;
}

interface VideoSectionData {
  sectionDataId: string;
  title: string;
  link: string;
  authorName: string;
  authorImage: string;
  videoPlaceholder: string;
  description: string;
}

interface SimulatorSectionData {
  sectionDataId: string;
  title: string;
  contentArea: string;
  guided: boolean;
  unguided: boolean;
  practice: boolean;
}

interface ContentCardsSectionData {
  sectionDataId: string;
  title: string;
  cards: {
    cardTopic: string;
    cardFaces: string[];
  }[];
}

interface MedCardsSectionData {
  sectionDataId: string;
  title: string;
  link: string;
}

interface CATSectionData {
  sectionDataId: string;
  catSimulator: string;
  contentAreaCoverage: string[];
}
