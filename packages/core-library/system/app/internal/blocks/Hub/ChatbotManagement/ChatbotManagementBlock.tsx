import React from "react"
import { ChatbotManagement } from "./ChatbotManagement"
import { ChatbotOptionType } from "./validation";

export const ChatbotManagementBlock: React.FC = () => {

  function onSubmit(values: ChatbotOptionType) {
    console.log(values)
  }

  return (
    <ChatbotManagement onSubmit={onSubmit} />
  )
}