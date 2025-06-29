import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import { CustomerOptions } from "core-library/types/global";
import { CreateUserWithAutoLoginResponse } from "core-library/api/types";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post<CreateUserWithAutoLoginResponse>(
        `/api/v2/internal/baseInternal/create-customer`,
        req.body as CustomerOptions
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
