import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ilike, sql } from "drizzle-orm";
// import { videos } from "@/drizzle/schema";
import { DEFAULT_VIDEO_CONFIG, DEFAULT_RECORDING_CONFIG } from "@/constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

export function parseTranscript(transcript: string): TranscriptEntry[] {
    const lines = transcript.replace(/^WEBVTT\s*/, "").split("\n");
    const result: TranscriptEntry[] = [];
    let tempText: string[] = [];
    let startTime: string | null = null;
  
    for (const line of lines) {
      const trimmedLine = line.trim();
      const timeMatch = trimmedLine.match(
        /(\d{2}:\d{2}:\d{2})\.\d{3}\s-->\s(\d{2}:\d{2}:\d{2})\.\d{3}/
      );
  
      if (timeMatch) {
        if (tempText.length > 0 && startTime) {
          result.push({ time: startTime, text: tempText.join(" ") });
          tempText = [];
        }
        startTime = timeMatch[1] ?? null;
      } else if (trimmedLine) {
        tempText.push(trimmedLine);
      }
  
      if (tempText.length >= 3 && startTime) {
        result.push({ time: startTime, text: tempText.join(" ") });
        tempText = [];
        startTime = null;
      }
    }
  
    if (tempText.length > 0 && startTime) {
      result.push({ time: startTime, text: tempText.join(" ") });
    }
  
    return result;
  }
  

export function daysAgo(inputDate: Date): string {
    const input = new Date(inputDate);
    const now = new Date();
  
    const diffTime = now.getTime() - input.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays <= 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "1 day ago";
    } else {
      return `${diffDays} days ago`;
    }
  }

export const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env: ${key}`);
    return value;
  };

export const apiFetch = async <T = Record<string, unknown>>(
    url: string,
    options: Omit<ApiFetchOptions, "bunnyType"> & {
      bunnyType: "stream" | "storage";
    }
  ): Promise<T> => {
    const {
      method = "GET",
      headers = {},
      body,
      expectJson = true,
      bunnyType,
    } = options;
  
    const key = getEnv(
      bunnyType === "stream"
        ? "BUNNY_STREAM_ACCESS_KEY"
        : "BUNNY_STORAGE_ACCESS_KEY"
    );
  
    const requestHeaders = {
      ...headers,
      AccessKey: key,
      ...(bunnyType === "stream" && {
        accept: "application/json",
        ...(body && { "content-type": "application/json" }),
      }),
    };
  
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };
  
    const response = await fetch(url, requestOptions);
  
    if (!response.ok) {
      throw new Error(`API error ${response.text()}`);
    }
  
    if (method === "DELETE" || !expectJson) {
      return true as T;
    }
  
    return await response.json();
  };
  

export const withErrorHandling = <T, A extends unknown[]>(
    fn: (...args: A) => Promise<T>
  ) => {
    return async (...args: A): Promise<T> => {
      try {
        const result = await fn(...args);
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        return errorMessage as unknown as T;
      }
    };
  };
  