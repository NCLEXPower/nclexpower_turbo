/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateProgramFormType,
  createProgramSchema,
  programIDAtom,
} from "../../validation";
import {
  programSectionList,
  standardProgramManagementList,
} from "../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "../../../../../../../../../core";
import { ProgramManagementListEditField } from "./ProgramManagementListEditField";

export const ProgramManagementListEditBlock = () => {
  const [selectedSections, setSelectedSections] = useState<
    Record<number, string>
  >({});
  const [showAddSection, setShowAddSection] = useState<boolean>(true);
  const [programId] = useAtom(programIDAtom);
  const router = useRouter();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionData, setEditingSectionData] = useState<any>(null);

  const selectedProgram = standardProgramManagementList.find(
    (program) => program.id === programId
  );

  if (!selectedProgram) {
    return (
      <Typography>
        No program selected. Please go back to previous page.
      </Typography>
    );
  }

  const { title, sections } = selectedProgram;

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(createProgramSchema),
    defaultValues: {
      programName: title,
      sections: [],
    },
  });

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

  const { control, handleSubmit, setValue, getValues, reset, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const programImageWatch = watch("programImage");
  const programImage = getValues("programImage");
  const fileName = programImage && programImage[0]?.name;

  const handleAddSection = () => {
    append({ sectionTitle: "", sectionType: "", sectionValue: "" });
  };

  const handleRemoveSection = (index: number) => {
    setShowAddSection(true);
    setEditingSectionId(null);
    setEditingSectionData(null);
    remove(index);
  };

  const handleEditProgram = (data?: CreateProgramFormType) => {
    if (!data) {
      console.error("Form data is undefined.");
      return;
    }

    const { sections } = data;

    if (!sections) {
      console.error("Sections are undefined.");
      return;
    }

    sections.forEach((section, index) => {
      const sectionValue = Array.isArray(section.sectionValue)
        ? section.sectionValue.join(", ")
        : typeof section.sectionValue === "string"
          ? section.sectionValue
          : "Invalid value";

      console.log(
        `Section ${index + 1}: Title - ${section.sectionTitle}, Type - ${section.sectionType}, Value - ${sectionValue}`
      );
    });

    setShowAddSection(true);
    setEditingSectionId(null);
    setEditingSectionData(null);
    reset();
  };

  const handleEditProgramSection = (section: any) => {
    setSelectedSections((prev) => ({
      ...prev,
      [0]: section.sectionType,
    }));

    setEditingSectionId(section.sectionId);
    setShowAddSection(false);

    const getSectionValue = () => {
      if (section.sectionType === "video") {
        return section.sectionVideos.map((item: any) => item.secVidTitle);
      }

      return section.sectionData.map((item: any) => {
        if (section.sectionType === "CAT") {
          return item.catSimulator;
        }
        if (section.sectionType === "video") {
          return item.vid;
        }
        return item.title;
      });
    };

    const sectionValue = getSectionValue();

    const updateFormAndData = () => {
      append({
        sectionTitle: section.sectionTitle,
        sectionType: section.sectionType,
        sectionValue,
      });

      setValue(`sections.0.sectionValue`, sectionValue);

      setEditingSectionData({
        sectionTitle: section.sectionTitle,
        sectionType: section.sectionType,
        sectionValue: section.sectionValue,
      });
    };

    const sectionTypesWithSharedLogic = [
      "document",
      "med-cards",
      "simulator",
      "CAT",
      "video",
      "content-cards",
    ];

    if (sectionTypesWithSharedLogic.includes(section.sectionType)) {
      updateFormAndData();
    }
  };

  const handleDeleteProgramSection = (sectionId: string) => {
    alert(sectionId);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ProgramManagementListEditField
      onSave={handleSubmit(handleEditProgram)}
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
      showAddSection={showAddSection}
      sections={sections}
      editingSectionId={editingSectionId}
      editingSectionData={editingSectionData}
      handleEditProgramSection={handleEditProgramSection}
      handleDeleteProgramSection={handleDeleteProgramSection}
      handleRemoveSection={handleRemoveSection}
    />
  );
};
