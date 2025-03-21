/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { renderHook, act } from "../common";
import { useFileUpload } from "../../hooks";
import { UseFormSetValue } from "react-hook-form";

jest.mock("../../config", () => ({
  config: {
    value: jest.fn(),
  },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("useFileUpload", () => {
  const mockSetValue = jest.fn() as jest.MockedFunction<UseFormSetValue<any>>;

  it("should set a file when a FileList with a file is provided", () => {
    const { result } = renderHook(() => useFileUpload(mockSetValue));

    const mockFile = new File(["file content"], "test-file.txt", {
      type: "text/plain",
    });
    const mockFileList = {
      0: mockFile,
      length: 1,
      item: (index: number) => mockFile,
    } as unknown as FileList;

    act(() => {
      result.current.handleFileChange("testField", mockFileList);
    });

    expect(mockSetValue).toHaveBeenCalledWith("testField", [mockFile], {
      shouldValidate: true,
    });
  });

  it("should set an empty array when the FileList is null", () => {
    const { result } = renderHook(() => useFileUpload(mockSetValue));

    act(() => {
      result.current.handleFileChange("testField", null);
    });

    expect(mockSetValue).toHaveBeenCalledWith("testField", [], {
      shouldValidate: true,
    });
  });

  it("should set an empty array when the FileList is empty", () => {
    const { result } = renderHook(() => useFileUpload(mockSetValue));

    const mockEmptyFileList = {
      length: 0,
      item: () => null,
    } as unknown as FileList;

    act(() => {
      result.current.handleFileChange("testField", mockEmptyFileList);
    });

    expect(mockSetValue).toHaveBeenCalledWith("testField", [], {
      shouldValidate: true,
    });
  });
});
