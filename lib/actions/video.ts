'use server'

import { BUNNY } from "@/constants/index"
import { db } from "@/drizzle/db"
import { videos } from "@/drizzle/schema"
import { revalidatePath } from "@/node_modules/next/cache"
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

const revalidatePaths = (paths: string[]) => {
    paths.forEach((path) => revalidatePath(path));
  };
  

//   export const getVideoUploadUrl = withErrorHandling(async () => {
//     await getSessionUserId();
//     const videoResponse = await apiFetch<BunnyVideoResponse>(
//       `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
//       {
//         method: "POST",
//         bunnyType: "stream",
//         body: { title: "Temp Title", collectionId: "" },
//       }
//     );
  
//     const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;
//     return {
//       videoId: videoResponse.guid,
//       uploadUrl,
//       accessKey: ACCESS_KEYS.streamAccessKey,
//     };
//   });
export const getVideoUploadUrl = withErrorHandling(async () => {
    console.log("🔐 Getting session user ID...");
    await getSessionUserId();
  
    console.log("📡 Sending request to Bunny to create video...");
  
    const res = await apiFetch<BunnyVideoResponse>(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
      {
        method: "POST",
        bunnyType: "stream",
        body: { title: "Temp Title", collectionId: "" },
      }
    );
  
    console.log("📥 Bunny video creation response:", res);
  
    if (!res || !res.guid) {
      console.error("❌ Bunny API did not return a guid. Response:", res);
      throw new Error("Failed to get video upload credentials");
    }
  
    if (!ACCESS_KEYS.streamAccessKey) {
      console.error("❌ Missing Bunny stream access key.");
      throw new Error("Failed to get video upload credentials");
    }
  
    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${res.guid}`;
    console.log("✅ Upload URL and access key ready:", { uploadUrl });
  
    return {
      videoId: res.guid,
      uploadUrl,
      accessKey: ACCESS_KEYS.streamAccessKey,
    };
  });
  
  

export const getThumbnailUploadUrl = withErrorHandling(
    async (videoId: string) => {
      const timestampedFileName = `${Date.now()}-${videoId}-thumbnail`;
      const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${timestampedFileName}`;
      const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${timestampedFileName}`;
  
      return {
        uploadUrl,
        cdnUrl,
        accessKey: ACCESS_KEYS.storageAccessKey,
      };
    }
  );
  
  export const saveVideoDetails = withErrorHandling(
    async (videoDetails: VideoDetails) => {
      const userId = await getSessionUserId();
    //   await validateWithArcjet(userId);
      await apiFetch(
         `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
        {
          method: "POST",
          bunnyType: "stream",
          body: {
            title: videoDetails.title,
            description: videoDetails.description,
          },
        }
      );
  
    //   const now = new Date();
      await db.insert(videos).values({
        ...videoDetails,
        videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
        userId,
        createdAt: new Date,
        updatedAt: new Date,
      });
  
      revalidatePaths(["/"]);
      return { videoId: videoDetails.videoId };
    }
  );

