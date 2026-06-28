import { NotFoundError }
from "../../errors/not-found.error";

import {
  RoomRepository
} from "../../repositories/room/room.repository";


export const updateRoom = (
  repository = RoomRepository()
) => async (
  tenantId: string,
  roomId: string,
  payload: any
) => {

  const room =
    await repository.findById(
      roomId,
      tenantId
    );

  if (!room) {
    throw NotFoundError(
      "Room not found"
    );
  }

  return repository.update(
    roomId,
    payload
  );
};