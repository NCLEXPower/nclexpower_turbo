export interface SectionDataType {
  sectionDataId: string;
  title: string;
  link: string | File[];
}

export interface SectionType {
  sectionType: string;
  sectionData: SectionDataType[];
}

export interface SectionDataTypes extends SectionDataType {
  videoPlaceholder?: string;
  authorImage?: string;
  authorName?: string;
  description?: string;
  contentArea?: string;
  guided?: boolean;
  unguided?: boolean;
  practice?: boolean;
  cards?: {
    cardId?: string;
    cardTopic?: string;
    cardFaces?: string | null;
  }[];
  catSimulator?: string;
  contentAreaCoverage?: string[];
}

export interface CardsType {
  cards?: {
    cardId?: string;
    cardTopic?: string;
    cardFaces?: string | null;
  }[];
}