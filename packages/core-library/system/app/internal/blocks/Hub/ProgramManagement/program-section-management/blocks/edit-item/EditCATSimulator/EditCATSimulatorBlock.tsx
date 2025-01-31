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
} from "../../../validation";
import { programSectionList } from "../../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditCATSimulatorField } from "./EditCATSimulatorField";
import { useSelectfieldOptions } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

interface EditCATSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

export const EditCATSimulatorBlock: React.FC<EditCATSimulatorProps> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const [sectionDataId] = useAtom(SectionDataIdAtom);
  const { cleanedContentArea } = useSelectfieldOptions();

  const selectedSectionData = useMemo(() => {
    const sectionData = programSectionList.find(
      (item) => item.sectionType === section
    );
    return sectionData?.sectionData.find(
      (data) => data.sectionDataId === sectionDataId
    );
  }, [section, sectionDataId]);

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

  console.log(contentAreaCoverageList);

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
