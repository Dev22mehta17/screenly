export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
  
  STORAGE_BASE_URL: "https://storage.bunnycdn.com/dev-screenly",
  CDN_URL: "https://DEV-Screenly.b-cdn.net",
  TRANSCRIPT_URL: "https://vz-522e9d2e-251.b-cdn.net",
  EMBED_URL: "https://iframe.mediadelivery.net/embed",
  STREAM_BASE_URL: "https://video.bunnycdn.com/library",
};

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
  "Most Viewed",
  "Most Recent",
  "Oldest First",
  "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
};

export const infos = ["transcript", "metadata"];

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};
 
export const dummyCards = [
  {
    id: "1",
    title: "SnapChat Message",
    thumbnail: "/assets/samples/thumbnail (1).png",
    createdAt: new Date("2025-05-01"),
    userImg: "/assets/images/jason.png",
    username: "Jason",
    views: 10,
    visibility: "public",
    duration: 156,
  },
  {
    id: "2",
    title: "Instagram Reel",
    thumbnail: "/assets/samples/thumbnail (2).png",
    createdAt: new Date("2025-04-21"),
    userImg: "/assets/images/emily.png",
    username: "Emily",
    views: 58,
    visibility: "private",
    duration: 212,
  },
  {
    id: "3",
    title: "Twitter Space",
    thumbnail: "/assets/samples/thumbnail (3).png",
    createdAt: new Date("2025-04-30"),
    userImg: "/assets/images/david.png",
    username: "David",
    views: 75,
    visibility: "public",
    duration: 300,
  },
  {
    id: "4",
    title: "YouTube Shorts",
    thumbnail: "/assets/samples/thumbnail (4).png",
    createdAt: new Date("2025-03-29"),
    userImg: "/assets/images/lisa.png",
    username: "Lisa",
    views: 102,
    visibility: "public",
    duration: 90,
  },
  {
    id: "5",
    title: "Twitch Clip",
    thumbnail: "/assets/samples/thumbnail (5).png",
    createdAt: new Date("2025-04-10"),
    userImg: "/assets/images/alex.png",
    username: "Alex",
    views: 41,
    visibility: "private",
    duration: 180,
  },
  {
    id: "6",
    title: "LinkedIn Live",
    thumbnail: "/assets/samples/thumbnail (6).png",
    createdAt: new Date("2025-05-05"),
    userImg: "/assets/images/sarah.png",
    username: "Sarah",
    views: 25,
    visibility: "unlisted",
    duration: 120,
  },
  {
    id: "7",
    title: "Facebook Story",
    thumbnail: "/assets/samples/thumbnail (7).png",
    createdAt: new Date("2025-04-15"),
    userImg: "/assets/images/jessica.png",
    username: "Jessica",
    views: 89,
    visibility: "public",
    duration: 240,
  },
  {
    id: "8",
    title: "Pinterest Video",
    thumbnail: "/assets/samples/thumbnail (8).png",
    createdAt: new Date("2025-04-27"),
    userImg: "/assets/images/michael.png",
    username: "Michael",
    views: 66,
    visibility: "public",
    duration: 133,
  },
];
