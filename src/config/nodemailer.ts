import nodemailer from "nodemailer";

import { env } from "./env";

export const transporter = nodemailer.createTransport({

  host: env.SMTP.HOST,

  port: env.SMTP.PORT,

  secure: env.SMTP.SECURE,

  auth: {

    user: env.SMTP.USER,

    pass: env.SMTP.PASSWORD

  }

});

export const verifyMailer = async () => {

  try {

    await transporter.verify();

    console.log(
      "📧 SMTP connected successfully."
    );

  } catch (error) {

    console.error(
      "❌ SMTP connection failed.",
      error
    );

  }

};