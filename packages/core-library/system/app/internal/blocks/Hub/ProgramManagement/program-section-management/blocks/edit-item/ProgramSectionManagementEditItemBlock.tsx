/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import { Button } from "../../../../../../../../../components";
import { useRouter } from "../../../../../../../../../core";
import { ProgramSectionHeader } from "../../components/ProgramSectionHeader";
import { getSectionTypeIcons } from "../../../../../../../../../utils/IconUtils";
import {
  SectionTitleAtom,
  SectionTypeAtom,
  SectionDataIdAtom,
  SectionIdAtom,
} from "../../validation";
import { usePageLoaderContext } from "../../../../../../../../../contexts/PageLoaderContext";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { EditVideoBlock } from "./EditVideo/EditVideoBlock";
import { EditCATSimulatorBlock } from "./EditCATSimulator/EditCATSimulatorBlock";
import { EditContentCardsBlock } from "./EditContentCards/EditContentCardsBlock";
import { EditDocumentBlock } from "./EditDocument/EditDocumentBlock";
import { EditSimulatorBlock } from "./EditSimulator/EditSimulatorBlock";
import { useExecuteToast } from "../../../../../../../../../contexts";
import { useApiCallback } from "../../../../../../../../../hooks";
import { UpdateSectionParams } from "../../../../../../../../../api/types";

const sectionComponents: Record<string, React.FC<any>> = {
  document: EditDocumentBlock,
  "med-cards": EditDocumentBlock,
  simulator: EditSimulatorBlock,
  video: EditVideoBlock,
  "content-cards": EditContentCardsBlock,
  cat: EditCATSimulatorBlock,
};

export const ProgramSectionManagementEditItemBlock = () => {
  const router = useRouter();
  const [sectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType] = useAtom(SectionTypeAtom);
  const [sectionId] = useAtom(SectionIdAtom);
  const [sectionDataId] = useAtom(SectionDataIdAtom);

  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const { showToast } = useExecuteToast();

  const handleBack = () => {
    router.back();
  };

  const updateSectionCB = useApiCallback(
    async (api, args: UpdateSectionParams) =>
      await api.webbackoffice.updateSectionById(args)
  );

  const handleUpdateSection = async (values: UpdateSectionParams) => {
    if (!values) return;
    const getPayload = () => {
      switch (sectionType) {
        case "document":
        case "med-cards":
          if ("title" in values && "link" in values) {
            return {
              sectionId,
              sectionType,
              sectionTitle,
              sectionDataId,
              title: values.title,
              link: values.link,
            };
          }
          break;
        case "simulator":
          if ("contentArea" in values) {
            return {
              sectionId,
              sectionType,
              sectionTitle,
              sectionDataId,
              title: values.title,
              contentArea: values.contentArea,
              guided: values.guided,
              unguided: values.unguided,
              practice: values.practice,
            };
          }
          break;
        case "video":
          if ("description" in values) {
            return {
              sectionId,
              sectionType,
              sectionTitle,
              sectionDataId,
              title: values.title,
              link: values.link,
              authorImage: values.authorImage,
              authorName: values.authorName,
              videoPlaceholder: values.videoPlaceholder,
              description: values.description,
            };
          }
          break;
        case "cat":
          if ("contentAreaCoverage" in values) {
            return {
              sectionId,
              sectionType,
              sectionTitle,
              sectionDataId,
              title: values.catSimulator ?? "",
              catSimulator: values.catSimulator,
              contentAreaCoverage: values.contentAreaCoverage,
            };
          }
          break;
        case "content-cards":
          if ("cards" in values) {
            return {
              sectionId,
              sectionType,
              sectionTitle,
              sectionDataId,
              title: values.title,
              cards: values.cards,
            };
          }
          break;
        default:
          return null;
      }
    };

    const payload = getPayload();
    if (!payload) return;

    try {
      const result = await updateSectionCB.execute(payload);
      if (result.status === 200) {
        showToast(`${sectionTitle} item updated successfully`, "success");
      } else {
        showToast(`Error creating a ${sectionTitle} item`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(
        `Error creating a ${sectionTitle} item. Please try again`,
        "error"
      );
    }
  };

  useEffect(() => {
    if (!sectionType || !sectionComponents[sectionType]) {
      router.push((route) => route.program_section_management);
    }

    const timer = setTimeout(() => setContentLoader(false), 3000);
    return () => clearTimeout(timer);
  }, [sectionType, router, setContentLoader]);

  const SectionComponent = sectionComponents[sectionType];

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
        sectionType={sectionType}
        sectionTitle={sectionTitle}
        sectionImage={getSectionTypeIcons(sectionType)}
      />

      {SectionComponent && (
        <SectionComponent
          isLoading={updateSectionCB.loading}
          contentLoader={contentLoader}
          onSubmit={handleUpdateSection}
          section={sectionType}
        />
      )}
    </section>
  );
};
