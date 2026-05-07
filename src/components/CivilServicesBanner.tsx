export default function CivilServicesBanner() {
  return (
    <div
      data-component="CivilServicesBanner"
      className="h-[180px] relative w-full shrink-0"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[180px] left-1/2 top-1/2 w-[300px]">
        <img
          alt="Hero Banner"
          className="absolute inset-0 max-w-none object-contain pointer-events-none w-full h-full"
          src="/assets/april_end_sale.png"
        />
      </div>
    </div>
  );
}
