import {
  Request,
  Response
} from "express";

import {
  UpdateRoomService
} from "../../services/room/update-room.service";

export class UpdateRoomController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new UpdateRoomService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id as string,
        req.body
      );

    return res.json(result);
  }
}