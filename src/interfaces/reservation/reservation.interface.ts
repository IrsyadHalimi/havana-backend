export interface CheckAvailabilityResult {
  available: boolean;
  unavailableDate?: Date;
}

export interface CreateReservationRequest {
  propertyId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date; 
  totalGuests: number;
}

export interface ReservationPriceItem {
  bookingDate: Date;
  roomPrice: number;
}