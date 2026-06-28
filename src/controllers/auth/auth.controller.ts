import {
  Request,
  Response,
} from "express";

import { loginService } from "../../services/auth/login.service";
import { registerService } from "../../services/auth/register.service";
import { resendVerificationService } from "../../services/auth/resend-verification.service";
import { verifyEmailService } from "../../services/auth/verify-email.service";

export const login = async (
  req: Request,
  res: Response
) => {
  const result = await loginService().execute(
    req.body.email,
    req.body.password
  );

  return res.json(result);
};

export const register = async (
  req: Request,
  res: Response
) => {
  const result = await registerService().execute(
    req.body
  );

  return res
    .status(201)
    .json(result);
};

export const resendVerification = async (
  req: Request,
  res: Response
) => {
  const result = await resendVerificationService().execute(
    req.body.email
  );

  return res
    .status(201)
    .json(result);
};

export const verifyEmail = async (
  req: Request,
  res: Response
) => {
  const result = await verifyEmailService().execute(
    req.body.token,
    req.body.password
  );

  return res.json(result);
};