import { ChatBotSelectedOption } from "../../../../components/chatbot/content/ChatBotSelectedOption";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotSelectedOption", () => {
  it("should render with correct text", () => {
    render(<ChatBotSelectedOption text="text" />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});
