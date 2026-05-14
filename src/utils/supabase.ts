/**
 * Lightweight Supabase REST client — no SDK needed.
 * Uses the standard PostgREST API that Supabase exposes out of the box.
 */

const SUPABASE_URL = "https://hnauoimsujjaowrmfsno.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYXVvaW1zdWpqYW93cm1mc25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjMxODIsImV4cCI6MjA5NDA5OTE4Mn0.uBvu08rYrD9wALwq1fnhV4QN0K4PsPu7gSq1mDc_aTE";

const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

// Maps Supabase snake_case columns → CourseCardProps camelCase fields
function mapCourse(row: Record<string, string>) {
  return {
    id:          row.id,
    variant:     row.variant,
    classTag:    row.class_tag,
    langBadge:   row.lang_badge,
    title:       row.title,
    batchName:   row.batch_name,
    startDate:   row.start_date,
    price:       row.price,
    oldPrice:    row.old_price,
    discount:    row.discount,
    cta:         row.cta,
    flagLine:    row.flag_line,
    bannerColor: row.banner_color ?? "Pastel Blue",
    imageUrl:    row.image_url ?? null,
  };
}

export async function fetchCourses(section: "trending" | "all") {
  const url = `${SUPABASE_URL}/rest/v1/courses?section=eq.${section}&order=sort_order.asc`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(mapCourse);
}

/** Save a generated banner URL back to the courses table */
export async function saveBannerUrl(id: string, imageUrl: string) {
  const url = `${SUPABASE_URL}/rest/v1/courses?id=eq.${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { ...HEADERS, Prefer: "return=minimal" },
    body: JSON.stringify({ image_url: imageUrl }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`[saveBannerUrl] Failed for id=${id}:`, res.status, err);
  } else {
    console.log(`[saveBannerUrl] Saved for id=${id}`);
  }
}
