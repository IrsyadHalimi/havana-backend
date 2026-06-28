import { Request } from "express";

export interface AuthRequest extends Omit<Request, 'user'> {
  user: {
    id: string;
    role: string;
    email: string;
  };
}