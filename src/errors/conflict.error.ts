import { AppError, createAppError } from "./app.error";

// Kita gunakan tipe AppError yang sudah dibuat sebelumnya
export const createConflictError = (message: string): AppError => {
  return createAppError(message, 409);
};