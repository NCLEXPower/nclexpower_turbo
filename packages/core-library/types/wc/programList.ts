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
    sectionVideos?: SectionVideosType[];
};

export type SectionVideosType = {
    secVidId: string;
    secVidTitle: string;
    secVidUrl: string;
    secVidPlaceholder: StaticImageData;
    secVidDuration: string;
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
