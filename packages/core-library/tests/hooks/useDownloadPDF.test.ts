import axios, { AxiosInstance } from "axios";

jest.mock("axios", () => {
  const actualAxios = jest.requireActual("axios");

  const axiosMock: jest.Mocked<AxiosInstance> = {
    ...actualAxios,
    create: jest.fn(() => axiosMock) as unknown as jest.Mocked<AxiosInstance>,
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    request: jest.fn(),
  };

  return axiosMock;
});

import { renderHook, waitFor } from "../common";
import { act } from "react";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";

const mockAxios = axios as jest.Mocked<typeof axios>;
mockAxios.create = jest.fn(() => mockAxios);

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
  global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/test");
  global.URL.revokeObjectURL = jest.fn(); // Mock revokeObjectURL to prevent errors
});

it("should download the correct PDF file when given a policyType", async () => {
  const mockFileUrl = "https://mockstorage.com/test.pdf";
  const mockResponseData = { data: { fileUrl: mockFileUrl } };

  mockAxios.get.mockResolvedValueOnce(mockResponseData);

  global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/test");
  global.fetch = jest.fn().mockResolvedValueOnce({
    blob: () => Promise.resolve(new Blob(["PDF content"], { type: "application/pdf" })),
  } as Response);

  const { result } = renderHook(() => useDownloadPDF());

  await act(async () => {
    await result.current.downloadPdf(1);
  });

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(
    expect.stringContaining("/api/v2/content/BaseContent/get-file-url?policy=1"),
    expect.objectContaining({ responseType: "json" }) // Allow responseType
  );

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(mockFileUrl);
});

it("should handle missing file URL errors", async () => {
  const mockApiResponse = { data: {} }; // No fileUrl
  (global.fetch as jest.Mock).mockResolvedValueOnce(mockApiResponse);

  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const { result } = renderHook(() => useDownloadPDF());

  act(() => {
    result.current.downloadPdf(2);
  });

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith("Error fetching PDF:", expect.any(Error));
  });

  consoleSpy.mockRestore();
});
