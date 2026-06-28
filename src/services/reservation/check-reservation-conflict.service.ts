import {
  findReservationConflicts
} from "../../repositories/reservation/reservation.repository";

export const checkReservationConflict = async (
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date
) => {

  const reservations =
    await findReservationConflicts(

      roomId,

      checkInDate,

      checkOutDate

    );

  return {

    hasConflict:

      reservations.length > 0,

    reservations

  };

};