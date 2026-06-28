import {
  hashPassword
} from "../../utils/password";

import {
  NotFoundError
} from "../../errors/not-found.error";

import {
  AppError
} from "../../errors/app.error";

import {
  userRepository
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";


export const verifyEmailService = (
  userRepo = userRepository(),
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
      throw new NotFoundError(
        "Invalid token"
      );
    }

    if (
      verification.expiredAt <
      new Date()
    ) {
      throw new AppError(
        "Token expired",
        400
      );
    }

    const hashedPassword =
      await hashPassword(
        password
      );

    await userRepo.verifyUser(
      verification.userId,
      hashedPassword
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