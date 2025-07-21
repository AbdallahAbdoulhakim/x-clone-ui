// import { Dispatch,  SetStateAction } from "react";
import { RefObject } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";

// Create an AbortController instance to provide an option to cancel the upload if needed.
const abortController = new AbortController();

type ReturnType = {
  success: boolean;
  response?: UploadResponse;
  errType?:
    | "AbortError"
    | "InvalidRequestError"
    | "UploadNetworkError"
    | "ServerError"
    | "UnkownError"
    | "FileError"
    | "AuthError";
  message?: string;
};

const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

/**
 * Handles the file upload process.
 *
 * This function:
 * - Validates file selection.
 * - Retrieves upload authentication credentials.
 * - Initiates the file upload via the ImageKit SDK.
 * - Updates the upload progress.
 * - Catches and processes errors accordingly.
 */
export const handleUpload = async (
  fileInputRef: RefObject<HTMLInputElement | null>,
  settings: {
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }
  //   setProgress: Dispatch<SetStateAction<number>>
): Promise<ReturnType> => {
  // Access the file input element using the ref
  const fileInput = fileInputRef.current;
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    return { success: false, errType: "FileError" };
  }

  // Extract the first file from the file input
  const file = fileInput.files[0];

  // Retrieve authentication parameters for the upload.
  let authParams;
  try {
    authParams = await authenticator();
  } catch (authError: unknown) {
    if (authError instanceof Error) {
      return {
        success: false,
        errType: "AuthError",
        message: authError.message,
      };
    } else {
      return {
        success: false,
        errType: "AuthError",
        message: "An unkown authentication error occured!",
      };
    }
  }
  const { signature, expire, token, publicKey } = authParams;

  const transformation = `${
    settings.type === "square"
      ? "ar-1-1"
      : settings.type === "wide"
      ? "ar-16-9"
      : ""
  },w-600`;

  // Call the ImageKit SDK upload function with the required parameters and callbacks.
  try {
    const uploadResponse = await upload({
      // Authentication parameters
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name, // Optionally set a custom file name
      folder: "/posts",
      transformation: {
        pre: transformation,
      },
      customMetadata: {
        sensitive: settings.sensitive,
      },
      // Progress callback to update upload progress state
      //   onProgress: (event) => {
      //     setProgress((event.loaded / event.total) * 100);
      //   },
      // Abort signal to allow cancellation of the upload if needed.
      abortSignal: abortController.signal,
    });

    return { success: true, response: uploadResponse };
  } catch (error) {
    // Handle specific error types provided by the ImageKit SDK.
    if (error instanceof ImageKitAbortError) {
      return { success: false, errType: "AbortError", message: error.message };
    } else if (error instanceof ImageKitInvalidRequestError) {
      return {
        success: false,
        errType: "InvalidRequestError",
        message: error.message,
      };
    } else if (error instanceof ImageKitUploadNetworkError) {
      return {
        success: false,
        errType: "UploadNetworkError",
        message: error.message,
      };
    } else if (error instanceof ImageKitServerError) {
      return { success: false, errType: "ServerError", message: error.message };
    } else {
      // Handle any other errors that may occur.
      return {
        success: false,
        errType: "UnkownError",
        message: "An unkonw error occured!",
      };
    }
  }
};
