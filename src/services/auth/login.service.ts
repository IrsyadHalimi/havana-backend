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
  createUser,
  findUserByEmail,
  saveRefreshToken,
  updateUser
} from "../../repositories/auth/user.repository";


export const loginService = () => ({
  execute: async (
    email: string,
    password: string
  ) => {

    const user =
      await findUserByEmail(email);

    if (!user) {
      throw UnauthorizedError(
        "Invalid credentials"
      );
    }

    if (!user.password) {
      throw UnauthorizedError(
        "Account not verified"
      );
    } 

    const matched =
      await comparePassword(
        password,
        user.password
      );

    if (!matched) {
      throw UnauthorizedError(
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

    await saveRefreshToken(
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
        fullName: user.fullName
      }
    };
  }
});