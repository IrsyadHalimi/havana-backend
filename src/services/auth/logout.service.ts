import { userRepository } from "../../repositories/auth/user.repository";

export const logoutService = (
  userRepo = userRepository()
) => ({
  execute: async (userId: string) => {
    await userRepo.removeRefreshToken(userId);

    return {
      message: "Logout success",
    };
  },
});