import {
  verifyRefreshToken,
  generateAccessToken
} from "../../utils/jwt";

import {
  UserRepository
} from "../../repositories/auth/user.repository";

export class RefreshTokenService {

  constructor(
    private userRepo =
      new UserRepository()
  ) {}

  async execute(
    refreshToken: string
  ) {

    const payload =
      verifyRefreshToken(
        refreshToken
      ) as any;

    const user =
      await this.userRepo
        .findByRefreshToken(
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
}