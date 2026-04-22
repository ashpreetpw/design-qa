/**
 * TopNav — hamburger menu on the left, rounded search field on the right.
 * The search field has a placeholder that in the real product rotates
 * through course names ("Arjuna", "Lakshya", "Uday"). Here we just show
 * the static "Search for Arjuna" placeholder.
 */
export default function TopNav() {
  return (
    <div
      data-component="TopNav"
      className="flex items-center gap-12 px-20 pt-8 pb-8"
    >
      <button
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center text-heading"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
          <rect y="0" width="20" height="2" rx="1" fill="currentColor" />
          <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
          <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>
      <div
        data-component="SearchBar"
        className="flex flex-1 items-center gap-8 rounded-md bg-white px-12 py-8 border border-strokeLight"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.25" stroke="#7b7f86" strokeWidth="1.5" />
          <path d="M11 11L14 14" stroke="#7b7f86" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-regular text-body2">Search for Arjuna</span>
      </div>
    </div>
  );
}
