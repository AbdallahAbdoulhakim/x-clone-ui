import ImageKit from "imagekit";

const globalForImageKit = globalThis as unknown as { imageKit: ImageKit };

export const imageKit =
  globalForImageKit.imageKit ||
  new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
  });

if (process.env.NODE_ENV !== "production")
  globalForImageKit.imageKit = imageKit;
