import { renderHook, act } from "../../common";
import { useSignalRCountdown } from "../../../hooks";
import * as signalR from "@microsoft/signalr";

jest.mock("@microsoft/signalr", () => {
  const mockConnection = {
    start: jest.fn(),
    stop: jest.fn(),
    on: jest.fn(),
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

  it("should reset countdown state when CountdownCompleted is triggered", () => {
    const mockConnection = new signalR.HubConnectionBuilder().build();
    jest.spyOn(mockConnection, "on").mockImplementation((event, handler) => {
      if (event === "CountdownCompleted") {
        act(() => {
          handler("schedule123", "Test Event");
        });
      }
    });

    const { result } = renderHook(() => useSignalRCountdown());
    expect(result.current.countdown).toBeNull();
  });
});
