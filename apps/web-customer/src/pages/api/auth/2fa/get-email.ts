import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Method Not Allowed",
      });
    }
    try {
      const result = await client.get<string>(
        `/api/v2/internal/baseInternal/app/two-factor-authentication/get-email-address`,
        {
          headers: {
            TwoFactorAuthorization: req.cookies["2faToken"],
            "account-reference": req.cookies["accountref"],
          },
        }
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
