/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ComponentLoader } from "../../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SectionFormType,
  SectionDataIdAtom,
  videoSchema,
  SectionTypeAtom,
} from "../../../validation";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditVideoField } from "./EditVideoField";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { SectionDataType } from "../../../types";

interface EditVideoProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
  isLoading?: boolean;
}

const normalizeLinkValue = (link: string | File[] | undefined): File[] => {
  if (Array.isArray(link) && link.length > 0) {
    return [link[link.length - 1]];
  }

  if (typeof link === "string") {
    const blob = new Blob([], { type: "text/plain" });
    return [new File([blob], link)];
  }

  return [];
};

export const EditVideoBlock: React.FC<EditVideoProps> = ({
  section,
  contentLoader,
  onSubmit,
  isLoading,
}) => {
  const [sectionDataId] = useAtom(SectionDataIdAtom);
  const [sectionType] = useAtom(SectionTypeAtom);

  const { businessQueryGetSectionsByType } = useBusinessQueryContext();
  const { data: sectionsList } = businessQueryGetSectionsByType(
    ["section_type_api"],
    { sectionType }
  );

  const selectedSectionData = useMemo(() => {
    if (!Array.isArray(sectionsList)) return null;

    for (const section of sectionsList) {
      const foundData = section.sectionData.find(
        (data: SectionDataType) => data.sectionDataId === sectionDataId
      );
      if (foundData) return foundData;
    }

    return null;
  }, [sectionsList, section, sectionDataId]);

  const defaultValues = useMemo(() => {
    if (selectedSectionData && isVideoSectionData(selectedSectionData)) {
      return {
        title: selectedSectionData.title,
        link: normalizeLinkValue(selectedSectionData.link),
        authorName: selectedSectionData.authorName,
        authorImage: normalizeLinkValue(selectedSectionData.authorImage),
        videoPlaceholder: normalizeLinkValue(
          selectedSectionData.videoPlaceholder
        ),
        description: selectedSectionData.description,
      };
    }
    return {
      title: "",
      link: [],
      authorName: "",
      authorImage: [],
      videoPlaceholder: [],
      description: "",
    };
  }, [selectedSectionData]);

  const form = useForm<yup.InferType<typeof videoSchema>>({
    mode: "onSubmit",
    resolver: yupResolver(videoSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue, getValues } = form;

  const videoLink = getValues("link");
  const videoFileName = videoLink && videoLink[0]?.name;

  const videoPlaceholderLink = getValues("videoPlaceholder");
  const videoPlaceholderFileName =
    videoPlaceholderLink && videoPlaceholderLink[0]?.name;

  const authorImageLink = getValues("authorImage");
  const authorImageFileName = authorImageLink && authorImageLink[0]?.name;

  const linkValue = watch("link");
  const authorImageValue = watch("authorImage");
  const videoPlaceholderValue = watch("videoPlaceholder");

  function isVideoSectionData(sectionData: unknown): sectionData is {
    title: string;
    link: string | File[];
    authorName: string;
    authorImage: string | File[];
    videoPlaceholder: string | File[];
    description: string;
  } {
    return (
      typeof sectionData === "object" &&
      sectionData !== null &&
      "title" in sectionData &&
      "link" in sectionData &&
      "authorName" in sectionData &&
      "authorImage" in sectionData &&
      "videoPlaceholder" in sectionData &&
      "description" in sectionData
    );
  }

  useEffect(() => {
    if (selectedSectionData && isVideoSectionData(selectedSectionData)) {
      setValue("title", selectedSectionData.title);
      setValue("link", normalizeLinkValue(selectedSectionData.link));
      setValue("authorName", selectedSectionData.authorName);
      setValue(
        "authorImage",
        normalizeLinkValue(selectedSectionData.authorImage)
      );
      setValue(
        "videoPlaceholder",
        normalizeLinkValue(selectedSectionData.videoPlaceholder)
      );
      setValue("description", selectedSectionData.description);
    } else {
      setValue("title", "");
      setValue("link", []);
      setValue("authorName", "");
      setValue("authorImage", []);
      setValue("videoPlaceholder", []);
      setValue("description", "");
    }
  }, [selectedSectionData, setValue]);

  useEffect(() => {
    if (linkValue && linkValue.length > 1) {
      const latestLink = normalizeLinkValue(linkValue);
      setValue("link", latestLink);
    }

    if (authorImageValue && authorImageValue.length > 1) {
      const latestAuthorImage = normalizeLinkValue(authorImageValue);
      setValue("authorImage", latestAuthorImage);
    }

    if (videoPlaceholderValue && videoPlaceholderValue.length > 1) {
      const latestVideoPlaceholder = normalizeLinkValue(videoPlaceholderValue);
      setValue("videoPlaceholder", latestVideoPlaceholder);
    }
  }, [linkValue, authorImageValue, videoPlaceholderValue, setValue]);

  const handleOnSave = () => {
    const normalizedLink = normalizeLinkValue(linkValue);
    const normalizedAuthorImage = normalizeLinkValue(authorImageValue);
    const normalizedVideoPlaceholder = normalizeLinkValue(
      videoPlaceholderValue
    );
    setValue("link", normalizedLink);
    setValue("authorImage", normalizedAuthorImage);
    setValue("videoPlaceholder", normalizedVideoPlaceholder);
    handleSubmit(onSubmit)();
  };

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <EditVideoField
      isLoading={isLoading}
      videoFileName={videoFileName}
      videoLink={videoLink}
      videoPlaceholderFileName={videoPlaceholderFileName}
      videoPlaceholderLink={videoPlaceholderLink}
      authorImageFileName={authorImageFileName}
      authorImageLink={authorImageLink}
      control={control}
      onSave={handleOnSave}
      section={section}
    />
  );
};
