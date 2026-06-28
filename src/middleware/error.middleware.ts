import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Menggunakan pengecekan property 'name' karena AppError sekarang berbentuk functional/interface
  if (error && error.name === "AppError") {
    const appError = error as AppError; // Type-casting agar TypeScript tahu ini AppError
    
    return res.status(appError.statusCode).json({
      success: false,
      message: appError.message
    });
  }

  // Log error internal untuk kebutuhan debugging development
  console.error("Unhandled Error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};