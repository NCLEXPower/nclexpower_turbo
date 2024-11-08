import { Box, Stack, Typography } from "@mui/material";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { EvaIcon } from "../../EvaIcon";
import { textInHtml } from "../../../types";
import { ParsedHtml } from "../../ParseHtml";
import { ChatBotMessageLoader } from "./ChatBotMessageLoader";
import { formatTime } from "../../../core";

interface Props {
  timestamp?: Date;
  loading?: boolean;
  text?: string;
}

export const ChatBotMessage: React.FC<Props> = ({
  loading,
  text,
  timestamp,
}) => {
  const [justNow, setJustNow] = useState<boolean>(
    !!(timestamp && differenceInMinutes(new Date(), timestamp) === 0)
  );
  const messages = text ? splitAnswerByLineBreaks(text).filter(textInHtml) : [];

  useEffect(() => {
    if (!timestamp) return;
    const intervalId = setTimeout(() => setJustNow(false), 1000 * 60);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <Stack spacing={1} className="message-wrapper" position="relative">
      <Typography
        variant="sublabel"
        aria-hidden="true"
        ml={(theme) => theme.spacing(9.5) + "!important"}
      >
        Alex-Bot
      </Typography>
      <Stack spacing={2} direction="row" alignItems="flex-end">
        <Box
          data-testid="assistant-logo"
          borderRadius="50%"
          bgcolor="#0c225c"
          minWidth={28}
          height={28}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ svg: { fill: (theme) => theme.palette.primary.contrastText } }}
        >
          <EvaIcon name="person-outline" width={22} height={22} ariaHidden />
        </Box>
        <Box component="span" className="visually-hidden">
          Virtual Assistant Says
        </Box>
        {loading && (
          <Box
            className="message-loader"
            py={3}
            px={2.5}
            bgcolor="appColors.incidental.035"
            borderRadius="6px 6px 6px 0px"
          >
            <Box className="visually-hidden">virtual_assistant_loading</Box>
            <ChatBotMessageLoader />
          </Box>
        )}
        {!!messages.length && (
          <Stack spacing={3}>
            {messages.map((html, idx) => (
              <Box
                key={idx}
                className="message-bubble"
                alignSelf="flex-start"
                width="fit-content"
                maxWidth="80%"
                borderRadius="6px 6px 6px 0px"
                bgcolor="appColors.incidental.035"
                color="text.primary"
                p={3}
              >
                <Typography
                  sx={{ overflowWrap: "break-word" }}
                  fontSize={(theme) => theme.typography.caption.fontSize}
                  variant="caption"
                >
                  {html}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
      {!!timestamp && (
        <Typography
          className="message-timestamp"
          aria-label="timestamp"
          variant="sublabel"
          ml={(theme) => theme.spacing(9.5) + "!important"}
        >
          {justNow ? "Just now" : formatTime(timestamp)}
        </Typography>
      )}
    </Stack>
  );

  function splitAnswerByLineBreaks(answers: string) {
    return answers.split("\n\n");
  }
};
