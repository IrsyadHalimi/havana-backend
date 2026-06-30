import { transporter } from "../../../config/nodemailer";
import { Prisma } from "@prisma/client"
import { paymentApprovedTemplate } from "./payment-approved.template";

interface SendPaymentApprovedEmailParams {

  email: string;

  fullName: string;

  propertyName: string;

  roomName: string;

  orderNumber: string;

  checkInDate: Date;

  checkOutDate: Date;

  totalPrice: Prisma.Decimal;

}

export const sendPaymentApprovedEmail = async (
  params: SendPaymentApprovedEmailParams
) => {

  await transporter.sendMail({

    to: params.email,

    subject: `Reservation Confirmed - ${params.orderNumber}`,

    html: paymentApprovedTemplate(params)

  });

};