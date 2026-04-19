# Design QA — Header designs · Handoff

This folder contains 12 patches — one per approved design-QA finding — produced
by the `design-compare-merge` skill on **2026-04-20**. Nothing has been pushed
to the remote yet.

## What's in here

- `0001-…patch` – `0012-…patch` — one patch per finding, each a single commit
  with the Figma node ID, expected vs. actual, and reasoning in the message.
- `design-qa.bundle` — a git bundle with all 12 commits if you'd rather
  `git fetch` the bundle than apply patches one at a time.
- `PR-BODY.md` — the pre-filled PR description to paste into GitHub.
- `../design-qa-report.html` — the interactive review report the designer
  approved from.

## Why this handoff exists

The sandbox running this skill couldn't push to
`https://github.com/ashpreetpw/design-qa` because no GitHub credentials are
configured. Additionally, the `.git/index.lock` inside the mounted repo folder
was locked by a prior process that the sandbox didn't have permission to
remove — so the commits were produced against a clean copy of the repo rather
than against the mounted tree directly.

All 12 commits were authored with `user.email="design.vidyapeeth@pw.live"`
and `user.name="Design VP"` (passed per-commit via `git -c`), no global config
was modified.

## Apply + push (recommended — engineer)

```bash
cd path/to/design-test-qa

# If a stale lock blocks git, remove it first (it may also need sudo if it's
# read-only from a prior container):
rm -f .git/index.lock

# Either apply the patches:
git switch design-qa/header-designs-2026-04-19   # branch already exists locally
git am design-qa-patches/0001-*.patch design-qa-patches/0002-*.patch \
       design-qa-patches/0003-*.patch design-qa-patches/0004-*.patch \
       design-qa-patches/0005-*.patch design-qa-patches/0006-*.patch \
       design-qa-patches/0007-*.patch design-qa-patches/0008-*.patch \
       design-qa-patches/0009-*.patch design-qa-patches/0010-*.patch \
       design-qa-patches/0011-*.patch design-qa-patches/0012-*.patch

# …or pull the bundle (no in-place edits needed):
git fetch design-qa-patches/design-qa.bundle design-qa/header-designs-2026-04-19:design-qa/header-designs-2026-04-20

# Push and open the PR:
git push -u origin design-qa/header-designs-2026-04-19
gh pr create --title "Design QA: Header designs — 12 fixes (2026-04-20)" \
             --body-file design-qa-patches/PR-BODY.md
```

## Commit log

```
bffdea5 design-qa: Typography fix in CategoryChip subtitle — line-height 11→13px   (F-013)
3007d8f design-qa: Typography fix in CategoryChip title — 12→14px                   (F-012)
d871c02 design-qa: Spacing fix in CategoryChips container — pt 2→16px               (F-011)
0f3a935 design-qa: Spacing/typography fix in OFFERS ARE LIVE pill — py 6→2px, 10→12 (F-010)
3e98daf design-qa: Typography fix in CivilServices headline — single-line 38px      (F-009)
b1ea2b6 design-qa: Typography fix in ClassSelector label — Body/Regular → Subheading(F-008)
5cdd36d design-qa: Sizing/colour fix in goal-icon badge — 6×6 orange → 24×24 white  (F-007)
ea4f9c4 design-qa: Colour fix in ClassSelector — bg white/80 → white/30, drop border(F-006)
8ebe7e6 design-qa: Sizing fix in SearchBar icon — 16→20px heroicons-mini            (F-005)
2664d4d design-qa: Border/gap fix in SearchBar — radius 8→4, stroke L→M, gap 8→6    (F-003/004)
4e2e422 design-qa: Sizing fix in TopNav menu button — 10×10 → 40×40 tap target      (F-002)
d6da97d design-qa: Spacing fix in TopNav — gap/py swap (gap-12 py-8 → gap-8 py-12)  (F-001)
```

## What about F-014?

One Low-severity finding (`F-014`: CategoryChip outer frame thickness) is
flagged for engineering follow-up because it requires a small structural
refactor, not a single-line edit. It's documented in `PR-BODY.md` and in the
HTML report.
