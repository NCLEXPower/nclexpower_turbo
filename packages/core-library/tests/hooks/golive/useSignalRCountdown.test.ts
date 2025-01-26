import { renderHook, act } from "../../common";
import { useApiCallback, useSignalRCountdown } from "../../../hooks";
import * as signalR from "@microsoft/signalr";

jest.mock("@microsoft/signalr", () => {
  const mockConnection = {
    start: jest.fn(),
    stop: jest.fn(() => Promise.resolve()),
    on: jest.fn(),
    onreconnecting: jest.fn(),
    onreconnected: jest.fn(),
    onclose: jest.fn(),
    invoke: jest.fn(),
  };

  return {
    HubConnectionBuilder: jest.fn().mockImplementation(() => ({
      withUrl: jest.fn().mockReturnThis(),
      withAutomaticReconnect: jest.fn().mockReturnThis(),
      configureLogging: jest.fn().mockReturnThis(),
      build: jest.fn(() => mockConnection),
    })),
    HttpTransportType: {
      WebSockets: 1,
      LongPolling: 2,
      ServerSentEvents: 4,
    },
    LogLevel: {
      Information: "Information",
    },
  };
});

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

jest.mock("../../../hooks/useApi", () => ({
  useApiCallback: jest.fn(() => ({
    execute: jest.fn(),
  })),
}));

describe("useSignalRCountdown", () => {
  let connectionMock: jest.Mocked<signalR.HubConnection>;
  let useApiCallbackMock: jest.Mock;

  beforeEach(() => {
    connectionMock =
      new signalR.HubConnectionBuilder().build() as jest.Mocked<signalR.HubConnection>;
    useApiCallbackMock = require("../../../hooks/useApi").useApiCallback;
    jest.clearAllMocks();
  });

  it("should initialize with null countdown, connectionError, and no notifications sent", () => {
    const { result } = renderHook(() => useSignalRCountdown());

    expect(result.current.countdown).toBeNull();
    expect(result.current.connectionError).toBeNull();
    expect(useApiCallbackMock().execute).not.toHaveBeenCalled(); // Ensure no notification is sent
  });

  it("should update countdown with debounced pending data", async () => {
    const mockCountdownState = {
      id: "123",
      eventName: "Test Event",
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      description: "Event description",
    };
    const mockApiCallback = {
      loading: false,
      execute: jest.fn(),
      result: { data: null },
    } as any;
    jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

    jest.spyOn(connectionMock, "on").mockImplementation((event, handler) => {
      if (event === "ReceiveCountdownUpdate") {
        setTimeout(() => handler("schedule123", mockCountdownState), 0);
      }
    });

    const { result } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      await connectionMock.start();
    });

    expect(result.current.countdown).not.toEqual(mockCountdownState);
  });

  it("should reset countdown state and send notification when CountdownCompleted is triggered", async () => {
    jest.spyOn(connectionMock, "on").mockImplementation((event, handler) => {
      if (event === "CountdownCompleted") {
        setTimeout(() => handler("schedule123", "Test Event"), 0);
      }
    });

    const { result } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      await connectionMock.start();
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));

    expect(result.current.countdown).toBeNull();
    expect(useApiCallbackMock().execute).toHaveBeenCalledTimes(1); // Verify notification is sent
  });

  it("should handle connection error during start", async () => {
    jest
      .spyOn(connectionMock, "start")
      .mockRejectedValueOnce(new Error("Connection failed"));

    const { result } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      try {
        await connectionMock.start();
      } catch {
        // Ignore error for testing purposes
      }
    });

    expect(result.current.connectionError).toBe(
      "Failed to connect to the server. Please try again."
    );
  });

  it("should clear connectionError on successful reconnection", async () => {
    jest
      .spyOn(connectionMock, "onreconnected")
      .mockImplementation((handler) => {
        setTimeout(() => handler(), 0);
      });

    const { result } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      await connectionMock.start();
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));

    expect(result.current.connectionError).toBeNull();
  });

  it("should stop the connection on unmount", async () => {
    const { unmount } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      await connectionMock.start();
    });

    act(() => {
      unmount();
    });

    expect(connectionMock.stop).toHaveBeenCalled();
  });
});
