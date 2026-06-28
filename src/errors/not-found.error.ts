import { createAppError } from "./app.error";

export const NotFoundError = (message: string) => {
  return createAppError(message, 404);
};