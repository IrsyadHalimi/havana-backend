import {
  findReservationPropertyById,
  findReservationRoomById
} from "../../repositories/reservation/reservation.repository";

import {
  checkRoomAvailability
} from "../availability/check-room-availability.service";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {
  checkReservationConflict
} from "./check-reservation-conflict.service";

interface ValidateReservationParams {

  propertyId: string;

  roomId: string;

  checkInDate: Date;

  checkOutDate: Date;

  totalGuests: number;

}

export const validateReservation = async ({
  propertyId,
  roomId,
  checkInDate,
  checkOutDate,
  totalGuests
}: ValidateReservationParams) => {

  /**
   * Property
   */

  const property =
    await findReservationPropertyById(
      propertyId
    );

  if (!property) {

    throw NotFoundError(
      "Property not found."
    );

  }

  /**
   * Room
   */

  const room =
    await findReservationRoomById(
      roomId
    );

  if (!room) {

    throw NotFoundError(
      "Room not found."
    );

  }

  /**
   * Room harus milik property
   */

  if (
    room.propertyId !== property.id
  ) {

    throw NotFoundError(
      "Selected room does not belong to this property."
    );

  }

  /**
   * Kapasitas
   */

  if (
    totalGuests > room.capacity
  ) {

    throw NotFoundError(
      `Maximum room capacity is ${room.capacity}.`
    );

  }

  /**
   * Availability
   */

  const availability =
    await checkRoomAvailability(
      room.id,
      checkInDate,
      checkOutDate
    );

  const conflict =
  await checkReservationConflict(

    room.id,

    checkInDate,

    checkOutDate

  );

  if (conflict.hasConflict) {

    throw NotFoundError(
      "The selected room has already been booked for the selected dates."
    );

  }

  if (!availability.available) {

    if (
      availability.unavailableDate
    ) {

      throw NotFoundError(
        `Room is unavailable on ${availability.unavailableDate.toISOString().split("T")[0]}.`
      );

    }

    throw NotFoundError(
      "Room availability has not been configured."
    );

  }

  /**
   * Return room
   * Dipakai service berikutnya
   */

  return room;

};