"use client";

import { Image } from "@imagekit/next";

type ImageProps = {
  path: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function IkImage({
  path,
  w,
  h,
  alt,
  className,
  tr,
}: ImageProps) {
  return (
    <Image
      urlEndpoint={urlEndpoint!}
      src={path}
      {...(tr
        ? {
            transformation: [{ width: `${w}`, height: `${h}` }],
            width: w,
            height: h,
          }
        : { width: w, height: h })}
      alt={alt}
      className={className}
    />
  );
}
