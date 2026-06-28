export const calculateNightCount = (

  checkIn: Date,

  checkOut: Date

) => {

  const milliseconds =

    checkOut.getTime()

    -

    checkIn.getTime();

  return Math.ceil(

    milliseconds /

    (1000 * 60 * 60 * 24)

  );

};