import { transporter } from "../../../config/nodemailer";

import { paymentRejectedTemplate } from "./payment-rejected.template";

interface SendPaymentRejectedEmailParams {

  email: string;

  fullName: string;

  orderNumber: string;

  reason: string;

}

export const sendPaymentRejectedEmail = async (
  params: SendPaymentRejectedEmailParams
) => {

  await transporter.sendMail({

    to: params.email,

    subject: `Payment Rejected - ${params.orderNumber}`,

    html: paymentRejectedTemplate(params)

  });

};