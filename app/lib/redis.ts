import { Redis } from "@upstash/redis";

/**
 * Shared Upstash Redis client, or null when not configured (e.g. local dev).
 *
 * The Vercel Upstash integration names its env vars differently depending on how
 * it was added - `UPSTASH_REDIS_REST_*` for the direct Upstash integration, or
 * `KV_REST_API_*` for the Vercel Marketplace / KV-style binding. We resolve from
 * either so production picks up Redis without manual env aliasing. When neither is
 * present, callers fall back to in-memory behaviour so nothing hard-fails locally.
 */
const url =
  process.env.UPSTASH_REDIS_REST_URL ??
  process.env.KV_REST_API_URL ??
  undefined;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ??
  process.env.KV_REST_API_TOKEN ??
  undefined;

export const redis = url && token ? new Redis({ url, token }) : null;

export const redisEnabled = redis !== null;
