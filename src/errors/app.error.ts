// 1. Definisikan tipe untuk kustom AppError kamu
export interface AppError extends Error {
  statusCode: number;
}

// 2. Buat factory function untuk men-generate objek error tersebut
export const createAppError = (
  message: string,
  statusCode = 400
): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.name = "AppError"; // Menandai nama error agar mudah di-filter di middleware

  return error;
};