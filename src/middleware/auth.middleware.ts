import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  verifyAccessToken
} from "../utils/jwt";

export const authMiddleware =
(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const header =
    req.headers.authorization;

  if (!header) {
    return res.status(401)
      .json({
        message:
          "Unauthorized"
      });
  }

  const token =
    header.replace(
      "Bearer ",
      ""
    );

  const payload =
    verifyAccessToken(
      token
    ) as any;

  req.user = {
    id: payload.id,
    role: payload.role
  };

  next();
};