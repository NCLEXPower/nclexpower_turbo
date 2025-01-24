import { renderHook, waitFor } from "../common";
import { act } from "react";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

describe("useDownloadPDF hook", () => {
  let mockAnchor: HTMLAnchorElement | null = null;

  beforeEach(() => {
    global.fetch = jest.fn();
    global.URL.createObjectURL = jest.fn(() => "http://localhost/mockObjectURL");
    global.URL.revokeObjectURL = jest.fn();

    const originalCreateElement = document.createElement;
    jest.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      if (tagName === "a") {
        const anchor = originalCreateElement.call(document, "a") as HTMLAnchorElement;
        jest.spyOn(anchor, "click").mockImplementation(() => { });
        mockAnchor = anchor;
        return anchor;
      }
      return originalCreateElement.call(document, tagName);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should initiate a file download and show loading state while downloading", async () => {
    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = { ok: true, blob: jest.fn().mockResolvedValue(mockBlob) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDownloadPDF());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.downloadFile("mockKey", "test.pdf");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/get-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "mockKey" }),
    });

    expect(mockAnchor).not.toBeNull();
    expect(mockAnchor!.download).toBe("test.pdf");
    expect(mockAnchor!.href).toBe("http://localhost/mockObjectURL");
    expect(mockAnchor!.click).toHaveBeenCalled();
  });


  it("should handle errors correctly", async () => {
    const mockErrorMessage = "Failed to fetch the file. Please try again.";

    const mockResponse = {
      ok: false,
      statusText: "Internal Server Error",
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useDownloadPDF());
    expect(result.current.error).toBe(null);

    act(() => {
      result.current.downloadFile("mockKey", "test.pdf");
    });

    await waitFor(() => expect(result.current.error).toBe(mockErrorMessage));
  });
});
