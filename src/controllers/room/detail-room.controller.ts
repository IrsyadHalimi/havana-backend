import {
  Request,
  Response
} from "express";

import {
  DetailRoomService
} from "../../services/room/detail-room.service";

export class DetailRoomController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new DetailRoomService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string
      );

    return res.json(result);
  }
}