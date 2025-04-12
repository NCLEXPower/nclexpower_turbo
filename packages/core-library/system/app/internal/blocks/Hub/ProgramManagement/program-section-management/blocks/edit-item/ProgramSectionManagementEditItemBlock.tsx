/**
* Property of the Arxon Solutions, LLC.
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
import { createFormData } from "../../../../../../../../../utils/createFormData";

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
    async (api, args: FormData) =>
      await api.webbackoffice.updateSectionById(args)
  );

  const handleUpdateSection = async (values: UpdateSectionParams) => {
    if (!values) return;
  
    const formObject: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {
      sectionId,
      sectionType,
      sectionTitle,
    };
  
    switch (sectionType) {
      case "document":
      case "med-cards":
        if ("title" in values && "link" in values) {
          Object.assign(formObject, {
            "SectionData[0].sectionDataId": sectionDataId || "",
            "SectionData[0].title": values.title,
            "SectionData[0].file": values.link?.[0] || "",
          });
        }
        break;
      case "simulator":
        if ("contentArea" in values) {
          Object.assign(formObject, {
            "SectionData[0].sectionDataId": sectionDataId || "",
            "SectionData[0].title": values.title || "",
            "SectionData[0].contentArea": values.contentArea || "",
            "SectionData[0].guided": values.guided ? "true" : "false",
            "SectionData[0].unguided": values.unguided ? "true" : "false",
            "SectionData[0].practice": values.practice ? "true" : "false",
          });
        }
        break;
      case "video":
        if ("description" in values) {
          Object.assign(formObject, {
            "SectionData[0].sectionDataId": sectionDataId || "",
            "SectionData[0].title": values.title || "",
            "SectionData[0].description": values.description || "",
            ...(values.link?.[0] && { "SectionData[0].file": values.link[0] }),
            ...(values.authorImage?.[0] && { "SectionData[0].authorImage": values.authorImage[0] }),
            "SectionData[0].authorName": values.authorName || "",
            ...(values.videoPlaceholder?.[0] && { "SectionData[0].videoPlaceholder": values.videoPlaceholder[0] }),
          });
        }
        break;
      case "cat":
        if ("contentAreaCoverage" in values) {
          Object.assign(formObject, {
            "SectionData[0].sectionDataId": sectionDataId || "",
            "SectionData[0].title": values.catSimulator || "",
            "SectionData[0].catSimulator": values.catSimulator || "",
          });
          values.contentAreaCoverage?.forEach((item, i) => {
            formObject[`SectionData[0].contentAreaCoverage[${i}]`] = item;
          });
        }
        break;
      case "content-cards":
        if ("cards" in values) {
          Object.assign(formObject, {
            "SectionData[0].sectionDataId": sectionDataId || "",
            "SectionData[0].title": values.title || "",
          });
          values.cards?.forEach((card, i) => {
            formObject[`SectionData[0].cards[${i}].cardId`] = card.cardId || "";
            formObject[`SectionData[0].cards[${i}].cardTopic`] = card.cardTopic || "";
            formObject[`SectionData[0].cards[${i}].cardFaces`] = card.cardFaces?.length ? card.cardFaces : [];
          });
        }
        break;
      default:
        return;
    }
  
    try {
      const form = createFormData(formObject);
      const result = await updateSectionCB.execute(form);
  
      if (result.status === 200) {
        showToast(`${sectionTitle} item updated successfully`, "success");
      } else {
        showToast(`Error updating ${sectionTitle} item`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast(`Error updating ${sectionTitle} item. Please try again`, "error");
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
