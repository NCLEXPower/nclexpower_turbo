import { render, screen } from "@testing-library/react";
import { useApiCallback } from "../../../hooks";
import { ChatbotMode } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/ChatbotManagement/ChatbotMode";
import { useChatBotMode } from "../../../hooks/useChatBotMode";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../contexts", () => ({
  useExecuteToast: jest.fn(() => ({
    showToast: jest.fn(),
  })),
}));
jest.mock("../../../hooks/useChatBotMode", () => ({
  useChatBotMode: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useApiCallback: jest.fn(),
  useCustomAction: jest.fn(),
}));

describe("ChatbotMode", () => {
  const DEFAULT_PROPS = {
    nextStep: jest.fn(),
    previousStep: jest.fn(),
    previous: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when chatbot is loading", () => {
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      loading: true,
    });

    (useChatBotMode as jest.Mock).mockReturnValue({
      data: 0,
      loading: true,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(
      <ChatbotMode {...DEFAULT_PROPS} values={{}} />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
  });

  it("should render chatbot mode view when not loading", () => {
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      loading: false,
    });

    (useChatBotMode as jest.Mock).mockReturnValue({
      data: 0,
      loading: false,
      refetch: jest.fn(),
    });

    render(<ChatbotMode {...DEFAULT_PROPS} values={{}} />);

    expect(screen.getByTestId("chatbot-mode-id")).toBeInTheDocument();
  });
});
