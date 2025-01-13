import { Box, Typography } from "@mui/material";
import React from "react";
import {
  BowtieItemType,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { useOrganizeSections } from "../../../../../../../../../../../../../../../../hooks";

type OptionType = {
  center: BowtieItemType[];
  left: BowtieItemType[];
  right: BowtieItemType[];
  centerCount: number;
  leftCount: number;
  rightCount: number;
};

export const BowtieSummary: React.FC<Partial<QuestionnaireItem>> = ({
  data,
}) => {
  const sections = [data.leftSection, data.centerSection, data.rightSection];
  const [leftSectionOptions, centerSectionOptions, rightSectionOptions] =
    useOrganizeSections(sections);

  const renderSections = (
    options: OptionType,
    alignment: string,
    borderTop?: boolean
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: alignment,
        justifyContent: "center",
        gap: 5,
        width: "100%",
        ...(borderTop && {
          borderTop: 1,
          borderColor: "#BDBDBD",
          paddingTop: "20px",
        }),
      }}
    >
      <SectionBox
        label={data.leftLabelName}
        items={options.left}
        count={options.leftCount}
      />
      <SectionBox
        label={data.centerLabelName}
        items={options.center}
        count={options.centerCount}
      />
      <SectionBox
        label={data.rightLabelName}
        items={options.right}
        count={options.rightCount}
      />
    </Box>
  );

  return (
    <Box
      data-testid="bowtie-summary-id"
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
      {renderSections(
        {
          left: leftSectionOptions.correct,
          center: centerSectionOptions.correct,
          right: rightSectionOptions.correct,
          leftCount: 2,
          centerCount: 1,
          rightCount: 2,
        },
        "center"
      )}
      {renderSections(
        {
          left: leftSectionOptions.incorrect,
          center: centerSectionOptions.incorrect,
          right: rightSectionOptions.incorrect,
          leftCount: 3,
          centerCount: 3,
          rightCount: 3,
        },
        "start",
        true
      )}
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
        maxWidth: "200px",
        wordBreak: "break-all",
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
      {items.length >= count &&
        items.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 5,
              borderRadius: "7px",
              boxShadow: 2,
              maxWidth: "200px",
              wordBreak: "break-all",
            }}
          >
            {item.value}
          </Box>
        ))}
    </Box>
  );
};
