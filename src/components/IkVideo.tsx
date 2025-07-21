"use client";

import { Video, buildSrc } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoProps = {
  path: string;
  className?: string;
};
export default function IkVideo({ path, className }: VideoProps) {
  return (
    <Video
      className={className}
      urlEndpoint={urlEndpoint!}
      src={path}
      transformation={[{ height: 1080, width: 1920, quality: 90 }]}
      controls
      preload="none"
      poster={buildSrc({
        urlEndpoint: urlEndpoint!,
        src: `${path}/ik-thumbnail.jpg`, // Append ik-thumbnail.jpg after the video URL
      })}
    />
  );
}
