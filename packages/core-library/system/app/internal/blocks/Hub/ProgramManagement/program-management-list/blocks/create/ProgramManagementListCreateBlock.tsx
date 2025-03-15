/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateProgramFormType,
  createProgramSchema,
  programTypeAtom,
} from "../../validation";
import { useState } from "react";
import { useRouter } from "../../../../../../../../../core";
import { ProgramManagementListCreateField } from "./ProgramManagementListCreateField";
import { useAtom } from "jotai";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import { useApiCallback } from "../../../../../../../../../hooks";
import {
  CreateProgramParams,
  GetAllSectionsResponseType,
  Section,
  SectionData,
} from "../../../../../../../../../api/types";
import { sectionTypeAndTitle } from "../../../program-section-management/constants";

export const ProgramManagementListCreateBlock = () => {
  const [selectedSections, setSelectedSections] = useState<
    Record<number, string>
  >({});

  const { businessQueryGetAllSections } = useBusinessQueryContext();
  const { data: allSectionsList, refetch } = businessQueryGetAllSections([
    "all_sections_api",
  ]);

  const createProgramCB = useApiCallback(
    async (api, args: CreateProgramParams) =>
      await api.webbackoffice.createPrograms(args)
  );
  const { showToast } = useExecuteToast();

  const router = useRouter();
  const [atomProgramType] = useAtom(programTypeAtom);

  const sectionList = sectionTypeAndTitle
    ? sectionTypeAndTitle.map((item) => ({
        label: item.sectionTitle,
        value: item.sectionType,
      }))
    : [];

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

  const handleMultipleSelectChange = (index: number, value: any) => {
    const selectedValues = Array.isArray(value) ? value : [value];
    setValue(`sections.${index}.sectionValue`, selectedValues);
  };

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(createProgramSchema),
    defaultValues: {
      programName: "",
      programImage: undefined,
      sections: [{ sectionTitle: "", sectionType: "", sectionValue: "" }],
    },
  });

  const { control, handleSubmit, setValue, getValues, watch, reset } = form;
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

  const handleCreateProgram = async (
    data: CreateProgramFormType | undefined,
    reset: () => void
  ) => {
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
              } else if (section.sectionType === "simulator") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  contentArea: dataItem,
                  guided: dataItem.guided,
                  unguided: dataItem.unguided,
                  practice: dataItem.practice,
                  link: ""
                }
              } else if (section.sectionType === "cat") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  catSimulator: dataItem.catSimulator,
                  contentAreaCoverage: dataItem.contentAreaCoverage,
                  link: "",
                }
              } else if (section.sectionType === "content-cards") {
                return {
                  sectionDataId: dataItem.sectionDataId,
                  title: dataItem.title,
                  cards: dataItem.cards,
                  link: ""
                }
              }
              return null;
            })
            .filter(Boolean);

          if (matchedSectionData.length === 0) return null;

          return {
            sectionId: matchingSection.sectionId,
            sectionType: section.sectionType,
            sectionTitle: section.sectionTitle,
            sectionData: matchedSectionData,
            ...(section.sectionType === "cat" && { sectionTimer: data.sectionTimer })
          };
        })
        .filter((section): section is Section => section !== null);
    });

    const payload = {
      title: data.programName,
      programImage,
      programType: atomProgramType,
      stringifiedSections
    };

    if (!payload) return;

    try {
      const result = await createProgramCB.execute(payload);
      if (result.status === 200) {
        showToast(`Successfully added ${data.programName}`, "success");
        reset();
        refetch();
      } else {
        showToast(`Error creating a ${data.programName}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(`Error creating program. Please try again`, "error");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ProgramManagementListCreateField
      isLoading={createProgramCB.loading}
      onSave={handleSubmit((values) => handleCreateProgram(values, reset))}
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
