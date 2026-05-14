/**
 * Local API server for the cohort picker and course catalogue.
 *
 *   GET  /api/cohorts                  → full catalogue
 *   GET  /api/active-cohort            → current selection (in-memory, server-side)
 *   POST /api/active-cohort            → { cohortId } sets the selection
 *   GET  /api/recommendations?id=...   → top 6 cohorts ranked by relevance
 *   GET  /api/courses                  → { trending: [...], all: [...] }
 *
 * Runs on port 4000 (deliberately != Vite's 3000).
 *
 * Recommendation scoring ─────────────────────────────────────────────
 * Each candidate cohort is scored against the active one:
 *   + same class number               → +4.0     (lateral siblings rank highest)
 *   + |classDiff| === 1               → +1.5     (adjacent grade)
 *   + same exam track                 → +2.0
 *   + same broad category             → +1.5     (engineering, medical, board, …)
 *   + foundation → main exam pairing  → +1.0     (e.g. JEE-Foundation → JEE)
 * The candidate's own id is excluded; results are sorted by score desc.
 *
 * Course banners ─────────────────────────────────────────────────────
 * Each course has an `id` (cache key) and a `bannerColor` (one of the
 * five pastel options the banner API accepts).
 *
 * On boot, initCourseBanners() fires once and calls the banner API for
 * every course that isn't already in COURSE_BANNER_CACHE. Results are
 * stored as public URLs so the API is never called again for existing
 * courses. Adding a new course to either array and restarting the server
 * is all that's needed to generate its banner.
 *
 * GET /api/courses merges the cache into the `image` field before
 * responding, so the frontend always receives the best available image.
 */

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BANNER_CACHE_FILE = path.join(__dirname, "banner-cache.json");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------
   Course catalogue
   ------------------------------------------------------------------ */

// Placeholder used until the banner-generation API populates per-course images.
const PLACEHOLDER_THUMB = "/assets/biology-crash-course.png";

/**
 * Banner cache — keyed by course `id`, persisted to banner-cache.json.
 * Loaded from disk on startup so restarts never re-call the banner API
 * for courses that already have a generated URL.
 * Written to disk every time a new entry is added.
 *
 * To force regeneration of a specific course: remove its key from
 * banner-cache.json and restart (or POST /api/banner-cache/refresh).
 *
 * Shape: { [courseId: string]: string }  (courseId → public image URL)
 */
let COURSE_BANNER_CACHE = {};
try {
  const raw = fs.readFileSync(BANNER_CACHE_FILE, "utf8");
  COURSE_BANNER_CACHE = JSON.parse(raw);
  console.log(`  Banners: loaded ${Object.keys(COURSE_BANNER_CACHE).length} cached entries from disk.`);
} catch {
  // File doesn't exist yet — starts empty, will be created on first generation.
}

const TRENDING_COURSES = [
  {
    id: "arjuna-neet-hinglish",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Green",      // NEET / medical track
    classTag: "Class 11 NEET",
    langBadge: "HINGLISH",
    title: "Arjuna",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹4,999",
    oldPrice: "₹5600",
    discount: "11% OFF",
    cta: "Buy Now",
    flagLine: "Multiple plans inside: Infinity & Infinity Pro",
  },
  {
    id: "arjuna-neet-hindi",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Blue",       // NEET / Hindi variant
    classTag: "Class 11 NEET",
    langBadge: "हिंदी",
    title: "अर्जुना",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹3,199",
    oldPrice: "₹5000",
    discount: "36% OFF",
    cta: "Buy Now",
    flagLine: "Limited Time Offer: Get it for ₹6,999 till 8th Feb",
  },
  {
    id: "power-batch-neet-2027",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Purple",     // premium / small-group batch
    classTag: "NEET 2027",
    langBadge: "हिंglish",
    title: "Power Batch",
    batchName: "Small Group Online Classes",
    startDate: "Starts on 8th Jan'25",
    price: "₹499",
    discount: "For Seat Booking",
    cta: "Book A Seat",
    flagLine: "Power Batch: Small Group Online Classes",
  },
];

