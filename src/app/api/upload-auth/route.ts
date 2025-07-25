import { getUploadAuthParams } from "@imagekit/next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // Never expose this on client side
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    //expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    token: uuid(), // Optional, a unique token for request
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
