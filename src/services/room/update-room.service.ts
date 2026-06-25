import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";

export class UpdateRoomService {

  constructor(
    private repository =
      new RoomRepository()
  ) {}

  async execute(
    tenantId: string,
    roomId: string,
    payload: any
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

    return this.repository.update(
      roomId,
      payload
    );
  }
}