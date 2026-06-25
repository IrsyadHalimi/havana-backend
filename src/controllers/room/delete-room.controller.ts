import {
  Request,
  Response
} from "express";

import {
  DeleteRoomService
} from "../../services/room/delete-room.service";

export class DeleteRoomController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new DeleteRoomService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.id
      );

    return res.json(result);
  }
}