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
  simulatorSchema,
  SectionTypeAtom,
} from "../../../validation";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditSimulatorField } from "./EditSimulatorField";
import { useSelectfieldOptions } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { SectionDataType } from "../../../types";

interface EditSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
  isLoading?: boolean;
}

export const EditSimulatorBlock: React.FC<EditSimulatorProps> = ({
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

  const { cleanedContentArea } = useSelectfieldOptions();

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
    if (selectedSectionData && isSimulatorSectionData(selectedSectionData)) {
      return {
        title: selectedSectionData.title,
        contentArea: selectedSectionData.contentArea,
        guided: selectedSectionData.guided,
        unguided: selectedSectionData.unguided,
        practice: selectedSectionData.practice,
      };
    }
    return {
      title: "",
      contentArea: "",
      guided: false,
      unguided: false,
      practice: false,
    };
  }, [selectedSectionData]);

  const form = useForm<yup.InferType<typeof simulatorSchema>>({
    mode: "onSubmit",
    resolver: yupResolver(simulatorSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue } = form;

  function isSimulatorSectionData(sectionData: unknown): sectionData is {
    title: string;
    contentArea: string;
    guided: boolean;
    unguided: boolean;
    practice: boolean;
  } {
    return (
      typeof sectionData === "object" &&
      sectionData !== null &&
      "title" in sectionData &&
      "contentArea" in sectionData &&
      "guided" in sectionData &&
      "unguided" in sectionData &&
      "practice" in sectionData
    );
  }

  useEffect(() => {
    const defaultValues =
      selectedSectionData && isSimulatorSectionData(selectedSectionData)
        ? selectedSectionData
        : {
            title: "",
            contentArea: "",
            guided: false,
            unguided: false,
            practice: false,
          };

    Object.entries(defaultValues).forEach(([key, value]) => {
      if (key in defaultValues) {
        setValue(
          key as keyof SectionFormType,
          value as SectionFormType[keyof SectionFormType]
        );
      }
    });
  }, [selectedSectionData, setValue]);

  const handleContentAreaChange = (value: string) => {
    setValue("contentArea", value);
  };

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <EditSimulatorField
      isLoading={isLoading}
      lists={cleanedContentArea}
      section={section}
      control={control}
      handleChange={handleContentAreaChange}
      onSave={handleSubmit(onSubmit)}
    />
  );
};
