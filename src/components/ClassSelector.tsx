/**
 * ClassSelector — white pill showing the user's selected class/goal with
 * a "Change" action on the right. Sits over the orange gradient backdrop.
 */
export default function ClassSelector() {
  return (
    <div className="px-16 pt-2 pb-12">
      <div
        data-component="ClassSelector"
        className="flex items-center justify-between rounded-md bg-white/30 px-16 py-8"
      >
        <div className="flex items-center gap-8">
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-white text-sub">
            🎯
          </span>
          <span className="text-sub font-semibold text-heading">
            Class 11 NEET
          </span>
        </div>
        <button className="text-regular font-semibold text-brand-primary">
          Change
        </button>
      </div>
    </div>
  );
}
