export const getFileUrl = (
  fileName: string
): string => {

  return `/${process.env.UPLOAD_PATH}/${fileName}`;

};