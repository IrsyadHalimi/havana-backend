import fs from "fs";
import path from "path";

import { getFileUrl } from "../../utils/file/get-file-url";

export const saveUploadedFile = (
  file: Express.Multer.File
) => {

  if (!file) {

    return null;

  }

  return {

    fileName: file.filename,

    originalName: file.originalname,

    mimeType: file.mimetype,

    size: file.size,

    path: file.path,

    url: getFileUrl(file.filename)

  };

};

export const deleteUploadedFile = (
  fileName: string
) => {

  const filePath = path.join(

    process.cwd(),

    process.env.UPLOAD_PATH || "uploads",

    fileName

  );

  if (fs.existsSync(filePath)) {

    fs.unlinkSync(filePath);

  }

};