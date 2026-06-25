import {
  Request,
  Response
} from "express";

import { ChangePasswordService }
from "../../services/profile/change-password.service";

export class ChangePasswordController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ChangePasswordService();

    const result =
      await service.execute(
        req.user!.id,
        req.body.oldPassword,
        req.body.newPassword
      );

    return res.json(result);
  }
}