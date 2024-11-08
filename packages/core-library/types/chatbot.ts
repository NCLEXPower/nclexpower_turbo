export interface ChatBotOptionResponse {
  answerText: string;
  optionKey: string;
  optionText: string;
  subsequentOptions: { optionKey: string; optionText: string }[];
}
