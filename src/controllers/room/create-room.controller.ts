import {
  Request,
  Response
} from "express";

import {
  CreateRoomService
} from "../../services/room/create-room.service";

export class CreateRoomController {

  async handle(
    req: Request,
    res: Response
  ) {

    const service =
      new CreateRoomService();

    const result =
      await service.execute(
        req.user!.id,
        req.params.propertyId as string,
        req.body
      );

    return res
      .status(201)
      .json(result);
  }
}