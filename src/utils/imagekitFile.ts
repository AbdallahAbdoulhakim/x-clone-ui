import { imageKit } from "@/imagekitInstance";

export type FileDetailResponse = {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
  customMetadata?: { sensitive: boolean };
};

export const getFileDetails = async (
  fileId: string
): Promise<FileDetailResponse> => {
  return new Promise((resolve, reject) => {
    imageKit.getFileDetails(fileId, function (error, result) {
      if (error) reject(error);
      else resolve(result as FileDetailResponse);
    });
  });
};
