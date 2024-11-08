import { ComponentProps } from "react";
import { ChatBotContent } from "../../../../components/chatbot/content/ChatBotContent";
import { render, screen, userEvent, act } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const DEFAULT_OPTION = {
  answerText: "answerText",
  optionKey: "selectedOptionKey",
  optionText: "selectedOptionText",
  timestamp: new Date(Date.now()),
  subsequentOptions: [
    { optionKey: "optionKey1", optionText: "optionText1" },
    { optionKey: "optionKey2", optionText: "optionText2" },
  ],
};

const DEFAULT_VALUES: ComponentProps<typeof ChatBotContent> = {
  isOpen: true,
  isLoading: false,
  allOptions: [DEFAULT_OPTION],
  selectedOptionText: DEFAULT_OPTION.optionText,
  onOptionSelected: jest.fn(),
};

describe("ChatBotContent", () => {
  beforeEach(() => {
    const scrollToMock = jest.fn();
    Object.defineProperty(window, "scrollTo", { value: scrollToMock });
    Object.defineProperty(HTMLDivElement.prototype, "scrollTo", {
      value: scrollToMock,
      writable: true,
    });
  });

  it("should render passed answer, options and selected option", () => {
    render(<ChatBotContent {...DEFAULT_VALUES} />);
    expect(screen.getByText(DEFAULT_OPTION.answerText)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_OPTION.optionText)).toBeInTheDocument();
    DEFAULT_OPTION.subsequentOptions.forEach((option) =>
      expect(screen.getByText(option.optionText)).toBeInTheDocument()
    );
  });

  it("should render enabled options if selected option is not present", () => {
    render(
      <ChatBotContent {...DEFAULT_VALUES} selectedOptionText={undefined} />
    );
    DEFAULT_OPTION.subsequentOptions.forEach((option) =>
      expect(screen.getByText(option.optionText).parentElement).toBeEnabled()
    );
  });

  it("should render loader when loading is true", () => {
    render(<ChatBotContent {...DEFAULT_VALUES} isLoading={true} />);
    expect(screen.getByTestId("chatbot-message-loader")).toBeInTheDocument();
  });

  it("should call onOptionSelected when option is clicked", async () => {
    const onOptionSelected = jest.fn();
    render(
      <ChatBotContent
        {...DEFAULT_VALUES}
        selectedOptionText={undefined}
        onOptionSelected={onOptionSelected}
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByText("optionText1"));
    });
    expect(onOptionSelected).toHaveBeenCalledWith("optionKey1");
  });
});
