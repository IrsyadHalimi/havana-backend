export const generateBookingDates = (
  checkInDate: Date,
  checkOutDate: Date
) => {

  const dates: Date[] = [];

  const current =
    new Date(checkInDate);

  while (current < checkOutDate) {

    dates.push(
      new Date(current)
    );

    current.setDate(
      current.getDate() + 1
    );

  }

  return dates;

};