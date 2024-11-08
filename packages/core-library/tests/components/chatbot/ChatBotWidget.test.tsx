import { ChatBotWidget } from "../../../components";
import { useAuthContext } from "../../../contexts";
import { render, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts/auth/AuthContext");

jest.mock("../../../components/chatbot/hooks", () => ({
  useTrapContainerFocus: jest.fn(),
  useCloseOnEscClick: jest.fn(),
  useChatBotConversation: () => ({
    loading: false,
    allOptions: [],
    selectedOptionText: "",
    selectOption: jest.fn(),
    start: jest.fn(),
  }),
}));

describe("ChatBotWidget", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render null when unauthenticated", () => {
    jest
      .mocked(useAuthContext)
      .mockReturnValue({ isAuthenticated: false } as any);
    render(<ChatBotWidget />);
    expect(screen.queryByTestId("help-widget")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("chatbot-toggle-button")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-actions")).not.toBeInTheDocument();
  });

  it("should render all needed components when authenticated", async () => {
    jest
      .mocked(useAuthContext)
      .mockReturnValue({ isAuthenticated: true } as any);
    render(<ChatBotWidget />);
    expect(screen.queryByTestId("help-widget")).toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-toggle-button")).toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-header")).toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-content")).toBeInTheDocument();
    expect(screen.queryByTestId("chatbot-actions")).toBeInTheDocument();
  });
});
