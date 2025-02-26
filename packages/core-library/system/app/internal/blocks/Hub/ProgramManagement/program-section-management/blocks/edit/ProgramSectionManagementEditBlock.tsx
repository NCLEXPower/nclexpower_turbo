/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button, DialogBox } from "../../../../../../../../../components";
import { useRouter } from "../../../../../../../../../core";
import { ProgramSectionHeader } from "../../components/ProgramSectionHeader";
import { getSectionTypeIcons } from "../../../../../../../../../utils/IconUtils";
import {
  SectionTitleAtom,
  SectionTypeAtom,
  SectionDataIdAtom,
  SectionIdAtom,
} from "../../validation";
import { useAtom } from "jotai";
import { ProgramSectionTable, TableColumnType } from "./ProgramSectionTable";
import { useApiCallback } from "../../../../../../../../../hooks";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../../../contexts";
import { RemoveSection } from "./RemoveSection";
import { SectionDataTypes } from "../../types";

export const ProgramSectionManagementEditBlock = () => {
  const router = useRouter();
  const [sectionTitle, setAtomSectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType, setAtomSectionType] = useAtom(SectionTypeAtom);
  const [, setAtomSectionDataId] = useAtom(SectionDataIdAtom);
  const [, setAtomSectionId] = useAtom(SectionIdAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { showToast } = useExecuteToast();

  const handleBack = () => {
    router.back();
  };

  const { businessQueryGetSectionsByType } = useBusinessQueryContext();
  const { data: sectionsList, refetch } = businessQueryGetSectionsByType(
    ["section_type_api"],
    { sectionType }
  );

  const deleteSectionCb = useApiCallback(
    async (api, args: string) => await api.webbackoffice.deleteSectionList(args)
  );

  const handleCreateSection = (sectionTitle: string) => {
    setAtomSectionTitle(sectionTitle);
    setAtomSectionType(sectionType);
    router.push((route) => route.program_section_management_create);
  };

  const editSection = (sectionId: string, sectionDataId: string) => {
    setAtomSectionId(sectionId);
    setAtomSectionDataId(sectionDataId);
    setAtomSectionType(sectionType);
    router.push((route) => route.program_section_management_edit_item);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleShowRemoveDialog = (sectionId: string, sectionTitle: string) => {
    setId(sectionId);
    setTitle(sectionTitle);
    setShowModal(true);
  };

  const deleteSection = async (sectionId: string) => {
    try {
      const deleteSectionResult = await deleteSectionCb.execute(sectionId);

      if (deleteSectionResult.status === 200) {
        refetch();
        showToast(`${title} removed successfully`, "success");
        setShowModal(false);
      } else {
        showToast(`Error removing ${title}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(`Error removing ${title}. Please try again`, "error");
    }
  };

  const tableData = useMemo(() => {
    if (!Array.isArray(sectionsList)) return [];

    return sectionsList.flatMap((section) => {
      if (!Array.isArray(section.sectionData)) return [];

      return section.sectionData
        .map((data: SectionDataTypes) => {
          if (!data) return null;

          const commonData = {
            sectionId: section.sectionId,
            sectionType: section.sectionType,
            sectionTitle: section.sectionTitle,
            sectionDataId: data.sectionDataId ?? "",
            title: data.title ?? "",
          };

          switch (section.sectionType) {
            case "document":
            case "med-cards":
              return { ...commonData, link: data.link ?? "" };

            case "video":
              return {
                  ...commonData,
                  link: data.link ?? "",
                  videoPlaceholder: data.videoPlaceholder ?? "",
                  authorImage: data.authorImage ?? "",
                  authorName: data.authorName ?? "",
                  description: data.description ?? "",
              };

            case "simulator":
              return {
                  ...commonData,
                  contentArea: data.contentArea ?? "",
                  guided: data.guided ? "☑" : "☐",
                  unguided: data.unguided ? "☑" : "☐",
                  practice: data.practice ? "☑" : "☐",
              };

            case "content-cards":
              return {
                  ...commonData,
                  cardTopic:
                    data.cards?.map((card) => card.cardTopic).join(", ") ??
                    "",
                  cardFaces:
                    data.cards
                      ?.flatMap((card) => card.cardFaces)
                      .join(", ") ?? "",
              };

            case "cat":
              return {
                  ...commonData,
                  catSimulator: data.catSimulator ?? "",
                  contentAreaCoverage: Array.isArray(data.contentAreaCoverage)
                    ? data.contentAreaCoverage.join(", ")
                    : "",
              };

            default:
              return { original: commonData };
          }
        })
        .filter((item: TableColumnType | null): item is TableColumnType => item !== null);
    });
  }, [sectionsList]);

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          marginBottom: "20px",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#3b0086",
          }}
        >
          Program Section Management
        </Typography>

        <Button
          sx={{
            width: "157px",
            background: "#F5F2F9",
            borderRadius: "10px",
            color: "#3B0086",
            "&:hover": {
              background: "none",
            },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>

      <ProgramSectionHeader
        showHeaderButtons
        sectionType={sectionType}
        handleCreateSection={() => handleCreateSection(sectionTitle)}
        sectionTitle={sectionTitle}
        sectionImage={getSectionTypeIcons(sectionType)}
      />

      <ProgramSectionTable
        onEdit={editSection}
        onDelete={handleShowRemoveDialog}
        tableData={tableData}
        sectionType={sectionType}
      />

      <DialogBox
        hideCloseButton
        handleClose={handleModalClose}
        open={showModal}
        borderRadius="16px"
        children={
          <RemoveSection
            sectionId={id}
            sectionTitle={title}
            onSubmit={deleteSection}
            closeModal={handleModalClose}
            isLoading={deleteSectionCb.loading}
          />
        }
        maxWidth="sm"
      />
    </section>
  );
};
