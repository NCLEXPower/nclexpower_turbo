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
  CATSchema,
  SectionTypeAtom,
} from "../../../validation";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditCATSimulatorField } from "./EditCATSimulatorField";
import { useSelectfieldOptions } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { SectionDataType } from "../../../types";

interface EditCATSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
  isLoading?: boolean;
}

export const EditCATSimulatorBlock: React.FC<EditCATSimulatorProps> = ({
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
    if (selectedSectionData && isCATSimulatorSectionData(selectedSectionData)) {
      return {
        catSimulator: selectedSectionData.catSimulator,
        contentAreaCoverage: selectedSectionData.contentAreaCoverage,
      };
    }
    return {
      catSimulator: "",
      contentAreaCoverage: [""],
    };
  }, [selectedSectionData]);

  const [contentAreaCoverageList, setContentAreaCoverageList] = useState<
    string[]
  >(defaultValues.contentAreaCoverage || []);

  const form = useForm<yup.InferType<typeof CATSchema>>({
    mode: "onSubmit",
    resolver: yupResolver(CATSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue } = form;

  function isCATSimulatorSectionData(
    sectionData: unknown
  ): sectionData is { catSimulator: string; contentAreaCoverage: string[] } {
    return (
      typeof sectionData === "object" &&
      sectionData !== null &&
      "catSimulator" in sectionData &&
      "contentAreaCoverage" in sectionData
    );
  }

  useEffect(() => {
    if (selectedSectionData && isCATSimulatorSectionData(selectedSectionData)) {
      setValue("catSimulator", selectedSectionData.catSimulator);
      setValue("contentAreaCoverage", selectedSectionData.contentAreaCoverage);
    } else {
      setValue("catSimulator", "");
      setValue("contentAreaCoverage", [""]);
    }
    setContentAreaCoverageList(defaultValues.contentAreaCoverage || [""]);
  }, [selectedSectionData, setValue]);

  const handleContentAreaChange = (selectedValue: string, index: number) => {
    const updatedList = [...contentAreaCoverageList];
    updatedList[index] = selectedValue;
    setContentAreaCoverageList(updatedList);
    setValue("contentAreaCoverage", updatedList);
  };

  const handleAddNew = () => {
    setContentAreaCoverageList([...contentAreaCoverageList, ""]);
  };

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <EditCATSimulatorField
      isLoading={isLoading}
      control={control}
      lists={cleanedContentArea}
      section={section}
      handleChange={handleContentAreaChange}
      onSave={handleSubmit(onSubmit)}
      handleAddNew={handleAddNew}
      coverageList={contentAreaCoverageList}
    />
  );
};
