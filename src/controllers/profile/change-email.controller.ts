import {
  Request,
  Response
} from "express";

import { ChangeEmailService }
from "../../services/profile/change-email.service";

export class ChangeEmailController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ChangeEmailService();

    const result =
      await service.execute(
        req.user!.id,
        req.body.email
      );

    return res.json(result);
  }
}