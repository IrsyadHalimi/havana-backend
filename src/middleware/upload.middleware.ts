import { upload } from "../config/multer"

export const uploadSingle = (fieldName: string) =>
  upload.single(fieldName);

export const uploadMultiple = (
  fieldName: string,
  maxCount: number
) => upload.array(fieldName, maxCount);