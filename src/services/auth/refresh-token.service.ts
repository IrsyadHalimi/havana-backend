import {
  verifyRefreshToken,
  generateAccessToken
} from "../../utils/jwt";

import {
  userRepository
} from "../../repositories/auth/user.repository";


export const refreshTokenService = (
  userRepo = userRepository()
) => ({

  execute: async (
    refreshToken: string
  ) => {

    const payload =
      verifyRefreshToken(
        refreshToken
      ) as any;

    const user =
      await userRepo.findByRefreshToken(
        refreshToken
      );

    if (!user) {
      throw new Error(
        "Invalid token"
      );
    }

    return {
      accessToken:
        generateAccessToken({
          id: user.id,
          role: user.role
        })
    };
  }

});