import { formatTime } from "../../../../core";
import { ChatBotMessage } from "../../../../components/chatbot/content/ChatBotMessage";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotMessage", () => {
  it("should render with correct text", () => {
    render(<ChatBotMessage text="text" />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it("should display logo", () => {
    render(<ChatBotMessage text="text" />);
    expect(screen.getByTestId("assistant-logo")).toBeInTheDocument();
  });

  it('should display "just now" when provided timestamp date is not older than 1 minute', () => {
    render(<ChatBotMessage text="text" timestamp={new Date()} />);
    expect(screen.getByText("Just now")).toBeInTheDocument();
  });

  it("should display exact time when provided timestamp date is older than 1 minute", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 2);
    render(<ChatBotMessage text="text" timestamp={date} />);
    expect(screen.getByText(formatTime(date))).toBeInTheDocument();
  });

  it("should display loader when loading is true", () => {
    render(<ChatBotMessage text="text" loading={true} />);
    expect(screen.getByTestId("chatbot-message-loader")).toBeInTheDocument();
  });
});
