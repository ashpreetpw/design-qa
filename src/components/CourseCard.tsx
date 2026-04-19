/**
 * CourseCard — a batch card used in the Trending Courses list.
 * The hero region shows teachers + the course name watermark; below
 * that is a body with class info, start date, price, and a primary CTA.
 *
 * `variant` toggles the green/teal Arjuna hero vs. a yellow-tinted hero
 * used by the Hindi Arjuna variant in the Figma design.
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
};

const heroGradients: Record<NonNullable<CourseCardProps["variant"]>, string> = {
  green: "linear-gradient(180deg, #0f4c3a 0%, #1d6b54 100%)",
  yellow: "linear-gradient(180deg, #f5c14b 0%, #fde397 100%)",
  gray: "linear-gradient(180deg, #e5e7eb 0%, #f3f4f6 100%)",
};

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
}: CourseCardProps) {
  return (
    <div
      data-component="CourseCard"
      className="overflow-hidden rounded-xl border border-strokeLight bg-white"
    >
      {/* Hero area — teachers + big watermark title */}
      <div
        className="relative flex h-[120px] items-end justify-center"
        style={{ background: heroGradients[variant] }}
      >
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-5xl opacity-25"
          style={{
            fontFamily: '"Teko", sans-serif',
            fontWeight: 700,
            color: variant === "green" ? "#ffffff" : "#7a271a",
            letterSpacing: "0.04em",
          }}
        >
          {title.toUpperCase()}
        </div>
        <div className="relative z-10 pb-2 text-2xl tracking-wider text-white/90">
          👨‍🏫 👩‍🏫 👨‍🏫 👩‍🏫 👨‍🏫
        </div>
        <div className="absolute left-12 top-12 rounded-md bg-white/90 px-6 py-2 text-tiny font-semibold text-heading">
          🎥 Live Classes, DPPs & more
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-8 pt-12 px-16 pb-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-regular font-semibold text-orange-500">
              {classTag}
            </span>
            <span className="text-h4 font-semibold text-heading">{title}</span>
          </div>
          {langBadge && (
            <span className="rounded-sm border border-strokeMed bg-grey6 px-6 py-2 text-tiny font-semibold text-heading">
              {langBadge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 text-regular text-body1">
          <div>📘 {batchName}</div>
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
          <button className="rounded bg-heading px-20 py-10 text-regular font-semibold text-white">
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
