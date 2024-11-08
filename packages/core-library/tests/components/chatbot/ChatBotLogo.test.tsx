import { ChatBotLogo } from "../../../components/chatbot/ChatBotLogo";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotLogo", () => {
  it("should render with correct dimensions", () => {
    render(<ChatBotLogo width={10} height={10} />);
    expect(screen.getByTestId("company-logo")).toHaveAttribute("width", "10");
    expect(screen.getByTestId("company-logo")).toHaveAttribute("height", "10");
  });
});
