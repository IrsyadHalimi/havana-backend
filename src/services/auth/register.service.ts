import { addHours } from "date-fns";

import {
  userRepository
} from "../../repositories/auth/user.repository";

import {
  emailVerificationRepository
} from "../../repositories/auth/email-verification.repository";

import {
  generateToken
} from "../../utils/token";

import {
  ConflictError
} from "../../errors/conflict.error";


export const registerService = (
  userRepo = userRepository(),
  verificationRepo = emailVerificationRepository()
) => ({

  execute: async (
    data: any
  ) => {

    const existing =
      await userRepo.findByEmail(
        data.email
      );

    if (existing) {
      throw new ConflictError(
        "Email already registered"
      );
    }

    const user =
      await userRepo.create({
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

    /**
     * next sprint:
     * send email
     */

    return {
      message:
        "Registration success. Please verify email."
    };
  }

});