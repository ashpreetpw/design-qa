# Design QA — Header designs (2026-04-20)

Applies 12 design fixes against **Figma file [wriL5j9xiuUY60BxIwJj2n](https://www.figma.com/design/wriL5j9xiuUY60BxIwJj2n/HEADER-DESIGNS?node-id=3235-4269)**, scope: HEADER DESIGNS (node `3235:4269` → `3235:5073`).

Designer review: **Design VP** on 2026-04-20. All changes approved.

## Summary

Two categories of drift were found and fixed across four components:

- **Sizing / tap targets** — Several elements were rendered at the wrong size because the project's `tailwind.config.js` maps numeric spacing keys directly to px (so `h-10` = 10px, not 40px). Notably the hamburger button (10 × 10 → 40 × 40) and the class-selector goal icon (6 × 6 → 24 × 24) were drastically off.
- **Colour / opacity / typography** — Wrong border colour and radius on the search bar, the class-selector pill was 80 % opaque where Figma wants 30 %, the 'CIVIL SERVICES DAY' headline was split across two lines, the 'OFFERS ARE LIVE!' pill was oversized with undersized text, and several card typography values were off by 1–2 px.

Each finding is its own commit with the Figma node ID, expected vs. actual values, and reasoning in the message body — so reviewers can cherry-pick accepts / rejects per finding.

## Changes

| ID | Screen | Category | Component | Expected | Actual | Severity | Commit |
|---|---|---|---|---|---|---|---|
| F-001 | Header | Spacing | TopNav | gap 8, py 12 | gap 12, py 8 | Medium | `d6da97d` |
| F-002 | Header | Sizing | TopNav menu button | 40 × 40 | 10 × 10 | **High** | `4e2e422` |
| F-003 | Header | Border | SearchBar | radius 4, stroke/medium #b7b7b7 | radius 8, strokeLight #d9dce1 | **High** | `2664d4d` |
| F-004 | Header | Spacing | SearchBar (gap) | 6 px | 8 px | Low | folded into F-003 |
| F-005 | Header | Sizing | SearchBar icon | 20 × 20 | 16 × 16 | Medium | `8ebe7e6` |
| F-006 | Header | Colour | ClassSelector | bg white/30, no border | bg white/80, border white | **High** | `ea4f9c4` |
| F-007 | Header | Sizing | ClassSelector icon | 24 × 24 white sq | 6 × 6 orange circle | **High** | `5cdd36d` |
| F-008 | Header | Typography | ClassSelector label | 16 / 24 SemiBold | 14 / 20 | Medium | `b1ea2b6` |
| F-009 | Banner | Typography | CIVIL SERVICES DAY | single-line 38 px | two-line 32 px | Medium | `3e98daf` |
| F-010 | Banner | Spacing/Type | OFFERS ARE LIVE pill | py 2, 12 px | py 6, 10 px | Medium | `0f3a935` |
| F-011 | Offerings | Spacing | CategoryChips container | pt 16 | pt 2 | Low | `d871c02` |
| F-012 | Offerings | Typography | CategoryChip title | 14 px | 12 px | Medium | `3007d8f` |
| F-013 | Offerings | Typography | CategoryChip subtitle | 9 / 13 | 9 / 11 | Low | `bffdea5` |

## Skipped / deferred

- **F-014 (Low)** — CategoryChip outer frame: Figma renders the orange/brown (#ab3c00) 'frame' as an outer rounded-16 bg layer with an inner rounded-12 gradient card nested inside. The code renders it as a 1 px border (colour correct, thickness off). Deferred because a faithful fix requires a small structural refactor (extra wrapper + padding adjustments) rather than a one-line edit. Recommended as an engineering follow-up.

## How to verify

1. Apply the 12 patches on top of `main`: `git am 0001-*.patch ... 0012-*.patch` (they live in `design-qa-patches/` in this branch).
2. `npm run dev` and open `http://localhost:3000` — the 360 px mobile frame header should now match the Figma frame.
3. Tip: keep the Figma frame ([node 3235-4269](https://www.figma.com/design/wriL5j9xiuUY60BxIwJj2n/HEADER-DESIGNS?node-id=3235-4269)) open side-by-side while reviewing.

## Context

Produced by the `design-compare-merge` skill on 2026-04-20 in static-comparison mode (the browser bridge to the local dev server was unreachable, so before/after screenshots aren't included in the report — but every value is cross-checked against `tailwind.config.js` and the Figma `get_design_context` response, so the diffs are token-exact).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
