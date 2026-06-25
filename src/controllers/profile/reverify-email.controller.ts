import {
  Request,
  Response
} from "express";

import { ReverifyEmailService }
from "../../services/profile/reverify-email.service";

export class ReverifyEmailController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ReverifyEmailService();

    const result =
      await service.execute(
        req.user!.id
      );

    return res.json(result);
  }
}