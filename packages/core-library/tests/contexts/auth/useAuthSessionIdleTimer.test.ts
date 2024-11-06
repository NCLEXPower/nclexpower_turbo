import { useIdleTimer } from "react-idle-timer";
import { useAuthSessionIdleTimer } from "../../../contexts/auth/hooks/useAuthSessionIdleTimer";
import { renderHook } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: { BASEAPP: "webc_app" } },
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  useAuthSession: jest
    .fn()
    .mockReturnValue(["auth_session", jest.fn(), jest.fn()]),
}));
jest.mock("../../../hooks/useSessionStorage");
jest.mock("../../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest.fn().mockImplementation(() => ({
    loading: false,
    execute: jest.fn(),
  })),
}));

jest.mock("react-idle-timer");

describe("useAuthSessionIdleTimer", () => {
  const mockOnSessionExpired = jest.fn();
  const mockUseIdleTimer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIdleTimer.mockReturnValue({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
      message: jest.fn(),
    });

    jest.mocked(useIdleTimer).mockImplementation(mockUseIdleTimer);
  });

  it("should call useIdleTimer with correct configuration", () => {
    jest.mock("../../../config", () => ({
      config: { value: { BASEAPP: "webc_app" } },
    }));
    jest.mocked(useIdleTimer).mockImplementation(mockUseIdleTimer);

    renderHook(() =>
      useAuthSessionIdleTimer({
        onSessionExpired: mockOnSessionExpired,
      })
    );
    expect(mockUseIdleTimer).toHaveBeenCalled();
    const config = mockUseIdleTimer.mock.calls[0][0];
    expect(config).toMatchObject({
      onIdle: expect.any(Function),
      onAction: expect.any(Function),
      startManually: true,
      stopOnIdle: true,
      debounce: 400,
      crossTab: true,
      syncTimers: 400,
      timeout: 10 * 6000,
      onMessage: expect.any(Function),
      name: undefined,
    });
  });

  it("should not initialize useIdleTimer when app is not match", () => {
    jest.resetModules();
    jest.doMock("../../../config", () => ({
      config: { value: { BASEAPP: "webdev_app" } },
    }));

    const {
      useAuthSessionIdleTimer,
    } = require("../../../contexts/auth/hooks/useAuthSessionIdleTimer");

    renderHook(() =>
      useAuthSessionIdleTimer({
        onSessionExpired: mockOnSessionExpired,
      })
    );

    expect(mockUseIdleTimer).not.toHaveBeenCalled();
  });
});
