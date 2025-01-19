import { Box, Checkbox, SxProps, Typography } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { DDCquestion } from "./DDCQuestion";
import {
  AnswerOption,
  DDCAnswerOption,
  QuestionnaireItem,
} from "../../../../../../../../../../../../../types";
import { useStyle } from "../../../../../../../../../../../../../../../../hooks";
import { ParsedHtml } from "../../../../../../../../../../../../../../../../components";
import { BowtieSummary } from "./BowtieSummary";
import { MCQGroupSummary } from "./MCQGroupSummary";

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
      case "DDC":
        return (
          <DDCquestion
            ddcData={{
              answers: data.answers as DDCAnswerOption[],
              itemStem: data.itemStem,
            }}
          />
        );

      default:
        return (
          <Typography sx={wordWrap}>
            <ParsedHtml html={data.itemStem} />
          </Typography>
        );
    }
  };

  const renderQuestionTypeLabel = (data: QuestionnaireItem) => {
    if (data.questionType === "SATA") {
      return "Select All That Apply";
    } else if (data.questionType === "MRSN") {
      return `Select ${data.maxAnswer} That Apply`;
    } else if (data.questionType === "BOWTIE") {
      return `Bowtie`;
    } else if (data.questionType === "MCQGROUP") {
      return `MCQ GROUP`;
    }
    return null;
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
            <Typography
              marginTop="14px"
              fontSize="16px"
              color="#999999"
              fontWeight="700"
            >
              {renderQuestionTypeLabel(data)}
            </Typography>
            {data.questionType !== "DDC" && data.questionType !== "BOWTIE" && (
              <AnswerList answers={data.answers} />
            )}
            {data.questionType == "BOWTIE" && <BowtieSummary data={data} />}
            {data.questionType == "MCQGROUP" && <MCQGroupSummary data={data} />}
          </Box>
        ))
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};
