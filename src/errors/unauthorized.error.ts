import { createAppError } from "./app.error";

export const UnauthorizedError = (message: string) => {
  return createAppError(message, 401);
};