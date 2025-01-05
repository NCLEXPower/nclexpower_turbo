import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type SectionType = "leftSection" | "centerSection" | "rightSection";

type ContainerType = {
  value: string;
  container: string;
};

const useSyncSectionWithLabel = ({
  sectionName,
  labelName,
  questionIndex,
}: {
  sectionName: SectionType;
  labelName: string;
  questionIndex: number;
}) => {
  const { control, watch, setValue } = useFormContext();

  const labelValue = watch(`questionnaires.${questionIndex}.${labelName}`);
  const SectionList =
    watch(`questionnaires.${questionIndex}.${sectionName}`) ?? [];

  const { fields } = useFieldArray({
    control,
    name: `questionnaires.${questionIndex}.${sectionName}`,
  });

  useEffect(() => {
    if (labelValue) {
      SectionList.forEach((_: ContainerType, index: number) => {
        setValue(
          `questionnaires.${questionIndex}.${sectionName}.${index}.container`,
          labelValue
        );
      });
    }
  }, [labelValue, fields, questionIndex, sectionName, setValue]);
};

export default useSyncSectionWithLabel;
