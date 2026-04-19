/**
 * StatusBar — imitates the phone status bar shown at the very top of the
 * Figma frame (time on the left, signal/wifi/battery glyphs on the right).
 * No real device interaction; this is purely decorative.
 */
export default function StatusBar() {
  return (
    <div
      data-component="StatusBar"
      className="flex items-center justify-between px-16 pt-2 pb-2 text-heading text-regular font-semibold"
    >
      <span>7:59</span>
      <div className="flex items-center gap-2 text-small">
        <span aria-hidden>●●●●</span>
        <span aria-hidden>📶</span>
        <span aria-hidden>🔋</span>
      </div>
    </div>
  );
}
