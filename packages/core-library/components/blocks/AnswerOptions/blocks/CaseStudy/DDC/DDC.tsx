import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Card } from "../../../../../Card/Card";
import { Box } from "@mui/material";
import { extractValues } from "./extractValues";
import { DDCTable } from "./DDCtable";
import { ContainedCaseStudyQuestionType } from "../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

type DDCAnswerOptionPropsType = {
  questionIndex: number;
};

export const DDClozeAndTable: React.FC<DDCAnswerOptionPropsType> = ({
  questionIndex,
}) => {
  const { setValue, getValues } =
    useFormContext<ContainedCaseStudyQuestionType>();
  const { questionnaires } = getValues();

  const extractedValue = useMemo(() => {
    if (!questionnaires) return [];
    const itemStem = questionnaires[questionIndex].itemStem;
    return extractValues(itemStem ?? "");
  }, [questionnaires[questionIndex].itemStem]);

  useEffect(() => {
    if (extractedValue) {
      extractedValue.map((value, index) => {
        setValue(
          `questionnaires.${questionIndex}.answers.${index}.optionName`,
          value
        );
      });
    }
  }, [extractedValue]);

  return (
    <Card>
      <Box gap={2} display="flex" flexDirection="column">
        {extractedValue.length > 0 &&
          extractedValue.map((optionName, index) => (
            <DDCTable
              questionIndex={questionIndex}
              optionName={optionName}
              answerOptionIndex={index}
              key={index}
            />
          ))}
      </Box>
    </Card>
  );
};
