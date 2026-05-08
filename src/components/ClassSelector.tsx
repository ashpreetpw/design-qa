import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ActiveCohort = {
  id: string;
  title: string;
  icon: string;
};

/**
 * ClassSelector — white pill showing the user's selected class/goal with
 * a "Change" action on the right. Sits over the orange gradient backdrop.
 *
 * Fetches the active cohort from /api/active-cohort on mount; clicking
 * either the pill or the "Change" link navigates to /cohorts.
 */
export default function ClassSelector() {
  const navigate = useNavigate();
  const [active, setActive] = useState<ActiveCohort | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/active-cohort")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.cohort) {
          setActive({
            id: data.cohort.id,
            title: data.cohort.title,
            icon: data.cohort.icon || "🎯",
          });
        }
      })
      .catch(() => {
        // Server down? Fall back silently — the homepage stays usable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenPicker = () => navigate("/cohorts");

  return (
    <div className="px-16 pt-0 pb-8">
      <button
        type="button"
        data-component="ClassSelector"
        onClick={handleOpenPicker}
        className="flex w-full items-center justify-between rounded-md bg-white/30 px-16 py-8 text-left"
      >
        <div className="flex items-center gap-8">
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-white text-sub">
            {active?.icon ?? "🎯"}
          </span>
          <span className="text-sub font-semibold text-heading">
            {active?.title ?? "Class 11 NEET"}
          </span>
        </div>
        <span className="text-regular font-semibold text-brand-primary">
          Change
        </span>
      </button>
    </div>
  );
}
