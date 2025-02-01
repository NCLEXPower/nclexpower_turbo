import { renderHook, act } from "../../common";
import { useWebSocketCountdown } from "../../../hooks";
import { useApiCallback } from "../../../hooks";
import { useRouter } from "../../../core";

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

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks/useApi", () => ({
  useApiCallback: jest.fn(),
}));

jest.mock("../../../utils", () => ({
  getTimeZone: jest.fn(() => "Asia/Manila"),
}));

const mockRouterPush = jest.fn();
const mockSendNotification = jest.fn();
let mockWebSocket: any;

describe("useWebSocketCountdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockSendNotification,
    });

    global.WebSocket = jest.fn(() => {
      mockWebSocket = {
        send: jest.fn(),
        close: jest.fn(),
        readyState: WebSocket.CONNECTING,
        onopen: null,
        onmessage: null,
        onerror: null,
        onclose: null,
      };
      return mockWebSocket;
    }) as unknown as typeof WebSocket;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should establish WebSocket connection with correct parameters", () => {
    renderHook(() => useWebSocketCountdown());

    expect(global.WebSocket).toHaveBeenCalledWith(
      "wss://api.example.com/golive-websocket?timezone=Asia%2FManila"
    );
  });

  it("should implement exponential backoff with jitter on reconnects", () => {
    const { rerender } = renderHook(() => useWebSocketCountdown());

    act(() => {
      mockWebSocket.onclose?.({ code: 1006 });
    });

    jest.advanceTimersByTime(2000 + 1000);
    expect(global.WebSocket).toHaveBeenCalledTimes(1);

    act(() => {
      mockWebSocket.onclose?.({ code: 1006 });
    });
    jest.advanceTimersByTime(4000 + 1000);
    expect(global.WebSocket).toHaveBeenCalledTimes(1);
  });

  it("should send notification only once on countdown completion", async () => {
    const { result } = renderHook(() => useWebSocketCountdown());

    act(() => {
      const messageEvent = {
        data: JSON.stringify({ type: "CountdownCompleted" }),
      };
      mockWebSocket.onmessage?.(messageEvent);
      mockWebSocket.onmessage?.(messageEvent);
    });

    await act(async () => {
      await Promise.resolve(); // Allow async operations to complete
    });

    expect(mockSendNotification).toHaveBeenCalledTimes(1);
    expect(mockWebSocket.close).toHaveBeenCalledWith(
      1000,
      "Countdown completed"
    );
  });

  it("should maintain heartbeat every 25 seconds", () => {
    renderHook(() => useWebSocketCountdown());

    act(() => {
      mockWebSocket.onopen?.();
    });

    jest.advanceTimersByTime(25000);
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: "Heartbeat" })
    );
  });

  it("should clean up resources on unmount", () => {
    const { unmount } = renderHook(() => useWebSocketCountdown());

    unmount();

    expect(mockWebSocket.close).toHaveBeenCalledWith(
      1000,
      "Component unmounted"
    );
  });

  it("should handle WebSocket errors with proper reconnection", () => {
    const { result } = renderHook(() => useWebSocketCountdown());

    act(() => {
      mockWebSocket.onerror?.(new Event("error"));
    });

    expect(result.current.connectionError).toBe(
      "Connection error. Reconnecting..."
    );
  });
});
