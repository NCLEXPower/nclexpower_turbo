import { StepType } from "@reactour/tour";
import { act, renderHook } from "../common";
import { useTourManager } from "../../hooks";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

const mockTourSteps: StepType[] = [
  {
    selector: "[data-tour='step-1']",
    content: "Step 1",
  },
  {
    selector: "[data-tour='step-2']",
    content: "Step 2",
  },
];

describe("useTourManager", () => {
  it("initially returns a null component", () => {
    const { result } = renderHook(() => useTourManager(mockTourSteps));
    expect(result.current.TourComponent).toBeNull();
  });

  it("should render tour components after calling startTour", () => {
    const { result } = renderHook(() => useTourManager(mockTourSteps));
    act(() => {
      result.current.startTour();
    });

    expect(result.current.TourComponent).not.toBeNull();
  });

  test("does not render TourComponent if no steps are provided", () => {
    const { result } = renderHook(() => useTourManager([]));

    act(() => {
      result.current.startTour();
    });

    expect(result.current.TourComponent).toBeNull();
  });
});
