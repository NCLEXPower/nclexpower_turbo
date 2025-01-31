/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { ComponentLoader } from "../../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  documentSchema,
  SectionFormType,
  SectionDataIdAtom,
} from "../../../validation";
import { programSectionList } from "../../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditDocumentField } from "./EditDocumentField";

interface EditDocumentProps {
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

export const EditDocumentBlock: React.FC<EditDocumentProps> = ({
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
    if (selectedSectionData && isDocumentSectionData(selectedSectionData)) {
      return {
        title: selectedSectionData.title,
        link: normalizeLinkValue(selectedSectionData.link),
      };
    }
    return {
      title: "",
      link: [],
    };
  }, [selectedSectionData]);

  const form = useForm<yup.InferType<typeof documentSchema>>({
    mode: "onSubmit",
    resolver: yupResolver(documentSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue } = form;

  const linkValue = watch("link");

  function isDocumentSectionData(
    sectionData: unknown
  ): sectionData is { title: string; link: string | File[] } {
    return (
      typeof sectionData === "object" &&
      sectionData !== null &&
      "title" in sectionData &&
      "link" in sectionData
    );
  }

  useEffect(() => {
    if (selectedSectionData && isDocumentSectionData(selectedSectionData)) {
      setValue("title", selectedSectionData.title);
      setValue("link", normalizeLinkValue(selectedSectionData.link));
    } else {
      setValue("title", "");
      setValue("link", []);
    }
  }, [selectedSectionData, setValue]);

  useEffect(() => {
    if (linkValue && linkValue.length > 1) {
      const latestLink = normalizeLinkValue(linkValue);
      setValue("link", latestLink);
    }
  }, [linkValue, setValue]);

  const handleOnSave = () => {
    const normalizedLink = normalizeLinkValue(linkValue);
    setValue("link", normalizedLink);
    handleSubmit(onSubmit)();
  };

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <EditDocumentField
      section={section}
      control={control}
      onSave={handleOnSave}
      linkValue={linkValue?.[0]?.name}
    />
  );
};
