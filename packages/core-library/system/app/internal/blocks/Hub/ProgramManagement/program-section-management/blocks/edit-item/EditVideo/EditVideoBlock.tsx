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
} from "../../../validation";
import { programSectionList } from "../../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditVideoField } from "./EditVideoField";

interface EditVideoProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
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
}) => {
  const [sectionDataId] = useAtom(SectionDataIdAtom);

  const selectedSectionData = useMemo(() => {
    const sectionData = programSectionList.find(
      (item) => item.sectionType.toLowerCase() === section?.toLowerCase()
    );
    return sectionData?.sectionData.find(
      (data) => data.sectionDataId === sectionDataId
    );
  }, [section, sectionDataId]);

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
      videoFileName={videoFileName}
      videoLink={videoLink}
      videoPlaceholderFileName={videoPlaceholderFileName}
      videoPlaceholderLink={videoPlaceholderLink}
      authorImageFileName={authorImageFileName}
      authorImageLink={authorImageLink}
      linkValue={linkValue?.[0]?.name}
      videoPlaceholderValue={videoPlaceholderValue?.[0].name}
      authorImageValue={authorImageValue?.[0]?.name}
      control={control}
      onSave={handleOnSave}
      section={section}
    />
  );
};
