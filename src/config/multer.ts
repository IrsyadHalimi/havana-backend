import multer from "multer";

import path from "path";

import { ONE_MB }
from "../utils/file";

const storage =
  multer.diskStorage({

    destination(
      req,
      file,
      cb
    ) {

      cb(
        null,
        "uploads/avatar"
      );
    },

    filename(
      req,
      file,
      cb
    ) {

      cb(
        null,
        Date.now() +
        path.extname(
          file.originalname
        )
      );

    }

  });

export const avatarUpload =
  multer({

    storage,

    limits: {
      fileSize:
        ONE_MB
    },

    fileFilter(
      req,
      file,
      cb
    ) {

      const allowed =
        [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif"
        ];

      const ext =
        path.extname(
          file.originalname
        );

      cb(
        null,
        allowed.includes(ext)
      );

    }

  });