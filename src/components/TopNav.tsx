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
      className="flex items-center gap-8 px-16 pt-12 pb-12"
    >
      <button
        aria-label="Open menu"
        className="flex h-40 w-40 items-center justify-center text-heading"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
          <rect y="0" width="20" height="2" rx="1" fill="currentColor" />
          <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
          <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>
      <div
        data-component="SearchBar"
        className="flex flex-1 items-center gap-6 rounded-sm bg-white px-12 py-8 border border-strokeMed"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="6.25" stroke="#7b7f86" strokeWidth="1.5" />
          <path d="M13.5 13.5L17 17" stroke="#7b7f86" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-regular text-body2">Search for Arjuna</span>
      </div>
    </div>
  );
}
