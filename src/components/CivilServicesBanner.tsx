/**
 * CivilServicesBanner — the hero "CIVIL SERVICES DAY" headline with an
 * "OFFERS ARE LIVE!" pill and a decorative illustration of the Parliament
 * building. The real asset is a painted illustration; we stand in with
 * a gradient and an emoji block since the actual image isn't shipped.
 */
export default function CivilServicesBanner() {
  return (
    <div className="px-16 pt-2 pb-12">
      <div
        data-component="CivilServicesBanner"
        className="relative overflow-hidden rounded-xl"
        style={{
          background:
            "linear-gradient(180deg, #ffe5cc 0%, #ffd0a3 60%, #ffbe85 100%)",
        }}
      >
        <div className="flex flex-col items-center pt-16 pb-12">
          <h1
            className="font-serif text-heading whitespace-nowrap"
            style={{
              fontSize: "38px",
              lineHeight: "normal",
              color: "blue",
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            CIVIL SERVICES OFFERS
          </h1>
          <div className="mt-8 inline-flex items-center gap-6 rounded-full bg-green-500 px-12 py-2">
            <span className="text-small font-bold text-white uppercase">
              MEGA SALE!
            </span>
          </div>
          <div
            aria-hidden
            className="mt-6 flex h-[72px] w-[220px] items-end justify-center text-2xl"
            style={{
              background:
                "radial-gradient(ellipse at bottom, #e88a3a 0%, transparent 70%)",
            }}
          >
            🏛️
          </div>
        </div>
      </div>
    </div>
  );
}
