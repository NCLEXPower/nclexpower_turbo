import React, { useCallback } from "react";
import { Tabs } from "../../../../../../../../../../../../../../../../components";
import { Box } from "@mui/material";
import {
  SectionContent,
  SectionKey,
} from "../../../../../../../../../../../../../types";
import { ContainedCaseStudyQuestionType } from "../../../../../../types";
import { BackgroundInfo } from "./BackgroundInfo";

interface Props {
  values: Partial<ContainedCaseStudyQuestionType>;
}

export const BackgroundInfoContent: React.FC<Props> = ({ values }) => {
  const sectionTitles: Record<SectionKey, string> = {
    nurseNotes: "Nurse's Notes",
    hxPhy: "HxPhy",
    labs: "Labs",
    orders: "Orders",
  };

  const allowedTabs: Array<SectionKey> = [
    "nurseNotes",
    "hxPhy",
    "labs",
    "orders",
  ];

  const generateTabs = useCallback(
    (content: Partial<ContainedCaseStudyQuestionType>) => {
      return allowedTabs
        .filter((key) => content[key])
        .map((key, index) => ({
          title: sectionTitles[key],
          id: index + 1,
          content: (
            <Box sx={{ border: "black" }}>
              <BackgroundInfo content={content[key] as SectionContent[]} />
            </Box>
          ),
        }));
    },
    [sectionTitles, allowedTabs]
  );

  return <Tabs tabsItem={generateTabs(values)} />;
};
