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
} from "../../../validation";
import { programSectionList } from "../../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditSimulatorField } from "./EditSimulatorField";
import { useSelectfieldOptions } from "../../../../../Settings/SettingsManagement/steps/content/simulator/steps/content/hooks/useSelectfieldOptions";

interface EditSimulatorProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

export const EditSimulatorBlock: React.FC<EditSimulatorProps> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const [sectionDataId] = useAtom(SectionDataIdAtom);
  const { cleanedContentArea } = useSelectfieldOptions();
  const selectedSectionData = useMemo(() => {
    const sectionData = programSectionList.find(
      (item) => item.sectionType.toLowerCase() === section?.toLowerCase()
    );
    return sectionData?.sectionData.find(
      (data) => data.sectionDataId === sectionDataId
    );
  }, [section, sectionDataId]);

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
    if (selectedSectionData && isSimulatorSectionData(selectedSectionData)) {
      setValue("title", selectedSectionData.title);
      setValue("contentArea", selectedSectionData.contentArea);
      setValue("guided", selectedSectionData.guided);
      setValue("unguided", selectedSectionData.unguided);
      setValue("practice", selectedSectionData.practice);
    } else {
      setValue("title", "");
      setValue("contentArea", "");
      setValue("guided", false);
      setValue("unguided", false);
      setValue("practice", false);
    }
  }, [selectedSectionData, setValue]);

  const handleContentAreaChange = (value: string) => {
    setValue("contentArea", value);
  };

  if (contentLoader) {
    return <ComponentLoader />;
  }

  return (
    <EditSimulatorField
      lists={cleanedContentArea}
      section={section}
      control={control}
      handleChange={handleContentAreaChange}
      onSave={handleSubmit(onSubmit)}
    />
  );
};
