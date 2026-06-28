import { updateUser } from "../../repositories/auth/user.repository";

export const logoutService = () => ({
  execute: async (userId: string) => {
    await updateUser(userId, { refreshToken: null });

    return {
      message: "Logout success",
    };
  },
});