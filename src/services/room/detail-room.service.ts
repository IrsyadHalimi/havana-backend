import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";

export class DetailRoomService {

  constructor(
    private repository =
      new RoomRepository()
  ) {}

  async execute(
    tenantId: string,
    roomId: string
  ) {

    const room =
      await this.repository.findById(
        roomId,
        tenantId
      );

    if (!room) {
      throw new NotFoundError(
        "Room not found"
      );
    }

    return room;
  }
}