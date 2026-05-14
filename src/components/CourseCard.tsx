/**
 * CourseCard — a batch card used in the Trending Courses list.
 * The hero region shows a custom banner with course name + batch badge.
 * `bannerColor` controls the background tint of the banner.
 */
export type CourseCardProps = {
  variant?: "green" | "yellow" | "gray";
  classTag: string;          // "Class 11 NEET"
  langBadge?: string;        // "HINGLISH" / "हिंदी"
  title: string;             // "Arjuna" / "अर्जुना"
  batchName: string;         // "NEET 2026"
  startDate: string;         // "Starts on 14th Apr'25"
  price: string;             // "₹4,999"
  oldPrice?: string;         // "₹5600"
  discount?: string;         // "11% OFF"
  cta: string;               // "Buy Now"
  flagLine?: string;         // "Multiple plans inside: Infinity & Infinity Pro"
  imageUrl?: string;         // Optional override: use this image instead of custom banner
  bannerColor?: string;      // Background color key (e.g. "Pastel Blue")
  onAddToCart?: () => void;
  onClick?: () => void;
};

// Maps banner color names → CSS background colors
const bannerBgColors: Record<string, string> = {
  "Pastel Blue":   "#c8e8f8",
  "Pastel Green":  "#c2f0d8",
  "Pastel Yellow": "#fdf3c0",
  "Pastel Pink":   "#fcd5e0",
  "Pastel Purple": "#e2d5f8",
  "Pastel Orange": "#fde4c2",
};

// Maps banner color names → badge background colors
const badgeBgColors: Record<string, string> = {
  "Pastel Blue":   "#2563eb",
  "Pastel Green":  "#16a34a",
  "Pastel Yellow": "#d97706",
  "Pastel Pink":   "#db2777",
  "Pastel Purple": "#7c3aed",
  "Pastel Orange": "#ea580c",
};

function CourseBanner({ title, batchName, bannerColor }: {
  title: string;
  batchName: string;
  bannerColor?: string;
}) {
  const colorKey = bannerColor ?? "Pastel Blue";
  const bg = bannerBgColors[colorKey] ?? "#c8e8f8";
  const badgeBg = badgeBgColors[colorKey] ?? "#2563eb";

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-10 overflow-hidden"
      style={{ background: bg, height: "160px" }}
    >
      {/* Course title */}
      <span
        style={{
          fontFamily: '"Teko", sans-serif',
          fontWeight: 700,
          fontSize: "36px",
          color: "#0f2463",
          letterSpacing: "0.5px",
          lineHeight: 1,
        }}
      >
        {title}
      </span>

      {/* Batch name badge */}
      <span
        style={{
          background: badgeBg,
          color: "#ffffff",
          fontFamily: '"Teko", sans-serif',
          fontWeight: 600,
          fontSize: "16px",
          letterSpacing: "0.5px",
          padding: "4px 8px",
          borderRadius: "6px",
          lineHeight: 1.4,
        }}
      >
        {batchName}
      </span>

      {/* Bottom strip — rounded top corners only, white border, clipped at banner bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          background: "#3a3b45",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 500,
          padding: "4px 20px 12px 20px",
          borderRadius: "16px 16px 0 0",
          textAlign: "center",
          border: "2px solid rgba(255,255,255,0.9)",
          borderBottom: "none",
        }}
      >
        Live Classes, DPPs &amp; more
      </div>
    </div>
  );
}

export default function CourseCard({
  variant = "green",
  classTag,
  langBadge,
  title,
  batchName,
  startDate,
  price,
  oldPrice,
  discount,
  cta,
  flagLine,
  imageUrl,
  bannerColor,
  onAddToCart,
  onClick,
}: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      data-component="CourseCard"
      className={`overflow-hidden rounded-xl border border-strokeLight bg-white ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Hero area — use imageUrl if provided, otherwise custom banner */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${title} thumbnail`}
          className="w-full h-auto block"
        />
      ) : (
        <CourseBanner title={title} batchName={batchName} bannerColor={bannerColor} />
      )}

      {/* Body */}
      <div className="flex flex-col gap-8 pt-12 px-16 pb-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-regular font-semibold text-orange-500">
              {classTag}
            </span>
            <div className="flex flex-col gap-8">
              <span className="text-h4 font-semibold text-heading">{title}</span>
              <div className="text-regular text-body1">📘 {batchName}</div>
            </div>
          </div>
          {langBadge && (
            <span className="rounded-sm border border-strokeMed bg-grey6 px-6 py-2 text-tiny font-semibold text-heading">
              {langBadge}
            </span>
          )}
        </div>

        <div className="text-regular text-body1">
          <div>📅 {startDate}</div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="flex items-end gap-6">
            <span className="text-sub font-bold text-heading">{price}</span>
            {oldPrice && (
              <span className="text-small text-body2 line-through">
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="text-regular font-semibold text-green-500">
                {discount}
              </span>
            )}
          </div>
          <button
            className="rounded bg-heading px-20 py-10 text-regular font-semibold text-white"
            onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(); }}
          >
            {cta}
          </button>
        </div>
      </div>

      {flagLine && (
        <div
          className="border-t border-orange-400 px-16 py-8 text-small font-semibold text-orange-500"
          style={{
            background:
              "linear-gradient(90deg, #fffaf5 0%, #ffffff 50%, #f6fef9 100%)",
          }}
        >
          ✨ {flagLine}
        </div>
      )}
    </div>
  );
}
