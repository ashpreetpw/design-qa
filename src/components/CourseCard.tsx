/**
 * CourseCard — a batch card used in the Trending Courses list.
 *
 * The hero is a single thumbnail image. Each card carries its own
 * `image` URL so a future thumbnail-generation API can populate it
 * per-course; for now the call sites point at a static asset.
 *
 * `ratio` controls the thumbnail's aspect ratio (CSS `aspect-ratio`
 * syntax). Defaults to "2 / 1" so the card height scales with width.
 */
export type CourseCardProps = {
  image: string;             // hero thumbnail (relative to /public, or absolute URL)
  ratio?: string;            // thumbnail aspect ratio, e.g. "2 / 1" (default), "16 / 9"
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
  onAddToCart?: () => void;
  onClick?: () => void;
};

export default function CourseCard({
  image,
  ratio = "2 / 1",
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
  onAddToCart,
  onClick,
}: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      data-component="CourseCard"
      className={`overflow-hidden rounded-xl border border-strokeLight bg-white ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Hero — full-bleed thumbnail. Height is derived from the
          configured aspect ratio so the image never gets squashed. */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="block w-full object-cover"
        style={{ aspectRatio: ratio }}
      />

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
