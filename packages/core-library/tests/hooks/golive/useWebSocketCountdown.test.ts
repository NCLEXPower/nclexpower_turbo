import { renderHook, act } from "@testing-library/react";
import { useWebSocketCountdown } from "../../../hooks";
import { useApiCallback } from "../../../hooks";
import { useRouter } from "../../../core";
import { useDebounce } from "../../../hooks";
import { useEffect } from "react";

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

jest.mock("../../../hooks/useDebounce", () => ({
  useDebounce: jest.fn(
    (callback: VoidFunction, delay: number | undefined, deps: unknown[]) => {
      useEffect(() => {
        if (!delay) return callback();
        const handler = setTimeout(callback, delay);
        return () => clearTimeout(handler);
      }, [delay, ...deps]);
    }
  ),
}));

jest.mock("../../../utils", () => ({
  getTimeZone: jest.fn(() => "Asia/Manila"),
}));

const mockRouterPush = jest.fn();
const mockSendNotification = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (useRouter as jest.Mock).mockReturnValue({
    push: mockRouterPush,
  });

  (useApiCallback as jest.Mock).mockReturnValue({
    execute: mockSendNotification,
  });
});

describe("useWebSocketCountdown", () => {
  let mockWebSocket: WebSocket;

  beforeEach(() => {
    global.WebSocket = jest.fn(() => {
      mockWebSocket = {
        send: jest.fn(),
        close: jest.fn(),
        onopen: null,
        onmessage: null,
        onerror: null,
        onclose: null,
        readyState: WebSocket.CONNECTING,
      } as unknown as WebSocket;

      return mockWebSocket;
    }) as unknown as typeof WebSocket;

    Object.assign(global.WebSocket, {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should connect to WebSocket on mount", () => {
    jest.useFakeTimers();

    renderHook(() => useWebSocketCountdown());

    act(() => {
      if (mockWebSocket.onopen) {
        mockWebSocket.onopen(new Event("open"));
      }
      jest.advanceTimersByTime(500);
    });

    expect(global.WebSocket).toHaveBeenCalled();
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: "JoinGroup", timeZone: "Asia/Manila" })
    );

    jest.useRealTimers();
  });

  it("should handle WebSocket errors", () => {
    const { result } = renderHook(() => useWebSocketCountdown());

    act(() => {
      if (mockWebSocket.onerror) {
        mockWebSocket.onerror(new Event("error"));
      }
    });

    expect(result.current.connectionError).toBe("WebSocket error occurred.");
  });

  it("should reconnect when WebSocket closes", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useWebSocketCountdown());

    act(() => {
      if (mockWebSocket.onclose) {
        mockWebSocket.onclose(new CloseEvent("close"));
      }
    });

    expect(result.current.connectionError).toBe(
      "Connection lost. Reconnecting..."
    );
    jest.runAllTimers();
    expect(global.WebSocket).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
