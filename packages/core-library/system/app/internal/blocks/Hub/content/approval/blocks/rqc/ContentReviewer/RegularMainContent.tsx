import { Box, Typography } from "@mui/material";
import React from "react";
import { ParsedHtml } from "../../../../../../../../../../components";
import {
  MainContentAnswerCollection,
  MainContentCollection,
} from "../../../../../../../../../../api/types";

type Props = {
  mainContent: MainContentCollection[];
};

export const RegularMainContent: React.FC<Props> = ({ mainContent }) => {
  const answerList = (item: MainContentCollection, index: number) => {
    const dataArray = item.mainContentAnswerCollections;
    const correctAnswer = dataArray.filter(
      (answerItem: MainContentAnswerCollection) => answerItem.answerKey === true
    );
    return (
      <div key={index}>
        {dataArray.length > 0 &&
          dataArray.map(
            (answerItem: MainContentAnswerCollection, idx: number) => (
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
          {(correctAnswer.length > 0 &&
            correctAnswer
              ?.map((ans: MainContentAnswerCollection) => ans.answer)
              .join(", ")) ||
            "No correct answers found"}
        </Box>
      </div>
    );
  };

  return (
    <Box>
      {mainContent.length > 0 ? (
        mainContent.map((item: MainContentCollection, index: number) => (
          <Box key={item.id} sx={{ marginBottom: 4 }}>
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
        ))
      ) : (
        <Box
          sx={{
            marginBottom: 4,
            width: "100%",
            hieght: "100%",
            display: "flex",
            justifyContent: "Center",
            alignItems: "Center",
          }}
        >
          <Typography variant="subtitle1" marginBottom="4px">
            No Content Found!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
