import { findUserByRefreshToken } from "../../repositories/auth/user.repository";
import {
  verifyRefreshToken,
  generateAccessToken
} from "../../utils/jwt";


export const refreshTokenService = () => ({

  execute: async (
    refreshToken: string
  ) => {

    const payload =
      verifyRefreshToken(
        refreshToken
      ) as any;

    const user =
      await findUserByRefreshToken(
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