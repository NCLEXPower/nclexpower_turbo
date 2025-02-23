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
  programTypeAtom,
} from "../../validation";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "../../../../../../../../../core";
import { ProgramManagementListEditField } from "./ProgramManagementListEditField";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import { sectionTypeAndTitle } from "../../../program-section-management/constants";
import {
  GetAllSectionsResponseType,
  Section,
  SectionData,
  UpdateProgramParams,
  UpdateSection,
} from "../../../../../../../../../api/types";
import { useApiCallback } from "../../../../../../../../../hooks";

export type SectionDataType = {
  sectionTitle: string;
  sectionType: string;
  sectionValue: string; 
}

type SectionDataItem = {
  sectionDataId: string;
  title: string;
  link: string;
  secVidTitle?: string;
  catSimulator?: string;
  vid?: string;
}

export type SectionListTypes = {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
  sectionData?: SectionDataItem[];
  sectionValue?: string | string[];
};

export const ProgramManagementListEditBlock = () => {
  const [selectedSections, setSelectedSections] = useState<
    Record<number, string>
  >({});
  const [showAddSection, setShowAddSection] = useState<boolean>(true);
  const [programId] = useAtom(programIDAtom);
  const [atomProgramType] = useAtom(programTypeAtom);
  const router = useRouter();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionData, setEditingSectionData] = useState<SectionDataType | null>(null);
  const { showToast } = useExecuteToast();

  const { businessQueryGetAllPrograms } = useBusinessQueryContext();
  const { data: allProgramsList } = businessQueryGetAllPrograms([
    "all_programs_api",
  ]);

  const { businessQueryGetAllSections } = useBusinessQueryContext();
  const { data: allSectionsList } = businessQueryGetAllSections([
    "all_sections_api",
  ]);

  const updateProgramCB = useApiCallback(
    async (api, args: UpdateProgramParams) =>
      await api.webbackoffice.updatePrograms(args)
  );

  const selectedProgram = useMemo(() => {
    if (Array.isArray(allProgramsList)) {
      return (
        allProgramsList.find((program) => program.id === programId) || null
      );
    }
    return null;
  }, [allProgramsList, programId]);

  const sectionList = sectionTypeAndTitle
    ? sectionTypeAndTitle.map((item) => ({
        label: item.sectionTitle,
        value: item.sectionType,
      }))
    : [];

  const { title, sections, programImage } = selectedProgram || {};

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(createProgramSchema),
    defaultValues: {
      programImage: programImage,
      programName: title,
      sections: [],
    },
  });

  const filteredSectionValuesList = (sectionType: string) => {
    if (!Array.isArray(allSectionsList)) return [];

    const selectedSections = allSectionsList.filter(
      (section) => section.sectionType === sectionType
    );

    return selectedSections.flatMap((section) =>
      section.sectionData.map((dataItem: GetAllSectionsResponseType) => {
        if (sectionType === "cat" && "catSimulator" in dataItem) {
          return {
            label: dataItem.catSimulator,
            value: section.sectionId,
          };
        }
        if ("title" in dataItem) {
          return {
            label: dataItem.title,
            value: section.sectionId,
          };
        }
        return {
          label: "Unknown",
          value: section.sectionId ?? "Unknown",
        };
      })
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

  const handleMultipleSelectChange = (index: number, value: string) => {
    const selectedValues = Array.isArray(value) ? value : [value];
    setValue(`sections.${index}.sectionValue`, selectedValues);
  };

  const { control, handleSubmit, setValue, getValues, reset, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const programImageWatch = watch("programImage");
  const programImageValue = getValues("programImage");
  const fileName =
    typeof programImageValue === "string"
      ? programImageValue
      : programImageValue && programImageValue[0]?.name;

  const handleAddSection = () => {
    append({ sectionTitle: "", sectionType: "", sectionValue: "" });
  };

  const handleRemoveSection = (index: number) => {
    setShowAddSection(true);
    setEditingSectionId(null);
    setEditingSectionData(null);
    remove(index);
  };

  const handleEditProgram = async (data?: CreateProgramFormType) => {
    if (!data) {
      console.error("Form data is undefined.");
      return;
    }

    const { sections } = data;

    if (!sections) {
      console.error("Sections are undefined.");
      return;
    }

    if (!Array.isArray(allSectionsList)) {
      console.error("allSectionsList is not an array.");
      return;
    }

    const stringifiedSections = sections.flatMap((section) => {
      if (!section.sectionValue) return [];

      const matchingSections = allSectionsList.filter((item) =>
        Array.isArray(section.sectionValue)
          ? section.sectionValue.includes(item.sectionId)
          : item.sectionId === section.sectionValue
      );

      if (matchingSections.length === 0) return [];

      return matchingSections
        .map((matchingSection) => {
          const matchedSectionData = matchingSection.sectionData
            .map((dataItem: SectionData) => {
              if (
                section.sectionType === "document" ||
                section.sectionType === "med-cards"
              ) {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  link: dataItem.link,
                };
              } else if (section.sectionType === "video") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  link: dataItem.link,
                  authorName: dataItem.authorName,
                  authorImage: dataItem.authorImage,
                  videoplaceholder: dataItem.videoPlaceholder,
                  description: dataItem.description,
                };
              }
              return null;
            })
            .filter(Boolean);

          if (matchedSectionData.length === 0) return null;

          return {
            programSectionId: matchingSection.sectionId,
            sectionType: section.sectionType,
            sectionTitle: section.sectionTitle,
            sectionStatus: "available",
            sectionData: matchedSectionData,
          };
        })
        .filter((section): section is UpdateSection => section !== null);
    });

    const combinedSections = [
      ...stringifiedSections,
      ...(selectedProgram.sections || []).map(
        ({ sectionId, ...rest }: Section) => ({
          ...rest,
          programSectionId: sectionId,
        })
      ),
    ];

    const payload = {
      id: selectedProgram.id,
      title: data.programName,
      programImage,
      programType: atomProgramType,
      stringifiedSections: combinedSections,
    };

    if (!payload) return;

    try {
      const result = await updateProgramCB.execute(payload);
      if (result.status === 200) {
        showToast(`Successfully updated ${data.programName}`, "success");
        reset();
      } else {
        showToast(`Error creating a ${data.programName}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(`Error updating program. Please try again`, "error");
    }

    setShowAddSection(true);
    setEditingSectionId(null);
    setEditingSectionData(null);
    reset();
  };

  const handleEditProgramSection = (section: SectionListTypes) => {
    setSelectedSections((prev) => ({
      ...prev,
      [0]: section.sectionType,
    }));

    setEditingSectionId(section.sectionId);
    setShowAddSection(false);

    const getSectionValue = () => {
      if (!section.sectionData) return [];

      if (section.sectionType === "video") {
        return section.sectionData?.map((item: SectionDataItem) => item.secVidTitle);
      }

      return section.sectionData?.map((item: SectionDataItem) => {
        if (section.sectionType === "cat") {
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

      const formattedSectionValue = Array.isArray(sectionValue) 
    ? sectionValue.join(", ")
    : sectionValue ?? "";
    
      append({
        sectionTitle: section.sectionTitle,
        sectionType: section.sectionType,
        sectionValue: formattedSectionValue
      });

      setValue(`sections.0.sectionValue`, sectionValue);

      setEditingSectionData({
        sectionTitle: section.sectionTitle,
        sectionType: section.sectionType,
        sectionValue: formattedSectionValue,
      });
    };

    const sectionTypesWithSharedLogic = [
      "document",
      "med-cards",
      "simulator",
      "cat",
      "video",
      "content-cards",
    ];

    if (sectionTypesWithSharedLogic.includes(section.sectionType)) {
      updateFormAndData();
    }
  };

  useEffect(() => {
    if (selectedProgram) {
      form.reset({
        programImage: selectedProgram.programImage,
        programName: selectedProgram.title,
        sections: [],
      });
    }
  }, [selectedProgram, form]);

  const handleDeleteProgramSection = (sectionId: string) => {
    alert(sectionId);
  };

  const handleBack = () => {
    router.back();
  };

  if (!selectedProgram) {
    return (
      <Typography>
        No program selected. Please go back to previous page.
      </Typography>
    );
  }
  return (
    <ProgramManagementListEditField
      isLoading={updateProgramCB.loading}
      onSave={handleSubmit(handleEditProgram)}
      handleBack={handleBack}
      fileName={fileName}
      programImage={programImageValue}
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
