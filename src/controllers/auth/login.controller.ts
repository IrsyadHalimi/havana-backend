import {
  Request,
  Response
} from "express";

import {
  LoginService
} from "../../services/auth/login.service";

export class LoginController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new LoginService();

    const result =
      await service.execute(
        req.body.email,
        req.body.password
      );

    return res.json(result);
  }
}