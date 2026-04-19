# course-app

Mobile home screen, implemented from Figma file `wriL5j9xiuUY60BxIwJj2n`
node `3235-4269` (HEADER-DESIGNS → course home).

This is a sample codebase for testing the `design-compare-merge` skill.
The intent is for the skill to compare this implementation to the Figma
design and propose precise fixes on a review branch.

## Running locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173. Open in a mobile-width
viewport (360px) for the intended layout.

## Stack

- Vite
- React 18 + TypeScript
- Tailwind CSS 3 — tokens mirror the Figma variables (see `tailwind.config.js`)

## Figma source

- File: https://www.figma.com/design/wriL5j9xiuUY60BxIwJj2n/HEADER-DESIGNS
- Node: `3235-4269` (mobile home screen)

## Component structure

```
src/
  App.tsx                   # 360px mobile frame, composes sections
  components/
    StatusBar.tsx
    TopNav.tsx              # Hamburger + search
    ClassSelector.tsx       # "Class 11 NEET · Change"
    CivilServicesBanner.tsx # Orange hero
    CategoryChips.tsx       # 3 offer cards
    TrendingCourses.tsx     # Section + 3 course cards + View All
    CourseCard.tsx          # Reusable batch card (green / yellow / gray)
    WhatsNew.tsx            # 2 promotional banners
```

Most components carry a `data-component` attribute so a
detection/mapping step can locate them in the rendered DOM.
