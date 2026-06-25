import {
  comparePassword
} from "../../utils/password";

import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/jwt";

import {
  UnauthorizedError
} from "../../errors/unauthorized.error";

import {
  UserRepository
} from "../../repositories/auth/user.repository";

export class LoginService {

  constructor(
    private userRepo =
      new UserRepository()
  ) {}

  async execute(
    email: string,
    password: string
  ) {

    const user =
      await this.userRepo
        .findByEmail(email);

    if (!user) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    if (!user.password) {
      throw new UnauthorizedError(
        "Account not verified"
      );
    }

    const matched =
      await comparePassword(
        password,
        user.password
      );

    if (!matched) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    const payload = {
      id: user.id,
      role: user.role
    };

    const accessToken =
      generateAccessToken(
        payload
      );

    const refreshToken =
      generateRefreshToken(
        payload
      );

    await this.userRepo
      .updateRefreshToken(
        user.id,
        refreshToken
      );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName:
          user.fullName
      }
    };
  }
}