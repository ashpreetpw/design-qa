/**
 * WhatsNew — horizontally-scrollable carousel of three 3:1 banner images.
 * Each slide is sized so ~10% of the next slide peeks into the viewport,
 * hinting at the carousel's horizontal scroll affordance.
 */
export default function WhatsNew() {
  const slides = [0, 1, 2, 3];

  return (
    <section
      data-component="WhatsNew"
      className="flex flex-col gap-12 pt-16 pb-40"
    >
      <h2 className="px-16 text-h3 font-semibold text-heading">What's New</h2>

      <div className="flex gap-12 overflow-x-auto pl-16 pr-16 snap-x snap-mandatory">
        {slides.map((i) => (
          <img
            key={i}
            src="/assets/whatsnew banner.png"
            alt="What's New banner"
            className="aspect-[2/1] w-[88%] flex-none snap-start rounded-xl object-cover"
          />
        ))}
      </div>
    </section>
  );
}
