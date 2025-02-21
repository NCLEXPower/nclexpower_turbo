import { Box, Checkbox, SxProps, Typography } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { DDCItem } from "./DDCItem";
import {
  AnswerOption,
  DDClozeTableAnswerOption,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { useStyle } from "../../../../../../../../../../../../../../../../hooks";
import { ParsedHtml } from "../../../../../../../../../../../../../../../../components";
import { DDTItem } from "./DDTItem";
import { BowtieSummary } from "./BowtieSummary";
import { MCQGroupSummary } from "./MCQGroupSummary";
import { MCQNoGroupSummary } from "./MCQNoGroupSummary";
import { HCPQuestion } from "./HCPQuestion";
import { DNDQuestion } from "./DNDQuestion";
import { DNDSummary } from "./DNDSummary";
import { DNDAnswerOptionType } from "../../../../../../types";

const AnswerList: React.FC<{ answers: AnswerOption[] }> = ({ answers }) => {
  return (
    <Box marginTop="10px">
      {answers?.length > 0 &&
        answers.map((answer, index) => (
          <Box display="flex" alignItems="center" paddingX="10px" key={index}>
            <Checkbox disabled checked={answer.answerKey} />
            <Typography fontSize="16px">{answer.answer}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export const Items: React.FC<{ content: QuestionnaireItem[] }> = ({
  content,
}) => {
  const { wordWrap } = useStyle();

  const renderQuestionType = (data: QuestionnaireItem) => {
    switch (data.questionType) {
      case "DDCloze":
        return (
          <DDCItem
            ddcData={{
              answers: data.answers as DDClozeTableAnswerOption[],
              itemStem: data.itemStem,
            }}
          />
        );
      case "DDTable":
        return (
          <DDTItem
            ddcData={{
              answers: data.answers as DDClozeTableAnswerOption[],
              itemStem: data.itemStem,
            }}
          />
        );
      case "Highlight":
        return <HCPQuestion questionData={data} />;
      case "DNDrop":
        return <DNDQuestion questionData={data} />;
      default:
        return (
          <Typography sx={wordWrap}>
            <ParsedHtml html={data.itemStem} />
          </Typography>
        );
    }
  };

  const renderAnswerOption = (data: QuestionnaireItem) => {
    switch (data.questionType) {
      case "Highlight":
      case "SATA":
      case "MRSN":
        return <AnswerList answers={data.answers as AnswerOption[]} />;
      case "Bowtie":
        return <BowtieSummary data={data} />;
      case "MatrixNoGrp":
        return <MCQNoGroupSummary data={data} />;
      case "MatrixWithGrp":
        return <MCQGroupSummary data={data} />;
      case "DNDrop":
        return <DNDSummary answers={data.answers as DNDAnswerOptionType[]} />;
      default:
        return null;
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="24px"
      border="1px solid #0C225C"
      marginTop="-48px"
      height="512px"
      overflow="auto"
      borderRadius="5px"
    >
      {content.length > 0 ? (
        content.map((data, index) => (
          <Box paddingBottom="14px" key={index}>
            <Box display="flex" flexDirection="column" gap="4px" sx={wordWrap}>
              {data.transitionHeader && (
                <Typography
                  sx={{
                    "& *": {
                      margin: 0,
                      padding: 0,
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    },
                  }}
                >
                  <ParsedHtml html={data.transitionHeader} />
                </Typography>
              )}
              <Box display="flex" gap="10px">
                <NearMeIcon sx={{ color: "#D4AEF2", rotate: "45deg" }} />
                {renderQuestionType(data)}
              </Box>
            </Box>
            {renderAnswerOption(data)}
          </Box>
        ))
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};
