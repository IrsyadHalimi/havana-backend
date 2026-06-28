import multer from "multer";
import path from "path";

import { generateFileName }
from "../utils/file/generate-file-name";

import { imageFileFilter }
from "../utils/file/image-file-filter";

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    callback
  ) => {

    callback(
      null,
      path.join(
        process.cwd(),
        "uploads"
      )
    );

  },

  filename: (
    req,
    file,
    callback
  ) => {

    callback(
      null,
      generateFileName(
        file.originalname
      )
    );

  }

});

export const upload = multer({

  storage,

  fileFilter:
    imageFileFilter,

  limits: {

    fileSize:
      1024 * 1024

  }

});