import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { ChatBotOptionsSegment } from "../hooks";
import { ChatBotMessage } from "./ChatBotMessage";
import { ChatBotOption } from "./ChatBotOption";
import { ChatBotSelectedOption } from "./ChatBotSelectedOption";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  allOptions: ChatBotOptionsSegment[];
  selectedOptionText?: string;
  onOptionSelected(answerKey: string): void;
}

export const ChatBotContent: React.FC<Props> = ({
  isOpen,
  isLoading,
  allOptions,
  selectedOptionText,
  onOptionSelected,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastSegmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      isOpen && scrollToBottom();
    }, 100);
  }, [isOpen, isLoading, allOptions, selectedOptionText]);

  return (
    <Stack
      id="chatbot-content"
      data-testid="chatbot-content"
      tabIndex={isOpen ? 0 : -1}
      aria-live="polite"
      height={480}
      maxHeight={{ sm: "45vh", md: "60vh", lg: "unset" }}
      flex={{ xs: 1, sm: "unset" }}
      spacing={3}
      px={4}
      py={3}
      ref={ref}
      sx={{ overflowY: "scroll", overflowX: "hidden" }}
    >
      <Box flex={1}>
        {allOptions.map((option, index) => (
          <Stack
            key={index}
            ref={index === allOptions.length - 1 ? lastSegmentRef : undefined}
            className="virtual-assistant-chat"
            spacing={3}
          >
            <ChatBotMessage
              text={option.answerText}
              timestamp={option.timestamp}
            />
            {!!option.subsequentOptions.length && (
              <Stack
                className="options"
                position="relative"
                alignItems="flex-end"
              >
                <Box component="span" className="visually-hidden"></Box>
                <Stack
                  component="ul"
                  className="options-list"
                  spacing={3}
                  alignItems="flex-end"
                  sx={{
                    listStyle: "none",
                    marginBlock: 0,
                    li: { display: "flex", justifyContent: "flex-end" },
                  }}
                >
                  {option.subsequentOptions.map((subOption) => (
                    <li key={subOption.optionKey}>
                      <ChatBotOption
                        text={subOption.optionText}
                        disabled={disableSubsequentOptions(index) || isLoading}
                        onClick={handleOptionSelect(
                          subOption.optionKey,
                          subOption.optionText
                        )}
                      />
                    </li>
                  ))}
                </Stack>
                {!!optionSelectionText(index) && (
                  <ChatBotSelectedOption text={optionSelectionText(index)!} />
                )}
              </Stack>
            )}
          </Stack>
        ))}
        {isLoading && <ChatBotMessage loading />}
      </Box>
    </Stack>
  );

  function scrollToBottom() {
    if (!ref.current) return;
    if (isLoading) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
      return;
    }
    const top = lastSegmentRef.current
      ? lastSegmentRef.current.offsetTop - 68
      : ref.current.scrollHeight;
    ref.current.scrollTo({ top: top, behavior: "smooth" });
  }

  function handleOptionSelect(optionKey: string, optionText: string) {
    return () => {
      onOptionSelected(optionKey);
    };
  }

  function disableSubsequentOptions(index: number) {
    return !!(allOptions[index + 1]?.optionKey || selectedOptionText);
  }

  function optionSelectionText(index: number) {
    const nextOption = allOptions[index + 1];
    if (
      nextOption &&
      nextOption.optionText &&
      nextOption.optionText !== "START"
    ) {
      return nextOption.optionText;
    }
    return selectedOptionText;
  }
};
