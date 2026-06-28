import {
  generateBookingDates
} from "../../utils/reservation/generate-booking-dates";

import {
  calculateNightCount
} from "../../utils/reservation/calculate-night";

interface CalculateReservationPriceParams {

  basePrice: number;

  checkInDate: Date;

  checkOutDate: Date;

}

export const calculateReservationPrice = ({
  basePrice,
  checkInDate,
  checkOutDate
}: CalculateReservationPriceParams) => {

  const bookingDates =
    generateBookingDates(
      checkInDate,
      checkOutDate
    );

  const details =
    bookingDates.map(
      bookingDate => ({

        bookingDate,

        roomPrice: basePrice

      })
    );

  const nightCount =
    calculateNightCount(
      checkInDate,
      checkOutDate
    );

  const totalPrice =
    details.reduce(

      (
        total,
        item
      ) => total + item.roomPrice,

      0

    );

  return {

    nightCount,

    details,

    totalPrice

  };

};