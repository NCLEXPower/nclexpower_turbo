import { GetServerSidePropsContext } from "next";
import { ServerResponse } from "http";
import { withCSP, generateCSP, setCSPHeader } from "../../utils";
import { getMaintenanceMode } from "../../ssr";
import { nonce } from "../../types";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../ssr", () => ({
  getMaintenanceMode: jest.fn(),
}));

jest.mock("../../types", () => ({
  nonce: jest.fn(),
}));

describe("withCSP", () => {
  let mockRes: Partial<ServerResponse>;
  let mockContext: Partial<GetServerSidePropsContext>;

  const maintenanceModeMock: boolean = true;

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
        data: { loadMaintenanceMode: maintenanceModeMock },
      },
    });
  });

  it("should return props with generatedNonce and loadMaintenanceMode if getServerSidePropsFn is not provided", async () => {
    const result = await withCSP()(mockContext as GetServerSidePropsContext);
    expect(result).toEqual({
      props: {
        generatedNonce: "test-nonce",
        data: { loadMaintenanceMode: maintenanceModeMock },
      },
    });
  });

  it("should return error in props if an exception occurs", async () => {
    (getMaintenanceMode as jest.Mock).mockRejectedValueOnce(
      new Error("Test error")
    );
    const result = await withCSP()(mockContext as GetServerSidePropsContext);

    expect(result).toEqual({
      props: { error: { message: "Test error" } },
    });
  });
});
