import { renderHook, act } from "../../common";
import { useSignalRCountdown } from "../../../hooks";
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

describe("useSignalRCountdown", () => {
  let connectionMock: jest.Mocked<signalR.HubConnection>;

  beforeEach(() => {
    connectionMock =
      new signalR.HubConnectionBuilder().build() as jest.Mocked<signalR.HubConnection>;
    jest.clearAllMocks();
  });

  it("should initialize with null countdown and connectionError", () => {
    const { result } = renderHook(() => useSignalRCountdown());

    expect(result.current.countdown).toBeNull();
    expect(result.current.connectionError).toBeNull();
  });

  it("should update countdown when ReceiveCountdownUpdate is triggered", async () => {
    const mockCountdownState = {
      eventName: "Test Event",
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      description: "Event description",
    };

    jest.spyOn(connectionMock, "on").mockImplementation((event, handler) => {
      if (event === "ReceiveCountdownUpdate") {
        setTimeout(() => handler("schedule123", mockCountdownState), 0);
      }
    });

    const { result } = renderHook(() => useSignalRCountdown());

    await act(async () => {
      await connectionMock.start();
    });

    await act(async () => new Promise((resolve) => setTimeout(resolve, 10)));

    expect(result.current.countdown).toEqual(mockCountdownState);
  });

  it("should reset countdown state when CountdownCompleted is triggered", async () => {
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