const ALL_COURSES = [
  {
    id: "lakshya-jee",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Yellow",     // JEE / engineering track
    classTag: "Class 12",
    langBadge: "HINGLISH",
    title: "Lakshya JEE",
    batchName: "JEE 2026",
    startDate: "Starts on 20th May'25",
    price: "₹4,500",
    oldPrice: "₹6000",
    discount: "25% OFF",
    cta: "Buy Now",
    flagLine: "Includes infinite test series",
  },
  {
    id: "sankalp-upsc",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Blue",       // UPSC / civil services
    classTag: "UPSC CSE",
    langBadge: "HINDI",
    title: "Sankalp UPSC",
    batchName: "UPSC 2026",
    startDate: "Starts on 1st Jun'25",
    price: "₹10,999",
    oldPrice: "₹15000",
    discount: "26% OFF",
    cta: "Buy Now",
    flagLine: "Live Interactive Classes",
  },
  {
    id: "udaan-fastrack",
    image: PLACEHOLDER_THUMB,
    bannerColor: "Pastel Pink",       // school / board track
    classTag: "Class 10",
    langBadge: "ENGLISH",
    title: "Udaan Fastrack",
    batchName: "Board Exams 2026",
    startDate: "Starts on 15th Mar'25",
    price: "₹2,499",
    discount: "Early Bird",
    cta: "Enroll Now",
    flagLine: "Complete Science & Math",
  },
];

/* ------------------------------------------------------------------
   Cohort catalogue
   ------------------------------------------------------------------ */

// `class` is a numeric grade (6–12), 13 = dropper / post-12, null = non-grade track.
// `category` groups exams that share a "track" — used by the scorer.
const COHORTS = [
  // Pure school grades (6–10)
  { id: "class-6",        title: "Class 6",                 subtitle: "School Foundation",        class: 6,  exam: "School",      category: "school",      icon: "📘", iconBg: "#d1e9ff" },
  { id: "class-7",        title: "Class 7",                 subtitle: "School Foundation",        class: 7,  exam: "School",      category: "school",      icon: "📗", iconBg: "#d1e9ff" },
  { id: "class-8",        title: "Class 8",                 subtitle: "School Foundation",        class: 8,  exam: "School",      category: "school",      icon: "📕", iconBg: "#d1e9ff" },
  { id: "class-9",        title: "Class 9",                 subtitle: "School + early prep",      class: 9,  exam: "School",      category: "school",      icon: "📒", iconBg: "#d1e9ff" },
  { id: "class-10",       title: "Class 10",                subtitle: "Boards + Foundation",      class: 10, exam: "School",      category: "school",      icon: "📙", iconBg: "#d1e9ff" },

  // Foundation tracks (9–10)
  { id: "found-9-jee",    title: "Class 9 JEE Foundation",  subtitle: "Early IIT-JEE prep",       class: 9,  exam: "JEE-Foundation",  category: "engineering", icon: "⚙️", iconBg: "#fddcab" },
  { id: "found-9-neet",   title: "Class 9 NEET Foundation", subtitle: "Early medical prep",       class: 9,  exam: "NEET-Foundation", category: "medical",     icon: "🩺", iconBg: "#d3f8df" },
  { id: "found-10-jee",   title: "Class 10 JEE Foundation", subtitle: "Early IIT-JEE prep",       class: 10, exam: "JEE-Foundation",  category: "engineering", icon: "⚙️", iconBg: "#fddcab" },
  { id: "found-10-neet",  title: "Class 10 NEET Foundation",subtitle: "Early medical prep",       class: 10, exam: "NEET-Foundation", category: "medical",     icon: "🩺", iconBg: "#d3f8df" },

  // Class 11
  { id: "class-11-jee",   title: "Class 11 IIT-JEE",        subtitle: "JEE Main + Advanced",      class: 11, exam: "JEE",         category: "engineering", icon: "⚙️", iconBg: "#fddcab" },
  { id: "class-11-neet",  title: "Class 11 NEET",           subtitle: "NEET-UG prep",             class: 11, exam: "NEET",        category: "medical",     icon: "🩺", iconBg: "#d3f8df" },
  { id: "class-11-cbse",  title: "Class 11 CBSE",           subtitle: "PCM / PCB / Commerce",     class: 11, exam: "CBSE",        category: "board",       icon: "📖", iconBg: "#c7d7fe" },
  { id: "class-11-state", title: "Class 11 State Board",    subtitle: "All major state boards",   class: 11, exam: "State Board", category: "board",       icon: "🏫", iconBg: "#c7d7fe" },

  // Class 12
  { id: "class-12-jee",   title: "Class 12 IIT-JEE",        subtitle: "JEE Main + Advanced",      class: 12, exam: "JEE",         category: "engineering", icon: "⚙️", iconBg: "#fddcab" },
  { id: "class-12-neet",  title: "Class 12 NEET",           subtitle: "NEET-UG prep",             class: 12, exam: "NEET",        category: "medical",     icon: "🩺", iconBg: "#d3f8df" },
  { id: "class-12-cbse",  title: "Class 12 CBSE",           subtitle: "PCM / PCB / Commerce",     class: 12, exam: "CBSE",        category: "board",       icon: "📖", iconBg: "#c7d7fe" },
  { id: "class-12-state", title: "Class 12 State Board",    subtitle: "All major state boards",   class: 12, exam: "State Board", category: "board",       icon: "🏫", iconBg: "#c7d7fe" },
  { id: "cuet",           title: "CUET UG",                 subtitle: "Central University ent.",  class: 12, exam: "CUET",        category: "board",       icon: "🎓", iconBg: "#fddcab" },

  // Droppers
  { id: "dropper-jee",    title: "JEE Dropper",             subtitle: "Repeat year for JEE",      class: 13, exam: "JEE",         category: "engineering", icon: "⚙️", iconBg: "#fddcab" },
  { id: "dropper-neet",   title: "NEET Dropper",            subtitle: "Repeat year for NEET",     class: 13, exam: "NEET",        category: "medical",     icon: "🩺", iconBg: "#d3f8df" },

  // Non-school tracks
  { id: "upsc",           title: "UPSC CSE",                subtitle: "Civil Services prep",      class: null, exam: "UPSC",     category: "govt",        icon: "🏛️", iconBg: "#c7d7fe" },
  { id: "defence",        title: "Defence & Govt Job Exams",subtitle: "NDA, CDS, SSC, Banking",   class: null, exam: "Defence",  category: "govt",        icon: "🎖️", iconBg: "#d3f8df" },
  { id: "gate",           title: "GATE, ESE, AE/JE, MBA & NEET PG", subtitle: "Post-grad entrance", class: null, exam: "GATE",   category: "engineering", icon: "🛠️", iconBg: "#fddcab" },
  { id: "ca-cs",          title: "CA, CS, Banking & Finance Courses", subtitle: "Commerce careers", class: null, exam: "Finance", category: "finance",   icon: "📊", iconBg: "#d1e9ff" },
  { id: "iit-jam",        title: "IIT JAM, NET Exams & Teacher Training", subtitle: "MSc + research", class: null, exam: "IIT-JAM", category: "research",  icon: "🔬", iconBg: "#c7d7fe" },
];

