import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

/**
 * Shape returned by the API. Mirrors COHORTS in /server.js — the server is
 * the source of truth, so additions there flow through without code changes.
 */
type Cohort = {
  id: string;
  title: string;
  subtitle: string;
  class: number | null;
  exam: string;
  category: string;
  icon: string;
  iconBg: string;
};

/**
 * CohortPickerPage — implements Figma node 15930-19011 ("Change your exam goal").
 *
 * Layout (top → bottom):
 *   • status bar + nav bar with back arrow + title
 *   • the active cohort, highlighted in a purple-bordered card
 *   • "Recommended for you" — server-ranked list of nearby cohorts
 *
 * Tapping any cohort row commits the choice immediately: POSTs to
 * /api/active-cohort and routes back home, where the homepage's
 * ClassSelector will pick up the new value on its next mount.
 */
export default function CohortPickerPage() {
  const navigate = useNavigate();

  const [active, setActive] = useState<Cohort | null>(null);
  const [recommendations, setRecommendations] = useState<Cohort[]>([]);
  const [committingId, setCommittingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // On mount, pull the active cohort + its recommendations in parallel.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [activeRes, recsRes] = await Promise.all([
          fetch("/api/active-cohort").then((r) => r.json()),
          fetch("/api/recommendations").then((r) => r.json()),
        ]);
        if (cancelled) return;
        setActive(activeRes.cohort);
        setRecommendations(recsRes.recommendations ?? []);
      } catch (err) {
        if (!cancelled) setLoadError(String(err));
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Click → commit → home. If the user taps the already-active card we
  // just bounce home (still useful to confirm the choice).
  const handlePick = async (id: string) => {
    if (id === active?.id) {
      navigate("/");
      return;
    }
    setCommittingId(id);
    try {
      await fetch("/api/active-cohort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cohortId: id }),
      });
      navigate("/");
    } catch (err) {
      setCommittingId(null);
      setLoadError(String(err));
    }
  };

  // Both the active card and the recommendation rows render the same
  // icon + label structure. Highlight state changes border/background only.
  const renderRow = (cohort: Cohort, isActive: boolean) => {
    const isCommitting = committingId === cohort.id;
    return (
      <button
        key={cohort.id}
        onClick={() => handlePick(cohort.id)}
        disabled={committingId !== null}
        className={`flex w-full items-center gap-8 rounded-lg border p-12 text-left disabled:opacity-60 ${
          isActive
            ? "border-brand-primary bg-[#f1efff]"
            : "border-strokeLight bg-white"
        }`}
      >
        <span
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-md text-xl"
          style={{ background: cohort.iconBg }}
        >
          {cohort.icon}
        </span>
        <span className="flex flex-1 flex-col">
          <span className="text-regular font-semibold text-body1">
            {cohort.title}
          </span>
          {cohort.subtitle && (
            <span className="text-small text-body2">{cohort.subtitle}</span>
          )}
        </span>
        {isActive ? (
          <span
            aria-hidden
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-brand-primary text-tiny font-bold text-white"
          >
            ✓
          </span>
        ) : (
          <span aria-hidden className="text-body2">
            {isCommitting ? "…" : "›"}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <div
        data-component="MobileFrame"
        className="relative w-[360px] min-h-screen bg-white shadow-card flex flex-col"
      >
        {/* Subtle purple gradient at the very top, per Figma 15930:19014 */}
        <div className="absolute inset-x-0 top-[24px] h-[107px] bg-gradient-to-b from-[#f7f5ff] to-transparent pointer-events-none" />

        <div className="relative z-10">
          <StatusBar />
          {/* Nav bar — back + title */}
          <div className="flex items-center gap-4 bg-white px-16 py-10 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
            <button
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="flex h-[40px] w-[40px] items-center justify-center text-h4 text-heading"
            >
              ‹
            </button>
            <h1 className="text-sub font-semibold text-heading">
              Change your exam goal
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col gap-12 px-16 pt-12 pb-16">
          {loadError && (
            <p className="rounded-md border border-red-200 bg-orange-25 p-12 text-small text-red-900">
              Couldn't reach the cohort API. Is <code>npm run dev:server</code> running?
            </p>
          )}

          {/* Active cohort card */}
          {active && <section>{renderRow(active, true)}</section>}

          {/* Recommendations */}
          <section className="flex flex-col gap-12">
            <h2 className="text-regular font-semibold text-body2">
              Recommended for you
            </h2>
            <div className="flex flex-col gap-8">
              {recommendations.length === 0 && !loadError && (
                <p className="text-small text-body2">
                  No nearby recommendations for this goal.
                </p>
              )}
              {recommendations.map((c) => renderRow(c, false))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
