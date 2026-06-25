import {
  Request,
  Response
} from "express";

import { ResendVerificationService }
from "../../services/auth/resend-verification.service";

export class ResendVerificationController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ResendVerificationService();

    const result =
      await service.execute(
        req.body.email
      );

    return res.json(result);
  }
}