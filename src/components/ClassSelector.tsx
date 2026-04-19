/**
 * ClassSelector — white pill showing the user's selected class/goal with
 * a "Change" action on the right. Sits over the orange gradient backdrop.
 */
export default function ClassSelector() {
  return (
    <div className="px-16 pt-2 pb-12">
      <div
        data-component="ClassSelector"
        className="flex items-center justify-between rounded-md bg-white/80 backdrop-blur px-16 py-8 border border-white"
      >
        <div className="flex items-center gap-8">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-tiny text-white font-bold">
            🎯
          </span>
          <span className="text-regular font-semibold text-heading">
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
