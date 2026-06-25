import { RequestHandler } from "express";

export const validate =
  (schema: any): RequestHandler =>
  (req, res, next) => {

    const result =
      schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        errors: result.error.issues,
      });
    }

    next();
  };