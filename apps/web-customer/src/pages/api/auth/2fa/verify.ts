import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import { LoginResponse } from "core-library/api/types";
import qs from "query-string";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method Not Allowed",
      });
    }
    try {
      const code = req.body.code;

      if (!code) {
        return res.status(400).json({ message: "Missing 2FA code." });
      }

      const result = await client.post<LoginResponse>(
        `/api/v2/internal/baseInternal/app/two-factor-authentication/verify?${qs.stringify({ code })}`,
        {},
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
