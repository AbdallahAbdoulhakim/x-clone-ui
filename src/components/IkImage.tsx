"use client";

import { Image, buildSrc } from "@imagekit/next";
import { useState } from "react";

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
  const [showPlaceholder, setShowPlaceholder] = useState(true);
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
      style={
        showPlaceholder
          ? {
              backgroundImage: `url(${buildSrc({
                urlEndpoint: urlEndpoint!,
                src: path,
                transformation: [
                  {
                    quality: 10,
                    blur: 90,
                  },
                ],
              })})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
      alt={alt}
      className={className}
      onLoad={() => setShowPlaceholder(false)}
    />
  );
}
