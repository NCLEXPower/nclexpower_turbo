import {
  configuredRouteOptions,
  routeUrl,
  STATIC_ROUTES,
  useRouter,
} from "../../core";
import { useRouter as useNextRouter } from "next/router";
import { act, renderHook } from "../common";
import { EventEmitter } from "events";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../core", () => ({
  ...jest.requireActual("../../core"),
  openInNewTab: jest.fn(),
}));

describe("useRouter", () => {
  let mockRouter;
  let routerEvents: EventEmitter;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    global.open = jest.fn();
    routerEvents = new EventEmitter();
    mockRouterPush = jest.fn();
    mockRouter = {
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      pathname: "/test",
    };
    (useNextRouter as jest.Mock).mockReturnValue({
      events: routerEvents,
      pathname: "/",
      push: jest.fn(),
      replace: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the correct initial state and title", () => {
    const { result } = renderHook(() => useRouter());
    expect(result.current.loading).toBe(false);
    expect(result.current.staticRoutes).toEqual(STATIC_ROUTES);
    expect(result.current.title).toBe("Home");
  });

  it("should update loading state on routeChangeStart and routeChangeComplete", () => {
    const { result } = renderHook(() => useRouter());

    act(() => {
      routerEvents.emit("routeChangeStart");
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      routerEvents.emit("routeChangeComplete");
    });
    expect(result.current.loading).toBe(false);
  });

  it("should update loading state on routeChangeError", () => {
    const { result } = renderHook(() => useRouter());

    act(() => {
      routerEvents.emit("routeChangeStart");
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      routerEvents.emit("routeChangeError");
    });

    expect(result.current.loading).toBe(false);
  });

  it("should clean up event listeners on unmount", () => {
    const removeListenerSpy = jest.spyOn(routerEvents, "off");

    const { unmount } = renderHook(() => useRouter());

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeStart",
      expect.any(Function)
    );
    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeComplete",
      expect.any(Function)
    );
    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeError",
      expect.any(Function)
    );

    removeListenerSpy.mockRestore();
  });

  it("should return { scroll: true } when no options are provided", () => {
    const result = configuredRouteOptions();
    expect(result).toEqual({ scroll: true });
  });

  it("should merge provided options with { scroll: true }", () => {
    const options = { shallow: false };
    const result = configuredRouteOptions(options);
    expect(result).toEqual({ scroll: true, shallow: false });
  });

  it("should override scroll option if provided in options", () => {
    const options = { scroll: false };
    const result = configuredRouteOptions(options);
    expect(result).toEqual({ scroll: false });
  });

  it("should return the path as-is if it matches STATIC_ROUTES.home", () => {
    const path = STATIC_ROUTES.home;
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it('should return the path as-is if it contains "http://"', () => {
    const path = "http://example.com";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it('should return the path as-is if it contains "https://"', () => {
    const path = "https://example.com";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it("should return the path as-is for other paths", () => {
    const path = "/some-other-path";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it("should return the path as-is even for paths not covered by specific cases", () => {
    const path = "/random-path";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it("should call push function and perform its actions", async () => {
    const { result } = renderHook(() => useRouter());
    const pushSpy = jest.spyOn(result.current, "push");

    await act(async () => {
      await result.current.push({ pathname: "/" });
    });
    expect(pushSpy).toHaveBeenCalled();
  });

  it("should call replace function and perform its actions", async () => {
    const { result } = renderHook(() => useRouter());
    const replaceSpy = jest.spyOn(result.current, "replace");

    await act(async () => {
      await result.current.replace({ pathname: "/" });
    });
    expect(replaceSpy).toHaveBeenCalled();
  });

  it("should call openInNewTab with the correct path", () => {
    const { result } = renderHook(() => useRouter());
    const openInNewTabSpy = jest.spyOn(result.current, "openInNewTab");

    const path = "/some-path";
    act(() => {
      result.current.openInNewTab(path);
    });

    expect(openInNewTabSpy).toHaveBeenCalledWith(path);
  });

  it("should return the path as-is for non-static routes", () => {
    const path = "/random-path";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it("should correctly merge options with shallow: true", () => {
    const options = { shallow: true };
    const result = configuredRouteOptions(options);
    expect(result).toEqual({ scroll: true, shallow: true });
  });

  it("should toggle loading state on route change", () => {
    const { result } = renderHook(() => useRouter());

    act(() => {
      routerEvents.emit("routeChangeStart");
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      routerEvents.emit("routeChangeComplete");
    });
    expect(result.current.loading).toBe(false);
  });

  it("should return static route home path correctly", () => {
    const homePath = STATIC_ROUTES.home;
    const result = routeUrl(homePath);
    expect(result).toBe(homePath);
  });

  it("should remove event listeners on unmount", () => {
    const removeListenerSpy = jest.spyOn(routerEvents, "off");

    const { unmount } = renderHook(() => useRouter());

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeStart",
      expect.any(Function)
    );
    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeComplete",
      expect.any(Function)
    );
    expect(removeListenerSpy).toHaveBeenCalledWith(
      "routeChangeError",
      expect.any(Function)
    );

    removeListenerSpy.mockRestore();
  });

  it("should return default options when no arguments are passed", () => {
    const result = configuredRouteOptions();
    expect(result).toEqual({ scroll: true });
  });

  it("should handle paths with query parameters correctly", () => {
    const path = "/path?query=example";
    const result = routeUrl(path);
    expect(result).toBe(path);
  });

  it("should resolve function paths correctly in push", async () => {
    const { result } = renderHook(() => useRouter());
    const pushSpy = jest.spyOn(result.current, "push");
  
    const resolvedPath = routeUrl(STATIC_ROUTES.home);
  
    await act(async () => {
      await result.current.push(resolvedPath);
    });
  
    expect(pushSpy).toHaveBeenCalledWith(resolvedPath);
  });
  
  it("should resolve function paths correctly in replace", async () => {
    const { result } = renderHook(() => useRouter());
    const replaceSpy = jest.spyOn(result.current, "replace");
  
    const resolvedPath = routeUrl(STATIC_ROUTES.home);
  
    await act(async () => {
      await result.current.replace(resolvedPath);
    });
  
    expect(replaceSpy).toHaveBeenCalledWith(resolvedPath);
  });

  it("should correctly handle paths in openInNewTab", () => {
    const { result } = renderHook(() => useRouter());
    const openInNewTabSpy = jest.spyOn(result.current, "openInNewTab");
  
    const resolvedPath = routeUrl(STATIC_ROUTES.home);
  
    act(() => {
      result.current.openInNewTab(resolvedPath);
    });
  
    expect(openInNewTabSpy).toHaveBeenCalledWith(resolvedPath);
  });
  
});
