import { ChatBotActions } from "../../../components/chatbot/ChatBotActions";
import { render, act, screen, userEvent } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotActions", () => {
  it("should call onBackToStartClick when back to start button is clicked", async () => {
    const onBackToStartClick = jest.fn();
    render(<ChatBotActions onBackToStartClick={onBackToStartClick} />);

    await act(async () => {
      await userEvent.click(screen.getByTestId("back-to-start-btn"));
    });
    expect(onBackToStartClick).toHaveBeenCalled();
  });
});
