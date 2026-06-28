import { addHours } from "date-fns";

import {
  AppError,
  createAppError
} from "../../errors/app.error";

import {
  generateToken
} from "../../utils/token";

import {
  createUser,
  findUserByEmail,
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";

import {
  sendMail
} from "../../providers/mail/send-mail.provider";

import {
  verificationEmailTemplate
} from "../../providers/mail/templates/verification-email";

export const resendVerificationService = (
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    email: string
  ) => {

    const user =
      await findUserByEmail(email);

    if (!user) {
      throw createAppError(
        "User not found",
        404
      );
    }

    if (user.isVerified) {
      throw createAppError(
        "Email already verified",
        400
      );
    }

    await verificationRepo
      .deleteUnusedByUserId(
        user.id
      );

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
      user.fullName,
      "http://localhost:5173"
    )

    await sendMail({
      to: user.email,
      subject: "Selamat Datang di Havana! 🍃",
      html: body,
    });

    return {
      message:
        "Verification email sent"
    };
  }

});