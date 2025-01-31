/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProgramFormType, createProgramSchema } from "../../validation";
import { programSectionList } from "../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useMemo, useState } from "react";
import { useRouter } from "../../../../../../../../../core";
import { ProgramManagementListCreateField } from "./ProgramManagementListCreateField";

export const ProgramManagementListCreateBlock = () => {
  const [selectedSections, setSelectedSections] = useState<
    Record<number, string>
  >({});
  const router = useRouter();

  const sectionList = useMemo(
    () =>
      programSectionList
        ? programSectionList.map((item) => ({
            label: item.sectionTitle,
            value: item.sectionType,
          }))
        : [],
    []
  );

  const filteredSectionValuesList = (sectionType: string) => {
    const selectedSectionData = programSectionList.find(
      (section) => section.sectionType === sectionType
    );

    return (
      selectedSectionData?.sectionData.map((dataItem) => {
        if (sectionType === "CAT" && "catSimulator" in dataItem) {
          return {
            label: dataItem.catSimulator,
            value: dataItem.catSimulator,
          };
        }
        if ("title" in dataItem) {
          return {
            label: dataItem.title,
            value: dataItem.title,
          };
        }
        return {
          label: "Unknown",
          value: dataItem.sectionDataId,
        };
      }) || []
    );
  };

  const handleSectionChange = (index: number, value: string) => {
    setSelectedSections((prev) => {
      const updatedSections = { ...prev, [index]: value };

      const sectionType = value;
      const sectionValue = sectionType === "video" ? [] : "";

      setValue(`sections.${index}.sectionValue`, sectionValue);

      return updatedSections;
    });
  };

  const handleMultipleSelectChange = (index: number, value: any) => {
    const selectedValues = Array.isArray(value) ? value : [value];
    setValue(`sections.${index}.sectionValue`, selectedValues);
  };

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(createProgramSchema),
    defaultValues: {
      programName: "",
      programImage: undefined,
      sections: [{ sectionTitle: "", sectionType: "", sectionValue: "" }],
    },
  });

  const { control, handleSubmit, setValue, getValues, formState, watch } = form;
  const { fields, append } = useFieldArray({
    control,
    name: "sections",
  });

  const programImageWatch = watch("programImage");
  const programImage = getValues("programImage");
  const fileName = programImage && programImage[0]?.name;

  const handleAddSection = () => {
    append({ sectionTitle: "", sectionType: "", sectionValue: "" });
  };

  const onSubmit = (data: CreateProgramFormType | undefined) => {
    if (data) {
      if (data.sections) {
        console.log("Sections:");
        data.sections.forEach((section, index) => {
          let sectionValue;
          if (typeof section.sectionValue === "string") {
            sectionValue = section.sectionValue;
          } else if (Array.isArray(section.sectionValue)) {
            sectionValue = section.sectionValue.join(", ");
          } else {
            sectionValue = "Invalid value";
          }

          console.log(
            `Section ${index + 1}: Title - ${section.sectionTitle}, Type - ${section.sectionType}, Value - ${sectionValue}`
          );
        });
      } else {
        console.error("Sections are undefined.");
      }
    } else {
      console.error("Form data is undefined.");
    }

    alert(JSON.stringify(data));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ProgramManagementListCreateField
      onSave={handleSubmit(onSubmit)}
      handleBack={handleBack}
      fileName={fileName}
      programImage={programImage}
      control={control}
      fields={fields}
      sectionList={sectionList}
      handleAddSection={handleAddSection}
      handleSectionChange={handleSectionChange}
      filteredSectionValuesList={filteredSectionValuesList}
      selectedSections={selectedSections}
      handleMultipleSelectChange={handleMultipleSelectChange}
      setValue={setValue}
    />
  );
};
