"use client";

import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
  // /**
  //  * Authenticates the user by making a request to the authentication API endpoint.
  //  *
  //  * @returns {Promise<{signature: string, expire: number, token: string}>}
  //  *          A promise that resolves with an object containing the authentication
  //  *          signature, expiration time, and token.
  //  * @throws {Error} Throws an error if the request fails or if the response is not OK.
  //  */

  const authenticator = async () => {
    try {
      const res = await fetch("/api/imagekit-auth");

      if (!res.ok) {
        throw new Error("Failed to authenticate user");
      }
      return res.json(); // this res contain token , expiry and signature
    } catch (error) {
      throw error;
    }
  };

  return (
    <SessionProvider refetchInterval={5*60}>
      <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
    </SessionProvider>
  );
}
