import {
  Request,
  Response,
} from "express";

import { changeEmailService } from "../../services/profile/change-email.service";
import { changePasswordService } from "../../services/profile/change-password.service";
import { getProfileService } from "../../services/profile/get-profile.service";
import { reverifyEmailService } from "../../services/profile/reverify-email.service";

export const changeEmail = async (
  req: Request,
  res: Response
) => {
  const result = await changeEmailService().execute(
    req.user!.id,
    req.body.email
  );

  return res.json(result);
};

export const changePassword = async (
  req: Request,
  res: Response
) => {
  const result = await changePasswordService()(
    req.user!.id,
    req.body.oldPassword,
    req.body.newPassword
  );

  return res.json(result);
};

export const getProfile = async (
  req: Request,
  res: Response
) => {
  const result = await getProfileService()(
    req.user!.id
  );

  return res.json(result);
};

export const reverifyEmail = async (
  req: Request,
  res: Response
) => {
  const result = await reverifyEmailService()(
    req.user!.id
  );

  return res.json(result);
};