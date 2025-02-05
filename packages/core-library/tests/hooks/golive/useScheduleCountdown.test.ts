import { renderHook, act } from "../../common";
import { useScheduleCountdown } from "../../../hooks";
import { useApi } from "../../../hooks";
import { useRouter } from "../../../core";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useApi", () => ({
  useApi: jest.fn(),
}));

describe("useScheduleCountdown", () => {
  const mockUseApi = useApi as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseApi.mockReturnValue({
      result: {
        data: null,
      },
    });
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useScheduleCountdown());
    expect(result.current.daysRemaining).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.schedule).toBeUndefined();
  });

  it("should set daysRemaining and schedule when API returns data", async () => {
    jest.mocked(useApi).mockReturnValue({
      result: {
        data: {
          daysRemaining: 5,
          schedule: { id: "test-schedule" },
        },
      },
    } as any);
    const { result } = renderHook(() => useScheduleCountdown());
    expect(result.current.daysRemaining).toBeUndefined();
    expect(result.current.schedule).toBeUndefined();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.daysRemaining).toBe(5);
    expect(result.current.schedule).toEqual({ id: "test-schedule" });
    expect(result.current.error).toBeNull();
  });
});
