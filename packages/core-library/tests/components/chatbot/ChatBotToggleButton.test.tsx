import { ChatBotToggleButton } from "../../../components/chatbot/ChatBotToggleButton";
import { render, act, screen, userEvent } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("ChatBotToggleButton", () => {
  it("should render", () => {
    render(
      <ChatBotToggleButton
        isOpen={false}
        onOpen={jest.fn()}
        onClose={jest.fn()}
      />
    );
  });

  it("should call onOpen when button is clicked", async () => {
    const onOpen = jest.fn();
    render(
      <ChatBotToggleButton isOpen={false} onOpen={onOpen} onClose={jest.fn()} />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("chatbot-toggle-button"));
    });
    expect(onOpen).toHaveBeenCalled();
  });
});