/* ------------------------------------------------------------------
   In-memory active cohort (resets on server restart)
   ------------------------------------------------------------------ */
let activeCohortId = "class-11-neet"; // matches the homepage default

/* ------------------------------------------------------------------
   Recommendation scorer
   ------------------------------------------------------------------ */
function scoreCohort(active, candidate) {
  if (active.id === candidate.id) return -Infinity;

  let score = 0;

  // Class proximity (lateral siblings score highest — same-class, different-exam
  // is exactly what a Class 11 JEE student sees as "nearby" options).
  if (active.class != null && candidate.class != null) {
    const diff = Math.abs(active.class - candidate.class);
    if (diff === 0) score += 4.0;
    else if (diff === 1) score += 1.5;
  }

  // Same exam track (e.g. both JEE)
  if (active.exam === candidate.exam) score += 2.0;

  // Same broad category (engineering / medical / board / …)
  if (active.category === candidate.category) score += 1.5;

  // Foundation → main exam pairing (e.g. NEET-Foundation → NEET)
  const stripFoundation = (e) => (e || "").replace("-Foundation", "");
  const aRoot = stripFoundation(active.exam);
  const cRoot = stripFoundation(candidate.exam);
  const oneIsFoundation =
    active.exam.endsWith("-Foundation") !== candidate.exam.endsWith("-Foundation");
  if (oneIsFoundation && aRoot === cRoot) score += 1.0;

  return score;
}

