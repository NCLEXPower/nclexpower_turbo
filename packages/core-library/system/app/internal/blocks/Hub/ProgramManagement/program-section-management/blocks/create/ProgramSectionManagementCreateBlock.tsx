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
import { AxiosError } from "axios";
import { createFormData } from "../../../../../../../../../utils/createFormData";

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
    async (api, args: FormData) => await api.webbackoffice.createSection(args)
  );

  const handleBack = () => {
    router.back();
  };

  const handleSubmitSection = async (
    values: SectionFormType,
    reset: () => void
  ) => {
    if (!values) return;

    const formObject: Record<
      string,
      FormDataEntryValue | FormDataEntryValue[]
    > = {
      sectionTitle,
      sectionType,
    };

    switch (sectionType) {
      case "document":
      case "med-cards":
        if ("title" in values && "link" in values) {
          Object.assign(formObject, {
            "SectionData[0].title": values.title,
            "SectionData[0].file": values.link[0] || "",
          });
        }
        break;
      case "simulator":
        if ("contentArea" in values) {
          Object.assign(formObject, {
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
            "SectionData[0].title": values.title || "",
            "SectionData[0].description": values.description || "",
            ...(values.link?.[0] && { "SectionData[0].file": values.link[0] }),
            ...(values.authorImage?.[0] && {
              "SectionData[0].authorImage": values.authorImage[0],
            }),
            "SectionData[0].authorName": values.authorName || "",
            ...(values.videoPlaceholder?.[0] && {
              "SectionData[0].videoPlaceholder": values.videoPlaceholder[0],
            }),
          });
        }
        break;
      case "cat":
        if ("contentAreaCoverage" in values) {
          Object.assign(formObject, {
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
            "SectionData[0].title": values.title || "",
          });
          values.cards?.forEach((card, i) => {
            formObject[`SectionData[0].cards[${i}].cardTopic`] =
              card.cardTopic || "";
            formObject[`SectionData[0].cards[${i}].cardFaces`] = card.cardFaces
              ?.length
              ? card.cardFaces
              : [];
          });
        }
        break;
      default:
        return;
    }

    try {
      const form = createFormData(formObject);
      const result = await createSectionCB.execute(form);

      if (result.status === 200) {
        showToast(`${sectionTitle} item added successfully`, "success");
        reset();
      } else {
        showToast(`Error creating a ${sectionTitle} item`, "error");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.code && err.status === 409) {
        showToast(
          "Section Title Already Exists. Please try another one",
          "error"
        );
      } else {
        showToast(
          `Error creating a ${sectionTitle} item. Please try again`,
          "error"
        );
      }
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
