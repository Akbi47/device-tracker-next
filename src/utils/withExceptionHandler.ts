import { NextApiRequest, NextApiResponse } from "next";

import { ApiException } from "../types/error";
import { getErrorInfo } from "./server";

type NextHandler = <T = any>(_req: NextApiRequest, _res: NextApiResponse) => Promise<NextApiResponse<T>> | void;

/**
 * Execute API logic, and handle exceptions
 *
 * @param handler API Handler
 * @returns Next API Handler
 */
const withExceptionHandler = (handler: NextHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await handler(req, res);
  } catch (err) {
    if (err instanceof ApiException) {
      const { status, error } = err;
      console.error({ error });
      res.status(status).json({ error });
    } else {
      const error = getErrorInfo(err);
      console.error(error);
      res.status(500).json(error);
    }
  }
  return res.end();
};

export default withExceptionHandler;
