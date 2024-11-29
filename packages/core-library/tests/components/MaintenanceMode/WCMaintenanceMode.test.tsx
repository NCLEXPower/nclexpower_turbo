import useMaintenanceMode from "../../../hooks/useMaintenanceMode";
import { renderHook } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("WCMaintenanceMode returns undefined values", () => {
  it("should call useMaintenanceMode Hook but will return no value", () => {
    const { result } = renderHook(() => useMaintenanceMode());
    const { data, dateCommenced, loading } = result.current;
    expect(data).toEqual(undefined);
    expect(dateCommenced).toBe("Invalid Date");
    expect(loading).toBe(true);
  });
});
