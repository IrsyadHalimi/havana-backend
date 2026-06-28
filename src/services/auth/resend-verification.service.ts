import { addHours } from "date-fns";

import {
  AppError
} from "../../errors/app.error";

import {
  generateToken
} from "../../utils/token";

import {
  userRepository
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";


export const resendVerificationService = (
  userRepo = userRepository(),
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    email: string
  ) => {

    const user =
      await userRepo.findByEmail(
        email
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (user.isVerified) {
      throw new AppError(
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

    return {
      message:
        "Verification email sent"
    };
  }

});