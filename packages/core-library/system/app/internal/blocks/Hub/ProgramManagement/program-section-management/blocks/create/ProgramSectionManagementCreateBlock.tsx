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
import { useApiCallback } from "../../../../../../../../../hooks";
import { CreateSectionParams } from "../../../../../../../../../api/types";
import { AxiosError } from "axios";

const sectionComponents: Record<string, React.FC<any>> = {
  document: CreateDocument,
  "med-cards": CreateDocument,
  video: CreateVideo,
  simulator: CreateSimulator,
  "content-cards": CreateContentCards,
  cat: CreateCATSimulator,
};

export const ProgramSectionManagementCreateBlock = () => {
  const router = useRouter();
  const [sectionTitle] = useAtom(SectionTitleAtom);
  const [sectionType] = useAtom(SectionTypeAtom);
  const { showToast } = useExecuteToast();
  const { contentLoader, setContentLoader } = usePageLoaderContext();

  const createSectionCB = useApiCallback(
    async (api, args: CreateSectionParams) =>
      await api.webbackoffice.createSection(args)
  );

  const handleBack = () => {
    router.back();
  };

  const handleSubmitSection = async (
    values: SectionFormType,
    reset: () => void
  ) => {
    if (!values) return;

    const getPayload = () => {
      switch (sectionType) {
        case "document":
        case "med-cards":
          if ("title" in values && "link" in values) {
            return {
              sectionType,
              sectionTitle,
              sectionData: [{ title: values.title, link: values.link }],
            };
          }
          break;
        case "simulator":
          if ("contentArea" in values) {
            return {
              sectionType,
              sectionTitle,
              sectionData: [
                {
                  title: values.title,
                  contentArea: values.contentArea,
                  guided: values.guided,
                  unguided: values.unguided,
                  practice: values.practice,
                },
              ],
            };
          }
          break;
        case "video":
          if ("description" in values) {
            return {
              sectionType,
              sectionTitle,
              sectionData: [
                {
                  title: values.title,
                  link: values.link,
                  authorImage: values.authorImage,
                  authorName: values.authorName,
                  videoPlaceholder: values.videoPlaceholder,
                  description: values.description,
                },
              ],
            };
          }
          break;
        case "cat":
          if ("contentAreaCoverage" in values) {
            return {
              sectionType,
              sectionTitle,
              sectionData: [
                {
                  title: values.catSimulator,
                  catSimulator: values.catSimulator,
                  contentAreaCoverage: values.contentAreaCoverage,
                },
              ],
            };
          }
          break;
        case "content-cards":
          if ("cards" in values) {
            return {
              sectionType,
              sectionTitle,
              sectionData: [{ title: values.title, cards: values.cards }],
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
      const result = await createSectionCB.execute(payload);
      if (result.status === 200) {
        showToast(`${sectionTitle} item added successfully`, "success");
        reset();
      } else {
        showToast(`Error creating a ${sectionTitle} item`, "error");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code && err.status === 409) {
          showToast("Section Title Already Exist. Please try another one", "error");
        }
      }
      
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
          isLoading={createSectionCB.loading}
          contentLoader={contentLoader}
          onSubmit={handleSubmitSection}
          section={sectionType}
        />
      )}
    </section>
  );
};
