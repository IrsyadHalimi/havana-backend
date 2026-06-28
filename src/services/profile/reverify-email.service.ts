import { addHours } from "date-fns";
import { AppError, createAppError } from "../../errors/app.error";
import { generateToken } from "../../utils/token";
import { emailVerificationRepository } from "../../repositories/auth/email-verification.repository";
import { findUserById } from "../../repositories/auth/user.repository";

export const reverifyEmailService = (
  verificationRepo = emailVerificationRepository()
) => async (
  userId: string
) => {

  const user = await findUserById(userId);

  if (!user) {
    throw createAppError("User not found", 404);
  }

  if (user.isVerified) {
    throw createAppError("Email already verified", 400);
  }

  await verificationRepo.deleteByUserId(userId);

  const token = generateToken();

  await verificationRepo.create({
    userId,
    token,
    expiredAt: addHours(new Date(), 1),
  });

  /**
   * TODO:
   * Send Verification Email
   */

  return {
    message: "Verification email sent",
  };
};