import ImageKit from "imagekit";
interface FileDetailResponse {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
  customMetadata?: { sensitive: boolean };
}

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export const getFileDetails = async (
  fileId: string
): Promise<FileDetailResponse> => {
  return new Promise((resolve, reject) => {
    imagekit.getFileDetails(fileId, function (error, result) {
      if (error) reject(error);
      else resolve(result as FileDetailResponse);
    });
  });
};
