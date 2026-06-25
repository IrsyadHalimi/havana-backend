import {
  Request,
  Response
} from "express";

import { GetProfileService }
from "../../services/profile/get-profile.service";

export class GetProfileController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new GetProfileService();

    const result =
      await service.execute(
        req.user!.id
      );

    return res.json(result);
  }
}