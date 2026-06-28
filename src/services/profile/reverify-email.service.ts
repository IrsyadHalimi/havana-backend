import { addHours } from "date-fns";
import { AppError } from "../../errors/app.error";
import { generateToken } from "../../utils/token";
import { userRepository } from "../../repositories/auth/user.repository";
import { emailVerificationRepository } from "../../repositories/auth/email-verification.repository";

export const reverifyEmailService = (
  userRepo = userRepository(),
  verificationRepo = emailVerificationRepository()
) => async (
  userId: string
) => {

  const user = await userRepo.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isVerified) {
    throw new AppError("Email already verified", 400);
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