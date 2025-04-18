/**
* Property of the Arxon Solutions, LLC.
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
  DeleteProgramSectionParams,
  GetAllSectionsResponseType,
  SectionData,
  UpdateProgramParams,
  UpdateSection,
} from "../../../../../../../../../api/types";
import { useApiCallback } from "../../../../../../../../../hooks";

export type SectionDataType = {
  sectionTitle: string;
  sectionType: string;
  sectionValue: string;
};

type SectionDataItem = {
  sectionDataId: string;
  title: string;
  link: string;
  secVidTitle?: string;
  catSimulator?: string;
  vid?: string;
};

export type SectionListTypes = {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
  sectionData?: SectionDataItem[];
  sectionValue?: string | string[];
};

export const ProgramManagementListEditBlock = () => {
  const keyMapping: Record<string, string> = {
    secVidId: "sectionDataId",
    secVidTitle: "title",
    secVidUrl: "link",
    secVidPlaceholder: "videoPlaceholder",
    secVidAuthor: "authorName",
    secVidAuthorImg: "authorImage",
    secVidDescription: "description",
  };

  const sanitizeData = (data: unknown): unknown => {
    if (Array.isArray(data)) {
      return data.map((item) => sanitizeData(item));
    } else if (typeof data === "object" && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          keyMapping[key] || key,
          sanitizeData(value ?? ""),
        ])
      );
    }
    return data;
  };

  const [selectedSections, setSelectedSections] = useState<
    Record<number, string>
  >({});
  const [showAddSection, setShowAddSection] = useState<boolean>(true);
  const [programId] = useAtom(programIDAtom);
  const [atomProgramType] = useAtom(programTypeAtom);
  const router = useRouter();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionData, setEditingSectionData] =
    useState<SectionDataType | null>(null);
  const [removingSectionId, setRemovingSectionId] = useState<string | null>(null);
  const { showToast } = useExecuteToast();

  const { businessQueryGetAllProgramsByType } = useBusinessQueryContext();
  const { data: allProgramsList, refetch } = businessQueryGetAllProgramsByType(
    ["all_programs_api"],
    { programType: atomProgramType }
  );

  const { businessQueryGetAllSections } = useBusinessQueryContext();
  const { data: allSectionsList } = businessQueryGetAllSections([
    "all_sections_api",
  ]);

  const updateProgramCB = useApiCallback(
    async (api, args: UpdateProgramParams) =>
      await api.webbackoffice.updatePrograms(args)
  );

  const deleteProgramSectionCB = useApiCallback(
    async (api, args: DeleteProgramSectionParams) =>
      await api.webbackoffice.deleteProgramSectionById(args)
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
            value: section.catSimulator,
          };
        }
        if (sectionType === "video" && "title" in dataItem) {
          return {
            label: dataItem.title,
            value: section.sectionId,
          };
        }
        if ("title" in dataItem) {
          return {
            label: dataItem.title,
            value: section.title,
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

    if (!Array.isArray(allSectionsList)) {
      console.error("allSectionsList is not an array.");
      return;
    }

    const stringifiedSections = sections?.flatMap((section) => {
      if (!section.sectionValue) return [];

      const matchingSections = allSectionsList.filter((item) =>
        Array.isArray(section.sectionValue)
          ? section.sectionType === "cat"
            ? Array.isArray(item.sectionData) && item.sectionData.length > 0 && section.sectionValue.includes(item.sectionData[0].title)
            : section.sectionValue.includes(item.sectionId)
          : Array.isArray(item.sectionData) &&
            item.sectionData.length > 0 &&
            item.sectionData[0].title === section.sectionValue &&
            item.sectionType === section.sectionType
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
              } else if (section.sectionType === "simulator") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  contentArea: dataItem,
                  guided: dataItem.guided,
                  unguided: dataItem.unguided,
                  practice: dataItem.practice,
                  link: "",
                };
              } else if (section.sectionType === "cat") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  catSimulator: dataItem.catSimulator,
                  contentAreaCoverage: dataItem.contentAreaCoverage,
                  link: "",
                };
              } else if (section.sectionType === "content-cards") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  cards: dataItem.cards,
                  link: "",
                };
              }
              return null;
            })
            .filter(Boolean);

          if (matchedSectionData.length === 0) return null;

          return {
            sectionId: matchingSection.sectionId,
            sectionType: section.sectionType,
            sectionTitle: section.sectionTitle,
            sectionStatus: "available",
            sectionData: matchedSectionData,
            ...(section.sectionType === "cat" && { sectionTimer: data.sectionTimer })
          };
        })
        .filter((section): section is UpdateSection => section !== null);
    });

    const sanitizedSections = sanitizeData(
      selectedProgram.sections || []
    ) as UpdateSection[];

    const filteredSections = [
      ...(stringifiedSections || []),
      ...sanitizedSections.filter(
        (section: UpdateSection) => section.sectionId !== editingSectionId
      ),
    ];

    const combinedSections = [
      ...(stringifiedSections || []),
      ...sanitizedSections.map(({ sectionId, ...rest }) => ({
        ...rest,
        sectionId,
      })),
    ];

    const payload = {
      id: selectedProgram.id,
      title: data.programName,
      programImage: data.programImage,
      programType: atomProgramType,
      stringifiedSections: editingSectionId
        ? filteredSections
        : combinedSections,
    };

    if (!payload) return;

    try {
      const result = await updateProgramCB.execute(payload);
      if (result.status === 200) {
        refetch();
        reset();
        remove();
        showToast(`Successfully updated ${data.programName}`, "success");
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
    remove();
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
        return section.sectionData?.map(
          (item: SectionDataItem) => item.secVidTitle
        );
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
        sectionValue: formattedSectionValue,
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
        sections: selectedProgram.section,
      });
    }
  }, [selectedProgram, form]);

  const handleDeleteProgramSection = async (sectionId: string) => {
    setRemovingSectionId(sectionId);
    if (!programId) {
      showToast("Program Id unavailable. Please try again", "error");
    }

    const payload = {
      programId,
      sectionId,
    };

    try {
      const result = await deleteProgramSectionCB.execute(payload);
      if (result.status === 200) {
        showToast(`Successfully removed program section`, "success");
        refetch();
        reset();
      } else {
        showToast(`Error removing program section`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(`Error removing program section. Please try again`, "error");
    } finally {
      setRemovingSectionId(null);
    }
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
      removingSectionId={removingSectionId}
      isRemovingProgramSection={deleteProgramSectionCB.loading}
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
