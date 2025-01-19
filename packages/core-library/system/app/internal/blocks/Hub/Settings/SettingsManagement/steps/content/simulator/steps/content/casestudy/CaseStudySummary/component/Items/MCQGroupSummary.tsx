import React from "react";
import {
  MCQChoiceType,
  MCQRowType,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { Box, Checkbox, Typography } from "@mui/material";

export const MCQGroupSummary: React.FC<Partial<QuestionnaireItem>> = ({
  data,
}) => {
  return (
    <Box
      sx={{
        padding: 5,
        width: "100%",
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        {data.columns.length > 0 &&
          data.columns.map((item: { label: string }, colIndex: number) => (
            <Box
              sx={{
                minWidth: "150px",
                maxWidth: "150px",
                minHeight: "60px",
                borderWidth: "2px",
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                flexGrow: 1,
              }}
              key={colIndex}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  wordBreak: "break-word",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {data.rows.map((row: MCQRowType, rowIndex: number) => (
          <Box sx={{ display: "flex", width: "100%" }} key={rowIndex}>
            <Typography
              sx={{
                minWidth: "150px",
                maxWidth: "150px",
                minHeight: "60px",
                borderWidth: "2px",
                borderColor: "black",
                display: "flex",
                alignItems: "center",
                padding: 5,
                wordBreak: "break-word",
              }}
            >
              {row.rowTitle}
            </Typography>
            {row.choices.map((choice: MCQChoiceType) => (
              <Box
                sx={{
                  minWidth: "150px",
                  maxWidth: "150px",
                  minHeight: "60px",
                  borderWidth: "2px",
                  borderColor: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={choice.choiceId}
              >
                <Checkbox checked={choice.value} disabled />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
