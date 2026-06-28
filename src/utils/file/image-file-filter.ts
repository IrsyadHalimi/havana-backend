import { Request } from "express";
import { FileFilterCallback } from "multer";

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png"
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {

    return callback(
      new Error(
        "Only JPG and PNG files are allowed."
      )
    );

  }

  callback(null, true);

};