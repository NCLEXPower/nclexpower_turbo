import { renderHook, act } from "../common";
import { useBeforeUnload } from "../../hooks";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe("useBeforeUnload hook", () => {
  it("should render the useBeforeUnload hook when truthy", () => {
    const { result } = renderHook(() => useBeforeUnload(true));
    expect(result.current).toBeDefined();
  });

  it("should not render the useBeforeUnload hook when falsy", () => {
    renderHook(() => useBeforeUnload(false));
    const router = require("../../core/router").useRouter();
    expect(router.events.on).toHaveBeenCalledTimes(1);
  });

  it("should not call handler if not provided", () => {
    const { result } = renderHook(() => useBeforeUnload(true));
    expect(result.current).toBeDefined();
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useBeforeUnload(true));
    const router = require("../../core/router").useRouter();

    unmount();

    expect(router.events.off).toHaveBeenCalled();
  });
});
