import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SectionType } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/types";

type ContainerType = {
  value: string;
  container: string;
};

export const useSynchronizeSectionWithLabel = ({
  sectionName,
  labelName,
  questionIndex,
}: {
  sectionName: SectionType;
  labelName: string;
  questionIndex: number;
}) => {
  const { control, watch, setValue } = useFormContext();

  // Watching the value of the label associated with the current question index
  // This value is used to update the container property of all section items
  const labelValue = watch(`questionnaires.${questionIndex}.${labelName}`);
  const SectionList =
    watch(`questionnaires.${questionIndex}.${sectionName}`) ?? [];

  const { fields } = useFieldArray({
    control,
    name: `questionnaires.${questionIndex}.${sectionName}`,
  });

  function syncSectionContainers(sectionList: ContainerType[], label: string) {
    sectionList.forEach((_, index) => {
      setValue(
        `questionnaires.${questionIndex}.${sectionName}.${index}.container`,
        label
      );
    });
  }

  useEffect(() => {
    if (
      labelValue !== null &&
      typeof labelValue !== "undefined" &&
      labelValue !== ""
    ) {
      syncSectionContainers(SectionList, labelValue);
    }
  }, [labelValue, fields, questionIndex, sectionName, setValue]);
};
