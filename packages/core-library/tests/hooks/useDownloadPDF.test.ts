import { renderHook, waitFor, act } from "../common";
import { useApiCallback } from "../../hooks";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("./../../../core-library/contexts", () => ({
  useExecuteToast: jest.fn(() => ({
    executeToast: jest.fn(),
  })),
}));

jest.mock("./../../../core-library/hooks", () => ({
  useApiCallback: jest.fn(() => ({
    loading: false,
    execute: jest.fn().mockResolvedValueOnce({
      data: { fileUrl: "/api/v2/content/BaseContent/get-file-url?policy=1" },
    }),
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
  global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/test");
  global.URL.revokeObjectURL = jest.fn();

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      fileUrl: "/api/v2/content/BaseContent/get-file-url?policy=1",
    }),
    blob: async () => new Blob(["PDF content"], { type: "application/pdf" }),
  });

  (useApiCallback as jest.Mock).mockReturnValue({
    loading: false,
    execute: jest.fn().mockResolvedValueOnce({
      data: { fileUrl: "/api/v2/content/BaseContent/get-file-url?policy=1" },
    }),
  });
});

it("should download the correct PDF file when given a policyType", async () => {
  const { result } = renderHook(() => useDownloadPDF());

  await act(async () => {
    await result.current.downloadPdf(1);
  });

  expect(global.fetch).toHaveBeenNthCalledWith(
    1,
    expect.stringContaining("/api/v2/content/BaseContent/get-file-url?policy=1")
  );

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

it("should handle missing file URL errors", async () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  const { result } = renderHook(() => useDownloadPDF());

  await act(async () => {
    await result.current.downloadPdf(2);
  });

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        message: "Not implemented: navigation (except hash changes)",
      })
    );
    expect(consoleSpy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        message: "Not implemented: navigation (except hash changes)",
      })
    );
  });

  consoleSpy.mockRestore();
});
