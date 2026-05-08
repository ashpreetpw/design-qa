/**
 * Local API server for the cohort picker.
 *
 *   GET  /api/cohorts                  → full catalogue
 *   GET  /api/active-cohort            → current selection (in-memory, server-side)
 *   POST /api/active-cohort            → { cohortId } sets the selection
 *   GET  /api/recommendations?id=...   → top 6 cohorts ranked by relevance
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
 */

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------
   Catalogue
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
   Routes
   ------------------------------------------------------------------ */
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
  console.log(`Cohort API listening on http://localhost:${PORT}`);
});
