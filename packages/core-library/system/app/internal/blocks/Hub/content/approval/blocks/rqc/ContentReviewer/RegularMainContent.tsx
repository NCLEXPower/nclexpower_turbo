import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import { useSanitizedInputs } from "../../../../../../../../../../hooks";
import { ParsedHtml } from "../../../../../../../../../../components";

type Props = {
  mainContent: any;
};

export const MainContent: React.FC<Props> = ({ mainContent }) => {
  const { purifyInputs } = useSanitizedInputs({});

  const answerList = (item: any, index: number) => {
    const correctAnswer = item.mainContentAnswerCollections[0]?.answers.filter(
      (answerItem: any) => answerItem.answerKey === true
    );

    return (
      <div key={index}>
        {item.mainContentAnswerCollections[0]?.answers.map(
          (answerItem: any, idx: number) => (
            <ol key={idx} className="mb-4">
              <li>{answerItem.answer}</li>
            </ol>
          )
        )}
        <Box
          sx={{
            backgroundColor: "#0c215c",
            padding: 4,
            color: "#F3F3F3",
          }}
        >
          Correct Answers:
          {correctAnswer?.map((ans: any) => ans.answer).join(", ") ||
            "No correct answers found"}
        </Box>
      </div>
    );
  };

  return (
    <Box>
      {mainContent.map((item: any, index: number) => (
        <Box key={item.id} sx={{ marginBottom: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "flex-col",
              alignItems: "center",
              marginBottom: 4,
              gap: 2,
            }}
          >
            <Chip
              sx={{
                backgroundColor: "#0c215c",
                color: "#F3F3F3",
              }}
              label={item.main_type}
            />
            <Chip
              sx={{
                backgroundColor: "transparent",
                color: "#0c215c",
                border: "1px solid #0c215c",
              }}
              label={item.type}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: 4,
              color: "#0c215c",
            }}
          >
            <ParsedHtml html={item.question} />
          </Typography>
          <div className="flex flex-col">
            <Typography sx={{ fontSize: "1rem", color: "darkgrey" }}>
              Cognitive Level: {item.cognitiveLevel}
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "darkgrey" }}>
              Content Area: {item.contentArea}
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "darkgrey" }}>
              Client Needs: {item.clientNeeds}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#0c215c",
                marginTop: 4,
              }}
            >
              Answer Options :
            </Typography>
            {answerList(item, index)}
            <hr className="my-4" />
          </div>
        </Box>
      ))}
    </Box>
  );
};
