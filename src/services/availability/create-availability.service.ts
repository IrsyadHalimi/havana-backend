import {
  AppError,
  createAppError
} from "../../errors/app.error";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {
  createRoomAvailability,
  findPropertyRoomById,
  findRoomAvailabilityByDate
} from "../../repositories/availability/availability.repository";


export const createAvailabilityService = () => ({

  execute: async (
    tenantId: string,
    roomId: string,
    payload: {
      date: string;
      availableRooms: number;
    }
  ) => {

    const room =
      await findPropertyRoomById(
        roomId,
        tenantId
      );

    if (!room) {
      throw NotFoundError(
        "Room not found"
      );
    }

    const existing =
      await findRoomAvailabilityByDate(
        roomId,
        new Date(payload.date)
      );

    if (existing) {
      throw createAppError(
        "Availability already exists",
        400
      );
    }

    if (
      payload.availableRooms >
      room.totalRoom
    ) {
      throw createAppError(
        "Available room exceeds room stock",
        400
      );
    }

    return createRoomAvailability({
      roomId,
      date: new Date(payload.date),
      availableRooms:
        payload.availableRooms
    });
  }

});