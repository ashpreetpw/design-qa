/**
 * WhatsNew — section with two horizontally-scrollable promotional banners.
 * First banner: NEET pitch starting at ₹499. Second banner: Power Batch
 * promotion tinted green → blue. Real product uses a carousel; we render
 * them in a horizontal flex row for simplicity.
 */
export default function WhatsNew() {
  return (
    <section
      data-component="WhatsNew"
      className="flex flex-col gap-12 px-16 pt-16 pb-40"
    >
      <h2 className="text-h3 font-semibold text-heading">What's New</h2>

      <div className="flex gap-12 overflow-x-auto pb-2">
        <div
          data-component="WhatsNewBanner"
          className="flex min-w-[304px] items-center gap-12 rounded-xl bg-blue-50 border border-blue-300 px-16 py-12"
        >
          <div className="flex flex-col gap-4">
            <div className="text-sub font-bold text-heading">
              Preparing for NEET?
            </div>
            <div className="text-small text-body1">
              Get Arjuna NEET starting at just <strong>₹499</strong>
            </div>
          </div>
          <div className="text-4xl" aria-hidden>
            📚
          </div>
        </div>

        <div
          data-component="WhatsNewBanner"
          className="flex min-w-[304px] items-center gap-12 rounded-xl border border-blue-300 px-16 py-12"
          style={{
            background: "linear-gradient(90deg, #edfcf2 0%, #b2ddff 100%)",
          }}
        >
          <div className="flex flex-col gap-4">
            <div
              className="text-h4 font-bold"
              style={{ color: "#143cb6" }}
            >
              POWER BATCH
            </div>
            <div className="text-small text-body1">
              NEET 2027 For Class 11
            </div>
            <button className="mt-4 w-fit rounded bg-heading px-16 py-6 text-tiny font-semibold text-white">
              Book A Seat
            </button>
          </div>
          <div className="text-4xl" aria-hidden>
            ⚡
          </div>
        </div>
      </div>
    </section>
  );
}
