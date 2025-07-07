import { GetServerSidePropsContext } from "next";
import { ServerResponse } from "http";
import { withCSP, generateCSP } from "../../utils";
import {
  getEndpointResources,
  getHasActiveGoLive,
  getHasChatBotWidget,
  getMaintenanceMode,
} from "../../ssr";
import { nonce } from "../../types";
import { MaintenanceSsr } from "../../types/global";
import { IncomingMessage } from "http";

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
  getHasChatBotWidget: jest.fn(),
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

  const mockEndpointResources = [
    {
      endpoint: "/api/test",
      keyUrl: "test",
    },
  ] as { endpoint: string; keyUrl: string }[];

  const maintenanceModeMock: MaintenanceSsr = mockMaintenanceStatus;

  beforeEach(() => {
    jest.useFakeTimers();
    mockRes = {
      setHeader: jest.fn(),
      headersSent: false,
    };

    const mockReq = {
      cookies: {
        client_country: "PH",
      },
    } as unknown as IncomingMessage & {
      cookies: Partial<{ [key: string]: string }>;
    };

    mockContext = {
      res: mockRes as ServerResponse,
      req: mockReq,
    };

    (nonce as jest.Mock).mockReturnValue("test-nonce");
    (getMaintenanceMode as jest.Mock).mockResolvedValue(maintenanceModeMock);
    (getEndpointResources as jest.Mock).mockResolvedValue(
      mockEndpointResources
    );
  });

  afterEach(() => {
    jest.useRealTimers();
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
        __N_SSP: true,
        slug: undefined,
        test: "test value",
        generatedNonce: "test-nonce",
        data: {
          MaintenanceStatus: mockMaintenanceStatus,
          endpoints: mockEndpointResources,
          hasGoLive: undefined,
          hasChatBotWidget: undefined,
        },
      },
    });
  });

  it("should return props with generatedNonce and loadMaintenanceMode if getServerSidePropsFn is not provided", async () => {
    const result = await withCSP()(mockContext as GetServerSidePropsContext);
    expect(result).toEqual({
      props: {
        __N_SSP: true,
        generatedNonce: "test-nonce",
        data: {
          MaintenanceStatus: mockMaintenanceStatus,
          endpoints: mockEndpointResources,
          hasGoLive: undefined,
          hasChatBotWidget: undefined,
        },
      },
    });
  });

  it("should return error in props if an exception occurs", async () => {
    jest.spyOn(Promise, "race").mockImplementation((promises) => {
      return Promise.reject(new Error("Test error"));
    });

    const result = await withCSP()(mockContext as GetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        error: "Test error",
        generatedNonce: "test-nonce",
        data: {
          MaintenanceStatus: { isMaintenance: false },
          endpoints: [],
          hasGoLive: { goLive: null },
          hasChatBotWidget: { hasChatBot: false },
        },
      },
    });
  });

  describe("retry functionality", () => {
    it("should delay before retrying", async () => {
      const mockFn = jest
        .fn()
        .mockRejectedValueOnce(new Error("First fail"))
        .mockResolvedValue("success");

      const promise = withCSP(() => Promise.resolve({ props: {} }))(
        mockContext as GetServerSidePropsContext
      );

      expect(mockFn).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(1000);

      await promise;
    });

    it("should use exponential backoff when retrying failed API calls", async () => {
      (getMaintenanceMode as jest.Mock)
        .mockRejectedValueOnce(new Error("First fail"))
        .mockRejectedValueOnce(new Error("Second fail"))
        .mockResolvedValue(mockMaintenanceStatus);

      const promise = withCSP()(mockContext as GetServerSidePropsContext);
      jest.advanceTimersByTime(3000);

      await promise;
      expect(getMaintenanceMode).toHaveBeenCalledTimes(5);
    });

    it("should eventually fail after max retries", async () => {
      const error = new Error("Test error");

      (getMaintenanceMode as jest.Mock).mockRejectedValue(error);
      (getEndpointResources as jest.Mock).mockRejectedValue(error);
      (getHasActiveGoLive as jest.Mock).mockRejectedValue(error);
      (getHasChatBotWidget as jest.Mock).mockRejectedValue(error);

      const promise = withCSP()(mockContext as GetServerSidePropsContext);

      jest.advanceTimersByTime(7000);

      await expect(promise).resolves.toEqual({
        props: {
          error: "Test error",
          generatedNonce: "test-nonce",
          data: {
            MaintenanceStatus: { isMaintenance: false },
            endpoints: [],
            hasGoLive: { goLive: null },
            hasChatBotWidget: { hasChatBot: false },
          },
        },
      });
    });
  });
});
