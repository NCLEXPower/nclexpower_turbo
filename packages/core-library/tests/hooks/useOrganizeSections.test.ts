import { renderHook } from "../common";
import { useOrganizeSections } from "../../hooks";
import { BowtieItemType } from "../../system/app/internal/types";

jest.mock("../../config", () => ({
  config: {
    value: {
      BASEAPP: "test-app",
    },
  },
}));

describe("useOrganizeSections Hook", () => {
  it("should return organized sections with correct and incorrect items", () => {
    const sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
        { isAnswer: true, value: "C", container: "1" },
      ],
      [
        { isAnswer: false, value: "D", container: "2" },
        { isAnswer: true, value: "E", container: "2" },
      ],
    ];

    const { result } = renderHook(() => useOrganizeSections(sections));

    expect(result.current).toEqual([
      {
        correct: [
          { isAnswer: true, value: "A", container: "1" },
          { isAnswer: true, value: "C", container: "1" },
        ],
        incorrect: [{ isAnswer: false, value: "B", container: "1" }],
      },
      {
        correct: [{ isAnswer: true, value: "E", container: "2" }],
        incorrect: [{ isAnswer: false, value: "D", container: "2" }],
      },
    ]);
  });

  it("should return empty correct and incorrect sections if no items are passed", () => {
    const sections: BowtieItemType[][] = [];

    const { result } = renderHook(() => useOrganizeSections(sections));

    expect(result.current).toEqual([]);
  });

  it("should handle sections with only correct items", () => {
    const sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: true, value: "B", container: "1" },
      ],
    ];

    const { result } = renderHook(() => useOrganizeSections(sections));

    expect(result.current).toEqual([
      {
        correct: [
          { isAnswer: true, value: "A", container: "1" },
          { isAnswer: true, value: "B", container: "1" },
        ],
        incorrect: [],
      },
    ]);
  });

  it("should handle sections with only incorrect items", () => {
    const sections = [
      [
        { isAnswer: false, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
      ],
    ];

    const { result } = renderHook(() => useOrganizeSections(sections));

    expect(result.current).toEqual([
      {
        correct: [],
        incorrect: [
          { isAnswer: false, value: "A", container: "1" },
          { isAnswer: false, value: "B", container: "1" },
        ],
      },
    ]);
  });

  it("should handle a single section with mixed correct and incorrect items", () => {
    const sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
        { isAnswer: true, value: "C", container: "1" },
      ],
    ];

    const { result } = renderHook(() => useOrganizeSections(sections));

    expect(result.current).toEqual([
      {
        correct: [
          { isAnswer: true, value: "A", container: "1" },
          { isAnswer: true, value: "C", container: "1" },
        ],
        incorrect: [{ isAnswer: false, value: "B", container: "1" }],
      },
    ]);
  });

  it("should return a memoized result when sections are unchanged", () => {
    const sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
      ],
    ];

    const { result, rerender } = renderHook(() =>
      useOrganizeSections(sections)
    );

    const initialResult = result.current;
    rerender();

    expect(result.current).toBe(initialResult);
  });

  it("should return updated result when sections change", () => {
    let sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: false, value: "B", container: "1" },
      ],
    ];

    const { result, rerender } = renderHook(() =>
      useOrganizeSections(sections)
    );

    // Initial result
    const initialResult = result.current;

    // Modify the sections data
    sections = [
      [
        { isAnswer: true, value: "A", container: "1" },
        { isAnswer: true, value: "C", container: "1" },
      ],
    ];

    rerender(); // Rerender with updated sections

    // Ensure the result is updated
    expect(result.current).not.toBe(initialResult);
    expect(result.current).toEqual([
      {
        correct: [
          { isAnswer: true, value: "A", container: "1" },
          { isAnswer: true, value: "C", container: "1" },
        ],
        incorrect: [],
      },
    ]);
  });
});
