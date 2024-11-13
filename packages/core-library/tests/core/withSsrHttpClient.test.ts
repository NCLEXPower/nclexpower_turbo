import { withSsrHttpClient, sessionOptions } from "../../ssr/withSsrHttpClient";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import Http from "../../http-client";
import { config } from "../../config";
import { getTimeZone } from "../../utils";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("iron-session/next", () => ({
  withIronSessionApiRoute: jest.fn((handler, options) => handler),
}));

jest.mock("../../http-client", () => {
  return jest.fn().mockImplementation(() => ({
    client: jest.fn(),
  }));
});

jest.mock("../../utils", () => ({
  getTimeZone: jest.fn().mockReturnValue("GMT"),
}));

describe("withSsrHttpClient", () => {
  let mockHandler: jest.Mock;
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let mockSession: { accessToken?: string };

  beforeEach(() => {
    mockHandler = jest.fn(
      (client) => (req: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json({ message: "success" });
      }
    );

    mockReq = {
      session: { accessToken: "mockAccessToken" },
    } as any;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockSession = mockReq.session as { accessToken?: string };

    (Http as jest.Mock).mockImplementation(() => ({
      client: jest.fn(),
    }));
  });

  it("should initialize the HTTP client with the correct base URL and headers", async () => {
    await withSsrHttpClient(mockHandler)(mockReq as any, mockRes as any);

    const expectedBaseURL =
      process.env.NODE_ENV === "development"
        ? config.value.LOCAL_API_URL
        : config.value.API_URL;

    expect(Http).toHaveBeenCalledWith({
      baseURL: expectedBaseURL,
      headers: {
        "x-api-key": config.value.XAPIKEY,
        "Content-Type": "application/json",
        "X-Environment": config.value.SYSENV,
        "X-Time-Zone": "GMT",
      },
      onError: expect.any(Function),
      onRequest: expect.any(Function),
    });
  });

  it("should call the handler function with the HTTP client", async () => {
    await withSsrHttpClient(mockHandler)(mockReq as any, mockRes as any);

    expect(mockHandler).toHaveBeenCalledWith(expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "success" });
  });

  it("should use iron-session with the correct session options", () => {
    expect(withIronSessionApiRoute).toHaveBeenCalledWith(
      expect.any(Function),
      sessionOptions
    );
  });
});
