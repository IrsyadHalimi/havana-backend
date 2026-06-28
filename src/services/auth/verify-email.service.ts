import {
  hashPassword
} from "../../utils/password";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {
  createAppError
} from "../../errors/app.error";

import {
  updateUser
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";


export const verifyEmailService = (
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    token: string,
    password: string
  ) => {

    const verification =
      await verificationRepo.findValidToken(
        token
      );

    if (!verification) {
      throw NotFoundError(
        "Invalid token"
      );
    }

    if (
      verification.expiredAt <
      new Date()
    ) {
      throw createAppError(
        "Token expired",
        400
      );
    }

    const hashedPassword =
      await hashPassword(
        password
      );

    await updateUser(
      verification.userId,
      { isVerified: true, password: hashedPassword }
    );

    await verificationRepo.markUsed(
      verification.id
    );

    return {
      message:
        "Email verified successfully"
    };
  }

});