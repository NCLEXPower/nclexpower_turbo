import { GetServerSidePropsContext } from "next";
import { ServerResponse } from "http";
import { withCSP, generateCSP, setCSPHeader } from "../../utils";
import { getEndpointResources, getMaintenanceMode } from "../../ssr";
import { nonce } from "../../types";
import { MaintenanceSsr } from "../../types/global";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../ssr", () => ({
  getMaintenanceMode: jest.fn(),
  getEndpointResources: jest.fn(),
  getHasActiveGoLive: jest.fn(),
  getChatBotMode: jest.fn(),
}));

jest.mock("../../types", () => ({
  nonce: jest.fn(),
}));

describe("withCSP", () => {
  let mockRes: Partial<ServerResponse>;
  let mockContext: Partial<GetServerSidePropsContext>;

  const mockMaintenanceStatus = {
    id: "79a6d3d7-b30a-4eae-a689-0919ddd0d5bd",
    currentMaintenanceMode: ["dev", "uat"],
    createdDate: "2024-11-28T23:29:28.2473075",
    updatedDate: "2024-11-29T03:10:22.5355995",
  };

  const mockChatbotMode = {
    id: "d7c3487b-232f-4464-87ce-c0a87166d915",
    mode: 0,
    createdDate: "2025-01-09T07:48:01.9335557",
    updatedDate: "2025-01-09T07:48:01.9335842",
  };

  const mockEndpointResources = [
    {
      endpoint: "/api/test",
      keyUrl: "test",
    },
  ] as { endpoint: string; keyUrl: string }[];

  const maintenanceModeMock: MaintenanceSsr = mockMaintenanceStatus;

  beforeEach(() => {
    mockRes = {
      setHeader: jest.fn(),
      headersSent: false,
    };

    mockContext = {
      res: mockRes as ServerResponse,
    };

    (nonce as jest.Mock).mockReturnValue("test-nonce");
    (getMaintenanceMode as jest.Mock).mockResolvedValue(maintenanceModeMock);
    (getEndpointResources as jest.Mock).mockResolvedValue(
      mockEndpointResources
    );
  });
  it("should generate and set the CSP header", async () => {
    const mockGetServerSideProps = jest
      .fn()
      .mockResolvedValue({ props: { test: "test value" } });

    const result = await withCSP(mockGetServerSideProps)(
      mockContext as GetServerSidePropsContext
    );

    const expectedCSP = generateCSP("test-nonce");
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Content-Security-Policy",
      expectedCSP
    );

    expect(result).toEqual({
      props: {
        test: "test value",
        generatedNonce: "test-nonce",
        data: {
          MaintenanceStatus: mockMaintenanceStatus,
          endpoints: mockEndpointResources,
        },
      },
    });
  });

  it("should return props with generatedNonce and loadMaintenanceMode if getServerSidePropsFn is not provided", async () => {
    const result = await withCSP()(mockContext as GetServerSidePropsContext);
    expect(result).toEqual({
      props: {
        generatedNonce: "test-nonce",
        data: {
          MaintenanceStatus: mockMaintenanceStatus,
          endpoints: mockEndpointResources,
        },
      },
    });
  });

  it("should return error in props if an exception occurs", async () => {
    (getMaintenanceMode as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );
    jest
      .mocked(getEndpointResources)
      .mockRejectedValueOnce(new Error("Test error"));
    const result = await withCSP()(mockContext as GetServerSidePropsContext);

    expect(result).toEqual({
      props: { error: { message: "Test error" } },
    });
  });
});
