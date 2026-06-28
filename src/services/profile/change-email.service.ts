import { addHours } from "date-fns";

import {
  AppError,
  createAppError
} from "../../errors/app.error";

import {
  generateToken
} from "../../utils/token";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";
import { findUserByEmail, findUserById, updateUser } from "../../repositories/auth/user.repository";


export const changeEmailService = (
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    userId: string,
    email: string
  ) => {

    const user =
      await findUserById(
        userId
      );

    if (!user) {
      throw createAppError(
        "User not found",
        404
      );
    }

    if (user.email === email) {
      throw createAppError(
        "Email must be different",
        400
      );
    }

    const existingEmail =
      await findUserByEmail(
        email
      );

    if (existingEmail) {
      throw createAppError(
        "Email already registered",
        409
      );
    }

    await updateUser(
      userId,
      { email }
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