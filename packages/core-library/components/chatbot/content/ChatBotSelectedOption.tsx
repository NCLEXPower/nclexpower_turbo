import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  text: string;
}

export const ChatBotSelectedOption: React.FC<Props> = ({ text }) => {
  return (
    <Stack
      className="selected-option"
      position="relative"
      width="100%"
      mt={3}
      mb={3}
      alignItems="flex-end"
    >
      <Box component="span" className="visually-hidden">
        virtual_assistant_user_question
      </Box>
      <Box
        p={3}
        alignSelf="flex-end"
        width="fit-content"
        maxWidth="80%"
        borderRadius="6px 6px 0px 6px"
        bgcolor="#0c225c"
        color="primary.contrastText"
      >
        <Typography
          sx={{ overflowWrap: "break-word" }}
          fontSize={(theme) => theme.typography.caption.fontSize}
          variant="caption"
        >
          {text}
        </Typography>
      </Box>
    </Stack>
  );
};
