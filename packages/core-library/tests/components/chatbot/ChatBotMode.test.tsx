import { render, screen } from "@testing-library/react";
import { useApiCallback } from "../../../hooks";
import { ChatbotMode } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/ChatbotManagement/ChatbotMode";

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

    const { getByTestId } = render(
      <ChatbotMode {...DEFAULT_PROPS} values={{}} />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
  });
});
