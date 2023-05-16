import type { NextApiRequest, NextApiResponse } from "next";

import withExceptionHandler from "../../utils/withExceptionHandler";

type Data = {
  message: string;
};

export default withExceptionHandler((req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ message: "Server is running..." });
});
