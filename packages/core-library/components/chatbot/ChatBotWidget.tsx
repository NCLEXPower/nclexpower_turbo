/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ClickAwayListener, Paper, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuthContext } from "../../contexts";
import {
  useChatBotConversation,
  useCloseOnEscClick,
  useTrapContainerFocus,
} from "./hooks";
import { ChatBotToggleButton } from "./ChatBotToggleButton";
import { ChatBotHeader } from "./ChatBotHeader";
import { ChatBotContent } from "./content/ChatBotContent";
import { ChatBotActions } from "./ChatBotActions";

interface Props {}

export const ChatBotWidget: React.FC<Props> = ({}) => {
  const { isAuthenticated } = useAuthContext();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatBotConversation = useChatBotConversation();
  useCloseOnEscClick(open, handleClose);
  useTrapContainerFocus(open, containerRef);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack
        id="helpWidget"
        data-testid="help-widget"
        sx={{
          "& .fixed": {
            position: "fixed",
            zIndex: 1000,
            "&#startVirtualAssistant": {
              right: (theme) => theme.spacing(8),
              bottom: (theme) => theme.spacing(8),
            },
          },
        }}
      >
        <ChatBotToggleButton
          className="fixed"
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
        />
        <Paper
          className="fixed"
          role="region"
          aria-labelledby="chatbot-title"
          elevation={8}
          tabIndex={open ? 0 : -1}
          sx={(theme) => ({
            right: theme.spacing(8),
            bottom: `calc(${theme.spacing(14)} + 48px)`,
            borderRadius: "16px",
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(120%)",
            transition: "all 0.3s ease-out",
            [theme.breakpoints.down("sm")]: {
              position: "fixed",
              left: theme.spacing(4),
              right: theme.spacing(4),
              top: theme.spacing(4),
              bottom: theme.spacing(4),
              "#chatbot-window": {
                height: `calc(100vh - ${theme.spacing(8)})`,
                width: "100%",
              },
            },
          })}
        >
          <Stack id="chatbot-window" width={360} ref={containerRef}>
            <ChatBotHeader onClose={handleClose} />
            <ChatBotContent
              isOpen={open}
              isLoading={chatBotConversation.loading}
              allOptions={chatBotConversation.allOptions}
              selectedOptionText={chatBotConversation.selectedOptionText}
              onOptionSelected={chatBotConversation.selectOption}
            />
            <ChatBotActions onBackToStartClick={handleBackToStartClick} />
          </Stack>
        </Paper>
      </Stack>
    </ClickAwayListener>
  );

  function handleOpen() {
    setOpen(true);
    if (
      !chatBotConversation.loading &&
      !chatBotConversation.allOptions.length
    ) {
      chatBotConversation.start();
    }
  }

  function handleBackToStartClick() {
    chatBotConversation.start();
  }

  function handleClose() {
    setOpen(false);
    focusSkipContainer();
    clearFocus();
  }

  async function handleClickAway() {
    if (open) {
      handleClose();
    }
  }

  function clearFocus() {
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();
  }

  function focusSkipContainer() {
    const firstFocusableSkipContainerElement = document
      .getElementById("skipContainer")
      ?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

    if (firstFocusableSkipContainerElement) {
      firstFocusableSkipContainerElement.focus({ preventScroll: true });
    }
  }
};
