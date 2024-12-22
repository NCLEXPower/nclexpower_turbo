import { renderHook, act } from "../../common";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useAnalytics } from "../../../hooks/analytics/useAnalytics";
import { useApi } from "../../../hooks/useApi";
import { useAccessToken } from "../../../contexts/auth/hooks";
import { getTimeZone } from "../../../utils";

jest.mock("@microsoft/signalr", () => ({
  HubConnectionBuilder: jest.fn().mockImplementation(() => ({
    withUrl: jest.fn().mockReturnThis(),
    configureLogging: jest.fn().mockReturnThis(),
    build: jest.fn(() => ({
      start: jest.fn(() => Promise.resolve()),
      on: jest.fn(),
      off: jest.fn(),
      stop: jest.fn(),
    })),
  })),
  LogLevel: {
    Information: "Information",
  },
}));

jest.mock("../../../hooks/useApi", () => ({
  useApi: jest.fn(() => ({
    result: { data: null },
  })),
}));

jest.mock("../../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn(() => ["mockAccessToken"]),
}));

jest.mock("../../../utils", () => ({
  getTimeZone: jest.fn(() => "Mock/TimeZone"),
}));

jest.mock("../../../config", () => ({
  config: {
    value: {
      API_URL: "https://api.example.com",
      LOCAL_API_URL: "http://localhost:5000",
      XAPIKEY: "mockXApiKey",
      SYSENV: "mockEnv",
    },
  },
}));

describe("useAnalytics", () => {
  let mockConnection: Partial<HubConnection>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConnection = {
      start: jest.fn().mockResolvedValue(undefined),
      on: jest.fn(),
      off: jest.fn(),
      stop: jest.fn(),
    };

    jest.mocked(HubConnectionBuilder).mockImplementation(
      () =>
        ({
          withUrl: jest.fn().mockReturnThis(),
          configureLogging: jest.fn().mockReturnThis(),
          build: jest.fn(() => mockConnection),
        }) as any
    );

    jest.mocked(useAccessToken).mockReturnValue(["mockAccessToken"] as any);
    jest.mocked(useApi).mockImplementation(
      (callback) =>
        ({
          result: {
            data: {
              timePeriodSales: [],
              productSales: [],
              repeatSales: [],
              demographicSales: [],
              salesPercentage: [],
            },
          },
        }) as any
    );
    jest.mocked(getTimeZone).mockReturnValue("UTC");
  });

  it("should initialize with null analyticsData and isConnected as false", () => {
    const initialData = {
      timePeriodSales: [],
      productSales: [],
      repeatSales: [],
      demographicSales: [],
      salesPercentage: [],
    };
    jest.mocked(useApi).mockImplementation(
      () =>
        ({
          result: { data: initialData },
        }) as any
    );
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.analyticsData).toEqual(initialData);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.connection).not.toBeNull();
  });

  it("should handle real-time analytics updates", async () => {
    const mockData = {
      timePeriodSales: [],
      productSales: [],
      repeatSales: [],
      demographicSales: [],
      salesPercentage: [],
    };

    (mockConnection.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "ReceiveAnalyticsUpdates") {
        callback(mockData);
      }
    });

    const { result } = renderHook(() => useAnalytics());

    expect(result.current.analyticsData).toEqual(mockData);
  });

  it("should initialize with null analyticsData and isConnected as false", () => {
    const mockData = {
      timePeriodSales: [],
      productSales: [],
      repeatSales: [],
      demographicSales: [],
      salesPercentage: [],
    };
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.analyticsData).toEqual(mockData);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.connection).not.toBeNull();
  });

  it("should connect to SignalR hub and set isConnected to true", async () => {
    const { result } = renderHook(() => useAnalytics());

    await act(async () => {
      await mockConnection.start!();
    });

    expect(mockConnection.start).toHaveBeenCalled();
    expect(result.current.isConnected).toBe(true);
  });

  it("should fetch initial analytics data if available", () => {
    const initialData = {
      timePeriodSales: [],
      productSales: [],
      repeatSales: [],
      demographicSales: [],
      salesPercentage: [],
    };

    jest.mocked(useApi).mockImplementation(
      () =>
        ({
          result: { data: initialData },
        }) as any
    );

    const { result } = renderHook(() => useAnalytics());
    expect(result.current.analyticsData).toEqual(initialData);
  });

  it("should stop the connection on unmount", () => {
    const { unmount } = renderHook(() => useAnalytics());

    unmount();

    expect(mockConnection.stop).toHaveBeenCalled();
  });

  it("should handle SignalR connection failure", async () => {
    (mockConnection.start as jest.Mock).mockRejectedValue(
      new Error("Connection failed")
    );

    const { result } = renderHook(() => useAnalytics());

    await act(async () => {
      try {
        await mockConnection.start!();
      } catch {}
    });

    expect(mockConnection.start).toHaveBeenCalled();
    expect(result.current.isConnected).toBe(false);
  });

  it("should clean up SignalR listeners on unmount", () => {
    const { unmount } = renderHook(() => useAnalytics());

    unmount();

    expect(mockConnection.off).toHaveBeenCalledWith("ReceiveAnalyticsUpdates");
  });
});
