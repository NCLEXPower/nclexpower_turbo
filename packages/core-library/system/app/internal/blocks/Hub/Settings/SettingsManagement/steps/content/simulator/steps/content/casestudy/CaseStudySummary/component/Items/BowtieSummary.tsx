import { Box, Typography } from "@mui/material";
import React from "react";
import {
  BowtieItemType,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { useOrganizeSections } from "../../../../../../../../../../../../../../../../hooks";

export const BowtieSummary = ({ data }: Partial<QuestionnaireItem>) => {
  const sections = [data.leftSection, data.centerSection, data.rightSection];
  const [leftSectionOptions, centerSectionOptions, rightSectionOptions] =
    useOrganizeSections(sections);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        padding: 8,
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          width: "100%",
        }}
      >
        <SectionBox
          label={data.leftLabelName}
          items={leftSectionOptions.correct}
          count={2}
        />
        <SectionBox
          label={data.centerLabelName}
          items={centerSectionOptions.correct}
          count={1}
        />
        <SectionBox
          label={data.rightLabelName}
          items={rightSectionOptions.correct}
          count={2}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          gap: 5,
          width: "100%",
          borderTop: 1,
          paddingTop: "20px",
          borderColor: "#BDBDBD",
        }}
      >
        <SectionBox
          label={data.leftLabelName}
          items={leftSectionOptions.incorrect}
          count={3}
        />
        <SectionBox
          label={data.centerLabelName}
          items={centerSectionOptions.incorrect}
          count={3}
        />
        <SectionBox
          label={data.rightLabelName}
          items={rightSectionOptions.incorrect}
          count={3}
        />
      </Box>
    </Box>
  );
};

const SectionBox: React.FC<{
  label: string;
  items: BowtieItemType[];
  count: number;
}> = ({ label, items, count }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "start",
        flexGrow: 1,
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
      {items.length >= count &&
        items.map((item, index) => (
          <Box
            key={index}
            sx={{ padding: 5, borderRadius: "7px", boxShadow: 2 }}
          >
            {item.value}
          </Box>
        ))}
    </Box>
  );
};
