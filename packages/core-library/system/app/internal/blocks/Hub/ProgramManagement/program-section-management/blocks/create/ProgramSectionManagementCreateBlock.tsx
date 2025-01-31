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
  CreateDocument,
  CreateVideo,
  CreateContentCards,
  CreateSimulator,
  CreateCATSimulator,
} from "./index";
import {
  SectionFormType,
  SectionTitleAtom,
  SectionTypeAtom,
} from "../../validation";
import { usePageLoaderContext } from "../../../../../../../../../contexts/PageLoaderContext";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useExecuteToast } from "../../../../../../../../../contexts";

const sectionComponents: Record<string, React.FC<any>> = {
  document: CreateDocument,
  "med-cards": CreateDocument,
  video: CreateVideo,
  simulator: CreateSimulator,
  "content-cards": CreateContentCards,
  CAT: CreateCATSimulator,
};

export const ProgramSectionManagementCreateBlock = () => {
  const router = useRouter();
  const [sectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType] = useAtom(SectionTypeAtom);
  const { showToast } = useExecuteToast();
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  const handleBack = () => {
    router.back();
  };

  const handleSubmitSection = async (values: SectionFormType) => {
    console.log(values);
    // add api logic here for creating section per sectionType
    switch (sectionType) {
      case "document":
        break;
      default:
        break;
    }
    try {
      showToast(`${sectionTitle} item added successfully`, "success");
      setContentLoader(true);
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
          onSubmit={handleSubmitSection}
          section={sectionType}
        />
      )}
    </section>
  );
};
