import { ChatBotOption } from "../../../../components/chatbot/content/ChatBotOption";
import { render, screen } from "../../../common";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotOption", () => {
  it("should render with correct text", () => {
    render(<ChatBotOption text="text" onClick={jest.fn()} />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ChatBotOption text="text" onClick={onClick} />);
    screen.getByText("text").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call onClick when clicked and disabled", () => {
    const onClick = jest.fn();
    render(<ChatBotOption text="text" onClick={onClick} disabled />);
    screen.getByText("text").click();
    expect(onClick).not.toHaveBeenCalled();
  });
});
