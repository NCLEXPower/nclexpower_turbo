import { useRouter } from "next/router";
import {
  useMixpanelTrackerSession,
  useSaveTrackerParamsOnNavigation,
} from "../../hooks";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { act, renderHook } from "../common";

jest.mock("../../session-storage", () => ({ getItem: jest.fn() }));
jest.mock("../../hooks/useApi", () => ({ useApiCallback: jest.fn() }));
jest.mock("../../core", () => ({
  setMixpanelTrackedUser: jest.fn(),
  updateUserProfile: jest.fn(),
  mixpanelTrackLogin: jest.fn(),
}));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
jest.mock("../../hooks/useSessionStorage");
jest.mock("../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

describe("useMixpanelTracker", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("useMixpanelTrackerSession", () => {
    it("should implement useSessionStorage hook", () => {
      const previousPage = { previousPage: "", scroll: "" };

      jest
        .mocked(useSessionStorage)
        .mockReturnValue([previousPage, jest.fn(), jest.fn()]);

      const { result } = renderHook(() => useMixpanelTrackerSession());
      expect(result.current).toEqual([
        previousPage,
        expect.any(Function),
        expect.any(Function),
      ]);
    });
  });

  describe("useSaveTrackerParamsOnNavigation", () => {
    it("should update session storage with previous page and scroll position on route change", () => {
      const mockUpdateFn = jest.fn();
      const mockRouterEvents = {
        on: jest.fn(),
        off: jest.fn(),
      };

      jest
        .mocked(useRouter)
        .mockReturnValue({ events: mockRouterEvents } as any);
      jest
        .mocked(useSessionStorage)
        .mockReturnValue([
          { previousPage: "", scroll: "" },
          mockUpdateFn,
          jest.fn(),
        ]);

      const { unmount } = renderHook(() => useSaveTrackerParamsOnNavigation());
      expect(mockRouterEvents.on).toHaveBeenCalledWith(
        "routeChangeStart",
        expect.any(Function)
      );

      const saveRouteInfoOnNavigation = mockRouterEvents.on.mock.calls[0][1];

      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            href: "http://test.com",
          },
          writable: true,
        });
        Object.defineProperty(window, "scrollY", {
          value: 100,
          writable: true,
        });
        saveRouteInfoOnNavigation();
      });

      expect(mockUpdateFn).toHaveBeenCalledWith({
        previousPage: "http://test.com",
        scroll: "100",
      });

      unmount();
      expect(mockRouterEvents.off).toHaveBeenCalledWith(
        "routeChangeStart",
        saveRouteInfoOnNavigation
      );
    });
  });
});
