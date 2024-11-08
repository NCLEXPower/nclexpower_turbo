/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React, { useEffect, useState } from "react";
import { ChatBotOptionResponse } from "../../types/chatbot";
import { useApiCallback } from "../../hooks";
import { useSessionStorage } from "../../hooks";

export type ChatBotOptionsSegment = ChatBotOptionResponse & { timestamp: Date };

export const useChatBotConversation = () => {
  const [preservedChatHistory, setPreservedChatHistory] = useSessionStorage<
    ChatBotOptionsSegment[]
  >("chat-history", []);
  const [allOptions, setAllOptions] =
    useState<ChatBotOptionsSegment[]>(preservedChatHistory);
  const [selectedOptionText, setSelectedOptionText] = useState<string>();
  const [loading, setLoading] = useState(false);
  const chatBotOptionCb = useApiCallback((api, optionKey?: string) =>
    api.web.web_chatbot_question_nodes(optionKey)
  );

  useEffect(() => {
    setPreservedChatHistory(allOptions);
  }, [allOptions]);

  useEffect(() => {
    if (chatBotOptionCb.error) {
      setAllOptions((prev) => [
        ...prev,
        {
          answerText: "Something went wrong",
          optionKey: "",
          optionText: "",
          subsequentOptions: [],
          timestamp: new Date(),
        },
      ]);
      setSelectedOptionText(undefined);
      setLoading(false);
    }
  }, [chatBotOptionCb.error]);

  useEffect(() => {
    if (!!chatBotOptionCb.result?.data) {
      setAllOptions((prev) => [
        ...prev,
        { ...chatBotOptionCb.result?.data!, timestamp: new Date() },
      ]);
      setSelectedOptionText(undefined);
      setLoading(false);
    }
  }, [chatBotOptionCb.result?.data]);

  function selectOption(optionKey: string) {
    if (!chatBotOptionCb.result?.data && !preservedChatHistory.length) return;
    setLoading(true);
    const optionText = (
      chatBotOptionCb.result?.data || preservedChatHistory.at(-1)
    )?.subsequentOptions.find((o) => o.optionKey === optionKey)?.optionText;
    setSelectedOptionText(optionText);
    chatBotOptionCb.execute(optionKey);
  }

  // start convo from our virtual assistant.
  function start() {
    setLoading(true);
    chatBotOptionCb.execute();
  }

  return { loading, allOptions, selectedOptionText, selectOption, start };
};

//close when customer tries to press escape button. Use this to other functionality when necessary
export const useCloseOnEscClick = (isOpen: boolean, onClose: VoidFunction) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);
};

export const useTrapContainerFocus = (
  isOpen: boolean,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent =
      containerRef.current?.querySelectorAll<HTMLElement>(focusableElements);
    const firstFocusableElement = focusableContent?.[0];
    const lastFocusableElement =
      focusableContent?.[focusableContent.length - 1];
    const trapFocus = (e: KeyboardEvent) => {
      const isTabPressed = e.key === "Tab" || e.code === "Tab";
      if (!isTabPressed) return;

      if (
        e.shiftKey &&
        (document.activeElement === firstFocusableElement ||
          document.activeElement ===
            document.getElementById("startVirtualAssistant"))
      ) {
        lastFocusableElement?.focus();
        e.preventDefault();
        return;
      }

      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen]);
};