function recommend(activeId, limit = 6) {
  const active = COHORTS.find((c) => c.id === activeId);
  if (!active) return [];
  return COHORTS
    .map((c) => ({ cohort: c, score: scoreCohort(active, c) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.cohort);
}

/* ------------------------------------------------------------------
   Banner generation
   ------------------------------------------------------------------ */

const BANNER_API_URL =
  "https://pbmcfnmnenemrhwvziem.supabase.co/functions/v1/bulk-teacher-banners";

/**
 * Call the banner API for a single course and return the public image URL.
 * `large_text`  → course title   (e.g. "Arjuna", "Lakshya JEE")
 * `small_text`  → "For <classTag>" (e.g. "For Class 11 NEET")
 * `background_color` → course.bannerColor (one of the five Pastel* values)
 */
async function generateCourseBanner(course) {
  const res = await fetch(BANNER_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      banner_type: "textOnly",
      large_text: course.title,
      small_text: `For ${course.classTag}`,
      primary_font_size: "medium",
      secondary_font_size: "medium",
      background_color: course.bannerColor,
      bottom_tag: "live",
      response_type: "link",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    throw new Error(
      `Banner API ${res.status} for "${course.id}" — body: ${body}`
    );
  }

  const data = await res.json();
  const url = data?.url;

  if (typeof url !== "string" || !url.startsWith("http")) {
    throw new Error(
      `Unexpected banner API response for "${course.id}": ${JSON.stringify(data)}`
    );
  }
  return url;
}

/**
 * On boot: iterate every course in both lists and generate a banner for
 * any course that isn't already in the cache. Courses are processed in
 * parallel; individual failures are logged but don't abort the others.
 *
 * To add a new course: append it to TRENDING_COURSES or ALL_COURSES and
 * restart the server — this function will pick it up automatically.
 */
async function initCourseBanners() {
  const allCourses = [...TRENDING_COURSES, ...ALL_COURSES];
  const uncached = allCourses.filter((c) => !COURSE_BANNER_CACHE[c.id]);

  if (uncached.length === 0) {
    console.log("  Banners: all courses already cached, skipping generation.");
    return;
  }

  console.log(`  Banners: generating for ${uncached.length} course(s)…`);

  await Promise.all(
    uncached.map(async (course) => {
      try {
        const url = await generateCourseBanner(course);
        COURSE_BANNER_CACHE[course.id] = url;
        fs.writeFileSync(BANNER_CACHE_FILE, JSON.stringify(COURSE_BANNER_CACHE, null, 2));
        console.log(`  ✓ ${course.id}`);
      } catch (err) {
        console.error(`  ✗ ${course.id}: ${err.message}`);
        // Cache entry stays empty; /api/courses will fall back to placeholder.
      }
    })
  );
}

/* ------------------------------------------------------------------
   Routes
   ------------------------------------------------------------------ */
app.get("/api/courses", (_req, res) => {
  // Merge cached banner URLs into the image field before sending.
  // Once the banner API is wired up, COURSE_BANNER_CACHE[course.id] will
  // hold the generated URL; until then the placeholder falls through.
  const withBanners = (list) =>
    list.map((course) => ({
      ...course,
      image: COURSE_BANNER_CACHE[course.id] ?? course.image,
    }));

  res.json({
    trending: withBanners(TRENDING_COURSES),
    all: withBanners(ALL_COURSES),
  });
});

// Debug — expose banner cache state and trigger manual regeneration.
// GET  /api/banner-cache          → current cache entries + which courses are missing
// POST /api/banner-cache/refresh  → regenerate banners for all uncached courses
app.get("/api/banner-cache", (_req, res) => {
  const allCourses = [...TRENDING_COURSES, ...ALL_COURSES];
  res.json({
    cached: Object.entries(COURSE_BANNER_CACHE).map(([id, url]) => ({ id, url })),
    missing: allCourses.filter((c) => !COURSE_BANNER_CACHE[c.id]).map((c) => c.id),
  });
});

app.post("/api/banner-cache/refresh", async (_req, res) => {
  await initCourseBanners();
  const allCourses = [...TRENDING_COURSES, ...ALL_COURSES];
  res.json({
    cached: Object.entries(COURSE_BANNER_CACHE).map(([id, url]) => ({ id, url })),
    missing: allCourses.filter((c) => !COURSE_BANNER_CACHE[c.id]).map((c) => c.id),
  });
});

app.get("/api/cohorts", (_req, res) => {
  res.json({ cohorts: COHORTS });
});

app.get("/api/active-cohort", (_req, res) => {
  const cohort = COHORTS.find((c) => c.id === activeCohortId) || null;
  res.json({ cohort });
});

app.post("/api/active-cohort", (req, res) => {
  const { cohortId } = req.body || {};
  const cohort = COHORTS.find((c) => c.id === cohortId);
  if (!cohort) {
    return res.status(400).json({ error: `Unknown cohortId: ${cohortId}` });
  }
  activeCohortId = cohortId;
  res.json({ cohort });
});

app.get("/api/recommendations", (req, res) => {
  const id = req.query.id || activeCohortId;
  res.json({ recommendations: recommend(id) });
});

/* ------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------ */
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
  // Kick off banner generation after the server is up so startup isn't
  // blocked. The /api/courses route serves placeholder images in the
  // meantime and switches to generated URLs as each one resolves.
  initCourseBanners().catch((err) =>
    console.error("Banner init failed:", err.message)
  );
});
