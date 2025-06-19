'use server'

import { BUNNY } from "@/constants/index"
import { headers } from "@/node_modules/next/headers"
import { auth } from "../auth"
import { apiFetch ,getEnv, withErrorHandling } from "../utils"

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID =getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEYS = {
    streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
  };

const getSessionUserId=async():Promise<string>=>{
    const session = await auth.api.getSession({Headers:await headers()})

    if(!session) throw new Error('Unauthenticated');

    return session.user.id;
}

export const getVideoUploadUrl = withErrorHandling(async () => {
    await getSessionUserId();
    const videoResponse = await apiFetch<BunnyVideoResponse>(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
      {
        method: "POST",
        bunnyType: "stream",
        body: { title: "Temp Title", collectionId: "" },
      }
    );
  
    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;
    return {
      videoId: videoResponse.guid,
      uploadUrl,
      accessKey: ACCESS_KEYS.streamAccessKey,
    };
  });

