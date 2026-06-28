import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,

  SMTP: {
    HOST: process.env.SMTP_HOST!,
    PORT: Number(process.env.SMTP_PORT),
    SECURE: process.env.SMTP_SECURE === "true",
    USER: process.env.SMTP_USER!,
    PASSWORD: process.env.SMTP_PASSWORD!,
    FROM: process.env.MAIL_FROM!
  },

  FRONTEND_URL: process.env.FRONTEND_URL!
};