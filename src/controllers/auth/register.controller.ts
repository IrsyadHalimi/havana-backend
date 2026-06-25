import { Request, Response } from "express";

import { RegisterService }
from "../../services/auth/register.service";

export class RegisterController {
  async handle(
    req: Request,
    res: Response
  ) {
    const service =
      new RegisterService();

    const result =
      await service.execute(req.body);

    return res.status(201).json(result);
  }
}