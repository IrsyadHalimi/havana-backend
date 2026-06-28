import { prisma } from "../../config/prisma";

import {
  ReservationStatus
} from "@prisma/client";

import {
  validateReservation
} from "./validate-reservation.service";

import {
  calculateReservationPrice
} from "./calculate-reservation-price.service";

import {
  generateOrderNumber
} from "../../utils/reservation/generate-order-number.reservation";

import {
  createReservation,
  createReservationDetails,
  createReservationHistory
} from "../../repositories/reservation/reservation.repository";

interface CreateReservationParams {

  userId: string;

  propertyId: string;

  roomId: string;

  checkInDate: Date;

  checkOutDate: Date;

  totalGuests: number;

}

export const createReservationService = async ({
  userId,
  propertyId,
  roomId,
  checkInDate,
  checkOutDate,
  totalGuests
}: CreateReservationParams) => {

  const room =
    await validateReservation({

      propertyId,

      roomId,

      checkInDate,

      checkOutDate,

      totalGuests

    });

  const pricing =
    calculateReservationPrice({

      basePrice: Number(room.basePrice),

      checkInDate,

      checkOutDate

    });

  const orderNumber =
    generateOrderNumber();

  return prisma.$transaction(

    async (tx) => {

      const reservation =
        await createReservation(
          tx,
          {

            orderNumber,

            userId,

            propertyId,

            roomId,

            checkInDate,

            checkOutDate,

            nightCount:
              pricing.nightCount,

            totalPrice:
              pricing.totalPrice,

            paymentDeadline:
              new Date(
                Date.now()
                +
                2 * 60 * 60 * 1000
              ),

            status:
              ReservationStatus.waiting_payment

          }
        );

      await createReservationDetails(

        tx,

        pricing.details.map(
          item => ({

            reservationId:
              reservation.id,

            bookingDate:
              item.bookingDate,

            roomPrice:
              item.roomPrice

          })
        )

      );

      await createReservationHistory(

        tx,

        {

          reservationId:
            reservation.id,

          newStatus:
            ReservationStatus.waiting_payment

        }

      );

      return reservation;

    }

  );

};