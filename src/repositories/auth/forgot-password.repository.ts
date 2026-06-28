import { addHours } from "date-fns";

import { generateToken } from "../../utils/token";

import { userRepository } from "../../repositories/auth/user.repository";
import { passwordResetRepository } from "../../repositories/auth/password-reset.repository";

export const forgotPasswordService = (
  userRepo = userRepository(),
  resetRepo = passwordResetRepository()
) => ({
  execute: async (email: string) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return {
        message: "If email exists, reset link sent",
      };
    }

    await resetRepo.deleteUnusedByUserId(user.id);

    const token = generateToken();

    await resetRepo.create({
      userId: user.id,
      token,
      expiredAt: addHours(new Date(), 1),
    });

    return {
      message: "If email exists, reset link sent",
    };
  },
});