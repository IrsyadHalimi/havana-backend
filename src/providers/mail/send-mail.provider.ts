import { transporter } from "../../config/nodemailer";

import { env } from "../../config/env";

interface SendMailParams {

  to: string;

  subject: string;

  html: string;

}

export const sendMail = async ({
  to,
  subject,
  html
}: SendMailParams) => {

  return transporter.sendMail({

    from: env.SMTP.FROM,

    to,

    subject,

    html

  });

};