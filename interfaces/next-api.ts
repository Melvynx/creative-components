import { NextApiRequest, NextApiResponse } from "next";

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;
