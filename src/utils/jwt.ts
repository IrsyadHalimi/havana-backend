import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET as string,
    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
    }
  );
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET as string, 
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn']
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(
    token,
    env.JWT_SECRET as string
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET as string
  );
};