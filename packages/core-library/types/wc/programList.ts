/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { StaticImageData } from "next/image";

export type SectionListType = {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
  sectionStatus: string;
  sectionData?: SectionDataType[] | SectionVideosType[];
};

export type SectionDataType = {
  sectionDataId: string;
  title?: string;
  link?: string | null;
  contentArea?: string | null;
  guided?: boolean | null;
  unguided?: boolean | null;
  practice?: boolean | null;
  cards?: SectionCardsType[];
  catSimulator?: string | null;
  contentAreaCoverage?: string[];
  authorName?: string | null;
  authorImage?: string | null;
  videoPlaceholder?: string | null;
  description?: string | null;
};

export type SectionCardsType = {
  cardId: string;
  cardTopic: string;
  cardFaces: string[];
};

export type SectionVideosType = {
  secVidId: string;
  secVidTitle: string;
  secVidUrl: string;
  secVidPlaceholder: string;
  secVidDuration?: string;
  secVidAuthor: string;
  secVidAuthorImg: string;
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
