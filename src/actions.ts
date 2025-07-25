"use server";

import { getFileDetails } from "./utils/imagekitFile";

export const getIkImageDetails = async (imageId: string) => {
  const details = await getFileDetails(imageId);

  return {
    width: details.width,
    height: details.height,
    filePath: details.filePath,
    url: details.url,
    fileType: details.fileType,
    ...(details.customMetadata?.sensitive
      ? { customMetadata: { sensitive: details.customMetadata?.sensitive } }
      : {}),
  };
};
