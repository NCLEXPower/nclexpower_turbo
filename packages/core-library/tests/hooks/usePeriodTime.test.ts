import { renderHook, act } from "../common";
import { usePeriodTime } from "../../hooks";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

describe("usePeriodTime Hook", () => {
  const mockData = {
    someKey: {
      all: 10000,
      today: 100,
      weekly: 700,
      monthly: 3000,
      ytd: 9000,
    },
  };

  it("should initialize with the default period", () => {
    const { result } = renderHook(() => usePeriodTime({ Data: mockData }));
    expect(result.current.selectedPeriod).toBe("all");
    expect(result.current.data.someKey).toBe(10000);
  });

  it("should initialize with a custom default period", () => {
    const { result } = renderHook(() =>
      usePeriodTime({ Data: mockData, defaultPeriod: "today" })
    );
    expect(result.current.selectedPeriod).toBe("today");
    expect(result.current.data.someKey).toBe(100);
  });

  it("should handle period change and update data", () => {
    const { result } = renderHook(() => usePeriodTime({ Data: mockData }));

    act(() => {
      result.current.handlePeriodChange({
        target: { value: "weekly" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedPeriod).toBe("weekly");
    expect(result.current.data.someKey).toBe(700);
  });
});
