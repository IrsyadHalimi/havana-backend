import {
  Request,
  Response
} from "express";

import { VerifyEmailService }
from "../../services/auth/verify-email.service";

export class VerifyEmailController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new VerifyEmailService();

    const result =
      await service.execute(
        req.body.token,
        req.body.password
      );

    return res.json(result);
  }
}