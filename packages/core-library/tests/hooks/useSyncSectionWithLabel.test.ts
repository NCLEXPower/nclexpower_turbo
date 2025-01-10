import { renderHook, act } from "../common";
import { useFormContext, useFieldArray } from "react-hook-form";
import useSyncSectionWithLabel from "../../hooks/useSyncSectionWithLabel";

jest.mock("../../config", () => ({
  config: {
    value: {
      BASEAPP: "test-app",
    },
  },
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  useFieldArray: jest.fn(),
}));

describe("useSyncSectionWithLabel", () => {
  const mockSetValue = jest.fn();
  const mockWatch = jest.fn();
  const mockFields = [{ id: "1" }, { id: "2" }];

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormContext as jest.Mock).mockReturnValue({
      control: {},
      watch: mockWatch,
      setValue: mockSetValue,
    });

    (useFieldArray as jest.Mock).mockReturnValue({
      fields: mockFields,
    });
  });

  it("updates section containers with label value when labelValue changes", () => {
    const sectionName = "leftSection";
    const labelName = "leftLabelName";
    const questionIndex = 0;

    mockWatch.mockImplementation((name) => {
      if (name === `questionnaires.${questionIndex}.${labelName}`) {
        return "LabelValue";
      }
      if (name === `questionnaires.${questionIndex}.${sectionName}`) {
        return [
          { value: "A", container: "" },
          { value: "B", container: "" },
        ];
      }
      return undefined;
    });

    renderHook(() =>
      useSyncSectionWithLabel({ sectionName, labelName, questionIndex })
    );

    expect(mockSetValue).toHaveBeenCalledTimes(2);
    expect(mockSetValue).toHaveBeenCalledWith(
      `questionnaires.${questionIndex}.${sectionName}.0.container`,
      "LabelValue"
    );
    expect(mockSetValue).toHaveBeenCalledWith(
      `questionnaires.${questionIndex}.${sectionName}.1.container`,
      "LabelValue"
    );
  });

  it("does not update section containers when labelValue is undefined", () => {
    const sectionName = "centerSection";
    const labelName = "centerLabelName";
    const questionIndex = 1;

    mockWatch.mockImplementation((name) => {
      if (name === `questionnaires.${questionIndex}.${labelName}`) {
        return undefined;
      }
      if (name === `questionnaires.${questionIndex}.${sectionName}`) {
        return [
          { value: "X", container: "" },
          { value: "Y", container: "" },
        ];
      }
      return undefined;
    });

    renderHook(() =>
      useSyncSectionWithLabel({ sectionName, labelName, questionIndex })
    );

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it("handles empty section list gracefully", () => {
    const sectionName = "rightSection";
    const labelName = "rightLabelName";
    const questionIndex = 2;

    mockWatch.mockImplementation((name) => {
      if (name === `questionnaires.${questionIndex}.${labelName}`) {
        return "RightLabel";
      }
      if (name === `questionnaires.${questionIndex}.${sectionName}`) {
        return [];
      }
      return undefined;
    });

    renderHook(() =>
      useSyncSectionWithLabel({ sectionName, labelName, questionIndex })
    );

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
