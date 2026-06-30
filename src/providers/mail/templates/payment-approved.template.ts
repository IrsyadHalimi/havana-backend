import { Prisma } from "@prisma/client"

interface PaymentApprovedTemplateParams {

  fullName: string;

  propertyName: string;

  roomName: string;

  orderNumber: string;

  checkInDate: Date;

  checkOutDate: Date;

  totalPrice: Prisma.Decimal;

}

export const paymentApprovedTemplate = ({
  fullName,
  propertyName,
  roomName,
  orderNumber,
  checkInDate,
  checkOutDate,
  totalPrice
}: PaymentApprovedTemplateParams) => {

  return `

    <h2>Payment Confirmed</h2>

    <p>Hello <b>${fullName}</b>,</p>

    <p>Your payment has been approved.</p>

    <table>

      <tr>

        <td>Order Number</td>

        <td>${orderNumber}</td>

      </tr>

      <tr>

        <td>Property</td>

        <td>${propertyName}</td>

      </tr>

      <tr>

        <td>Room</td>

        <td>${roomName}</td>

      </tr>

      <tr>

        <td>Check In</td>

        <td>${checkInDate.toDateString()}</td>

      </tr>

      <tr>

        <td>Check Out</td>

        <td>${checkOutDate.toDateString()}</td>

      </tr>

      <tr>

        <td>Total</td>

        <td>Rp ${totalPrice}</td>

      </tr>

    </table>

  `;

};