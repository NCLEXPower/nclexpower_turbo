/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "../../../../../../../../../components";
import { useRouter } from "../../../../../../../../../core";
import { ProgramSectionHeader } from "../../components/ProgramSectionHeader";
import { getSectionTypeIcons } from "../../../../../../../../../utils/IconUtils";
import { SectionTitleAtom, SectionTypeAtom, SectionDataIdAtom } from "../../validation";
import { useAtom } from "jotai";
import { programSectionList } from "../../../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { ProgramSectionTable } from "./ProgramSectionTable";

export const ProgramSectionManagementEditBlock = () => {
  const router = useRouter();
  const [sectionTitle, setAtomSectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType, setAtomSectionType] = useAtom(SectionTypeAtom); 
  const [, setAtomSectionDataId] = useAtom(SectionDataIdAtom);

  const handleBack = () => {
    router.back();
  };

  const handleCreateSection = (sectionTitle: string) => {
    setAtomSectionTitle(sectionTitle);
    setAtomSectionType(sectionType);
    router.push("/hub/program/program-section-management/create");
  };

  const editSection = (sectionDataId: string) => {
    setAtomSectionDataId(sectionDataId);
    setAtomSectionType(sectionType);
    router.push("/hub/program/program-section-management/edit-item");
  };

  const deleteSection = (sectionDataId: string) => {
    // add delete api once available
    alert(`Delete section with ID: ${sectionDataId}`);
  };

  const tableData = useMemo(() => {
    return programSectionList
      .filter((item) => item.sectionType === sectionType)
      .flatMap((section) =>
        section.sectionData.map((data) => {
          const commonData = { title: "title" in data ? data.title : "", sectionDataId: data.sectionDataId };
          switch (sectionType) {
            case "document":
            case "med-cards":
              if ("link" in data) {
                return { ...commonData, link: data.link || "" };
              }
              break;
            case "video":
              if ("link" in data && "videoPlaceholder" in data) {
                return {
                  ...commonData,
                  link: data.link || "",
                  videoPlaceholder: data.videoPlaceholder || "",
                  authorImage: data.authorImage || "",
                  authorName: data.authorName || "",
                  description: data.description || "",
                };
              }
              break;
            case "simulator":
              if ("contentArea" in data) {
                return {
                  ...commonData,
                  contentArea: data.contentArea || "",
                  guided: data.guided ? "☑" : "☐",
                  unguided: data.unguided ? "☑" : "☐",
                  practice: data.practice ? "☑" : "☐",
                };
              }
              break;
            case "content-cards":
              if ("cards" in data) {
                return {
                  ...commonData,
                  cardTopic: data.cards?.map((card) => card.cardTopic).join(", ") || "",
                  cardFaces: data.cards?.flatMap((card) => card.cardFaces).join(", ") || "",
                };
              }
              break;
            case "CAT":
              if ("catSimulator" in data) {
                return {
                  ...commonData,
                  catSimulator: data.catSimulator || "",
                  contentAreaCoverage: Array.isArray(data.contentAreaCoverage)
                    ? data.contentAreaCoverage.join(", ")
                    : "",
                };
              }
              break;
            default:
              return commonData;
          }
          return commonData;
        })
      );
  }, [sectionType]);
  
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
        sectionImage={getSectionTypeIcons(sectionTitle)}
      />

      <ProgramSectionTable
        onEdit={editSection}
        onDelete={deleteSection}
        tableData={tableData}
        sectionType={sectionType}
      />
    </section>
  );
};
