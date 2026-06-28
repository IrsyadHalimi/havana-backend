import {
  findRoomAvailabilitiesBetweenDates
} from "../../repositories/availability/availability.repository";

import {
  calculateNightCount
} from "../../utils/reservation/calculate-night";

export const checkRoomAvailability = async (
  roomId: string,
  checkInDate: Date,
  checkOutDate: Date
) => {

  const availabilities =
    await findRoomAvailabilitiesBetweenDates(
      roomId,
      checkInDate,
      checkOutDate
    );

  const totalNights =
    calculateNightCount(
      checkInDate,
      checkOutDate
    );

  /**
   * Availability belum lengkap
   */
  if (
    availabilities.length !== totalNights
  ) {
    return {
      available: false,
      unavailableDate: null
    };
  }

  /**
   * Ada tanggal yang ditutup tenant
   */
  const unavailable =
    availabilities.find(
      availability => !availability.isAvailable
    );

  if (unavailable) {
    return {
      available: false,
      unavailableDate: unavailable.date
    };
  }

  return {
    available: true,
    unavailableDate: null
  };
};