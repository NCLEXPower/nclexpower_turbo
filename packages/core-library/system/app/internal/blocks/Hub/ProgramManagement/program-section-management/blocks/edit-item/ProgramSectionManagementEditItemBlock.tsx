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
  SectionFormType,
  SectionTitleAtom,
  SectionTypeAtom,
  SectionDataIdAtom,
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

const sectionComponents: Record<string, React.FC<any>> = {
  document: EditDocumentBlock,
  "med-cards": EditDocumentBlock,
  simulator: EditSimulatorBlock,
  video: EditVideoBlock,
  "content-cards": EditContentCardsBlock,
  CAT: EditCATSimulatorBlock,
};

export const ProgramSectionManagementEditItemBlock = () => {
  const router = useRouter();
  const [sectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType] = useAtom(SectionTypeAtom);
  const [sectionDataId] = useAtom(SectionDataIdAtom);

  const { contentLoader, setContentLoader } = usePageLoaderContext();
  const { showToast } = useExecuteToast();

  const handleBack = () => {
    router.back();
  };

  const handleUpdateSection = async (values: SectionFormType) => {
    try {
      showToast(
        `${sectionTitle} item with ID ${sectionDataId} updated successfully`,
        "success"
      );
      setContentLoader(true);
      console.log(values);
    } catch (err) {
      console.error(err);
    } finally {
      setContentLoader(false);
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
        sectionImage={getSectionTypeIcons(sectionTitle)}
      />

      {SectionComponent && (
        <SectionComponent
          contentLoader={contentLoader}
          onSubmit={handleUpdateSection}
          section={sectionType}
        />
      )}
    </section>
  );
};
