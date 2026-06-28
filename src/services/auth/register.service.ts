import { addHours } from "date-fns";

import {
  createUser,
  findUserByEmail
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";

import {
  generateToken
} from "../../utils/token";

import {
  createConflictError
} from "../../errors/conflict.error";

import {
  sendMail
} from "../../providers/mail/send-mail.provider";

import {
  verificationEmailTemplate
} from "../../providers/mail/templates/verification-email";


export const registerService = (
  userRepo = createUser,
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    data: any
  ) => {

    const existing =
      await findUserByEmail(
        data.email
      );

    if (existing) {
      throw createConflictError(
        "Email already registered"
      );
    }

    const user =
      await createUser({
        fullName: data.fullName,
        email: data.email,
        role: data.role
      });

    const token =
      generateToken();

    await verificationRepo.create({
      userId: user.id,
      token,
      expiredAt: addHours(
        new Date(),
        1
      )
    });

    let body = verificationEmailTemplate(
      data.fullName,
      "http://localhost:5173"
    )

    await sendMail({
      to: data.email,
      subject: "Selamat Datang di Havana! 🍃",
      html: body,
    });

    return {
      message:
        "Registration success. Please verify email."
    };
  }

});