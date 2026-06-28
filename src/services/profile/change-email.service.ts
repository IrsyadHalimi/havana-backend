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


export const changeEmailService = (
  userRepo = userRepository(),
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    userId: string,
    email: string
  ) => {

    const user =
      await userRepo.findById(
        userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (user.email === email) {
      throw new AppError(
        "Email must be different",
        400
      );
    }

    const existingEmail =
      await userRepo.findByEmail(
        email
      );

    if (existingEmail) {
      throw new AppError(
        "Email already registered",
        409
      );
    }

    await userRepo.updateEmail(
      userId,
      email
    );

    await verificationRepo.deleteByUserId(
      userId
    );

    const token =
      generateToken();

    await verificationRepo.create({
      userId,
      token,
      expiredAt: addHours(
        new Date(),
        1
      )
    });

    /**
     * TODO
     * Send Email
     */

    return {
      message:
        "Verification email sent"
    };
  }

});