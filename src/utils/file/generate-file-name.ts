import path from "path";

export const generateFileName = (
  originalName: string
) => {

  const extension =
    path.extname(originalName);

  const uniqueName =
    `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  return `${uniqueName}${extension}`;

};