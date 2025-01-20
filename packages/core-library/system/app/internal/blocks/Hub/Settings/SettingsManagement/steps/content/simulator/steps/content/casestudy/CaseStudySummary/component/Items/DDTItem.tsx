/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React, { useCallback } from "react";
import { Box, FormControl, Typography } from "@mui/material";
import { PlainSelectField } from "../../../../../../../../../../../../../../../../components/Textfield/SelectField/PlainSelectField";
import { DDCAnswerOptionType } from "../../../../../../types";
import { ParsedHtml } from "../../../../../../../../../../../../../../../../components";
import { useSanitizedInputs } from "../../../../../../../../../../../../../../../../hooks";

export interface DDTQuestionProps {
  ddcData: {
    itemStem: string;
    answers: DDCAnswerOptionType[];
  };
}

export const DDTItem: React.FC<DDTQuestionProps> = ({ ddcData }) => {
  const { purifyInputs } = useSanitizedInputs({});
  const renderDropdown = useCallback(
    (optionName: string, answers: DDCAnswerOptionType[]) => {
      const answer = answers.find((ans) => ans.optionName === optionName);
      if (!answer) {
        return "No Content Available";
      }

      const defaultSelectedOption =
        answer.options?.find((option) => option.answerKey)?.answer || "";

      const mappedOptions =
        answer.options?.map((option) => ({
          value: option.answer,
          label: option.answer,
        })) || [];

      return (
        <FormControl
          variant="standard"
          key={optionName}
          sx={{ minWidth: "100%", height: "50%" }}
        >
          <PlainSelectField
            variant="standard"
            options={mappedOptions}
            defaultValue={defaultSelectedOption}
            displayEmpty
            disabledOptions
          />
        </FormControl>
      );
    },
    [PlainSelectField]
  );

  const renderContentWithDropdowns = useCallback(
    (itemStem: string, answers: DDCAnswerOptionType[]) => {
      const sanitizeItemStem = purifyInputs(itemStem) as string;
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizeItemStem, "text/html");
      const nonTableContent = Array.from(doc.body.childNodes)
        .filter((node) => node.nodeName !== "TABLE")
        .map((node, index) => {
          if (node.nodeName === "P") {
            return <Typography key={index}>{node.textContent}</Typography>;
          }
          return null;
        });

      const tableRows = Array.from(doc.querySelectorAll("tr"));

      const tableContent = (
        <table style={{ minWidth: "100px" }} className="tiptap-table">
          <colgroup>
            {Array.from(doc.querySelectorAll("colgroup col")).map(
              (_, index) => (
                <col key={index} />
              )
            )}
          </colgroup>
          <tbody>
            {tableRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="tiptap-row">
                {Array.from(row.querySelectorAll("td, th")).map(
                  (cell, cellIndex) => {
                    const placeholderMatch =
                      cell.textContent?.match(/\[\[(.*?)\]\]/);

                    if (placeholderMatch) {
                      const dropdown = renderDropdown(
                        placeholderMatch[1],
                        answers
                      );
                      return (
                        <td
                          key={cellIndex}
                          className={cell.className || "tiptap-cell"}
                        >
                          {dropdown}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIndex}
                        className={cell.className || "tiptap-cell"}
                      >
                        <Typography>{cell.textContent}</Typography>
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );

      return (
        <>
          {nonTableContent}
          <br />
          {tableContent}
        </>
      );
    },
    [renderDropdown]
  );

  return (
    <Box>{renderContentWithDropdowns(ddcData.itemStem, ddcData.answers)}</Box>
  );
};
