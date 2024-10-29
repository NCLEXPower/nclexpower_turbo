import { useAccessControl } from "../../hooks";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));
  
describe("useAccessControl", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize accessLevel from sessionStorage", () => {
    sessionStorage.setItem("al", "2");

    const { result } = renderHook(() => useAccessControl());

    expect(result.current.accessLevel).toBe(2);
  });

  it("should return false for hasAccess when accessLevel is null", () => {
    const { result } = renderHook(() => useAccessControl());

    expect(result.current.hasAccess("SomeComponent")).toBe(false);
  });
});
