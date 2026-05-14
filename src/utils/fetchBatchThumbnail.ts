/**
 * fetchBatchThumbnail — returns a banner image URL for a given batch.
 *
 * Priority order:
 * 1. Supabase courses.image_url (if already generated, use it directly)
 * 2. Banner API (generates fresh image, then saves to Supabase)
 *
 * No localStorage dependency — Supabase is the single source of truth.
 */

import { saveBannerUrl } from "./supabase";

const API_URL =
  "https://pbmcfnmnenemrhwvziem.supabase.co/functions/v1/bulk-teacher-banners";

export type ThumbnailParams = {
  id?: string;           // course id — used to save URL back to Supabase
  title: string;         // becomes course_name  (e.g. "Arjuna")
  batchName: string;     // becomes small_text   (e.g. "NEET 2026")
  bannerColor?: string;  // background_color for the API (e.g. "Pastel Blue")
  imageUrl?: string;     // pre-stored URL from Supabase (skip API if set)
  variant?: string;      // kept for future use
};

export async function fetchBatchThumbnail(
  params: ThumbnailParams
): Promise<string | null> {
  // 1. Use Supabase-stored URL if already generated
  if (params.imageUrl) return params.imageUrl;

  // 2. Call banner API, then save result to Supabase
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        banner_type: "textOnly",
        course_name: params.title,
        small_text: params.batchName,
        primary_font_size: "medium",
        secondary_font_size: "medium",
        background_color: params.bannerColor ?? "Pastel Blue",
        bottom_tag: "live",
        teacher_names: [],
        response_type: "link",
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Handle all response shapes the API might return
    let url: string | null = null;
    if (typeof data === "string") url = data;
    else if (typeof data?.url === "string") url = data.url;
    else if (typeof data?.link === "string") url = data.link;
    else if (typeof data?.image_url === "string") url = data.image_url;
    else if (Array.isArray(data) && typeof data[0] === "string") url = data[0];
    else if (Array.isArray(data) && data[0]?.url) url = data[0].url;

    // Save to Supabase so future loads skip the API call
    if (url && params.id) saveBannerUrl(params.id, url);

    return url;
  } catch {
    return null;
  }
}
