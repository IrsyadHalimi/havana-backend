import {
  Request,
  Response
} from "express";

import {
  ListRoomService
} from "../../services/room/list-room.service";

export class ListRoomController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new ListRoomService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.propertyId as string,
        req.query
      );

    return res.json(result);
  }
}