type Chip = {
  title: string;
  year: string;
  subtitle: string;
  price: string;
  lang?: "hi" | "en";
};

const chips: Chip[] = [
  { title: "प्रारंभ हिन्दी", year: "2029", subtitle: "With Bridge Course", price: "₹30,999", lang: "hi" },
  { title: "PRARAMBH", year: "2029", subtitle: "With Bridge Course", price: "₹30,999" },
  { title: "SANKALP", year: "2028", subtitle: "Hinglish", price: "₹30,999" },
];

/**
 * CategoryChips — three offer cards that live on top of the orange backdrop
 * just below the civil-services banner. Each card has an icon, a title,
 * a year, a subtitle line, and a price strip at the bottom.
 */
export default function CategoryChips() {
  return (
    <div className="px-16 pt-16 pb-16">
      <div className="flex gap-8">
        {chips.map((chip, i) => (
          <CategoryChip key={i} chip={chip} />
        ))}
      </div>
    </div>
  );
}

function CategoryChip({ chip }: { chip: Chip }) {
  return (
    <div
      data-component="CategoryChip"
      className="flex-1 overflow-hidden rounded-xl border"
      style={{ borderColor: "#ab3c00" }}
    >
      <div
        className="flex flex-col items-center gap-2 pt-8 pb-6 px-6"
        style={{
          background: "linear-gradient(180deg, #fbe7e2 0%, #ffcc93 100%)",
        }}
      >
        <div className="h-[44px] w-[44px] rounded-full bg-orange-400/60 flex items-center justify-center text-xl">
          {chip.lang === "hi" ? "📘" : "📗"}
        </div>
        <div
          className="text-center font-extrabold leading-tight"
          style={{ color: "#631b00", fontSize: "14px" }}
        >
          {chip.title}
        </div>
        <div
          className="text-center font-extrabold"
          style={{ color: "#631b00", fontSize: "14px", lineHeight: "16px" }}
        >
          {chip.year}
        </div>
        <div
          className="text-center"
          style={{ color: "#974424", fontSize: "9px", lineHeight: "13px" }}
        >
          {chip.subtitle}
        </div>
      </div>
      <div
        className="py-4 text-center text-tiny font-bold text-white"
        style={{ backgroundColor: "#8a4f33" }}
      >
        NOW @ {chip.price}
      </div>
    </div>
  );
}
