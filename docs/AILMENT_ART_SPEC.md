# Ailment overlay art spec — all 10 vet-clinic cases

Written for: an image-generation tool/designer picking this up cold.

## What these are for

Each vet-clinic case now has (or will have) a single static base photo — the
patient, healthy, no ailment (see `docs/CODEX_BASE_IMAGES.md`). Everything
that represents *the problem* — the prickles, the mud, the germs — is a
separate small transparent PNG "sticker" the game positions and animates in
code on top of that photo: it can be plucked and dragged to a tray, dabbed
until it fills up and pops, or faded out as it's wiped. This doc lists every
sticker needed, which ones already exist, and which are still missing.

**Critical requirement: these stickers must read correctly the moment the
case opens, before any tool is even picked** — not only once the child
reaches the specific step that treats them. A case where the mud only
appears once "wash" is selected looks broken; the mud has to already be
sitting there on the healthy base photo from frame one, exactly like the old
sprite art always showed the ailment in column 0. (Making the game actually
render them starting from frame one is a code change, not an art one — flagged
for Codex in `docs/UX_HANDOVER.md` — but keep it in mind for framing/adding
padding: each sticker needs to look at home sitting alone on the photo for a
little while, not just at the instant it's being interacted with.)

## Style guide (same as the existing stickers — match it exactly)

> Flat vector "sticker" illustration, clean bold outline, soft gradient
> shading, small glossy highlight, friendly and non-scary, kindergarten
> audience. Isolated object, fully transparent background (PNG alpha), no
> drop shadow baked in (the game adds its own), centered with a little
> padding.

Reference files already in `assets/` built to this spec:
`tweezers-open.png`, `tweezers-closed.png`, `prickle-burr.png`,
`ear-fuzz.png`, `dirt-smear.png`, `cream-dab.png`, `bug-plaque.png`,
`bandage-wrap.png`, `support-wrap.png`, `ribbon-bow.png`, `crystal-set.png`,
`cozy-blanket.png`. Use these as the visual reference for style/weight/line
thickness — the new pieces below need to sit in the same family without
looking like a different artist made them.

## Per-case breakdown

For each case: which stickers it uses, whether they already exist, and where
each one physically sits (matches `careTargets` in `adventure.js` — a single
anchor point per case; multiple copies of the same sticker are scattered a
little around that point).

**1. Prickly Paw** (fox paw) — `prickle-burr.png` ✅ have, ×3 scattered on the
paw pad. No new art.

**2. Itchy Ear** (fox ear) — `ear-fuzz.png` ✅ have, ×3 inside the ear. No new
art.

**3. Rumbly Tummy** (bunny belly) — no removable objects today (this case is
checkup + medicine, not scrub/pluck), so the only thing that should show
"something's wrong" is a single static ache mark on the belly. **New:**
`discomfort-squiggle.png` — a small wavy pink/red line with 2–3 short
motion-tick marks beside it (like a little "ouch" squiggle), ~180×100px,
transparent. (Reused on Tired Hoof too — see below.)

**4. Muddy Paw** (bunny paw) — `dirt-smear.png` ✅ have. No new art.

**5. Smoky Sneezes** (dragon face) — the ailment is a puff of smoke near the
nose, present from frame one, and it's also what gets dabbed during the mist
step. **New:** `smoke-puff.png` — a soft, translucent white-to-pale-blue
puff/cloud shape, ~240×200px, transparent. One-and-done asset, used for both
the static mark and the interactive dab target so the look is consistent.

**6. Scraped Scale** (dragon body) — `dirt-smear.png` ✅ have, works fine for
the grime being washed off. No new art.

**7. Dim Horn** (unicorn horn) — this one's different from the rest: the
"before" state is already just the base photo's plain gray/silver horn (no
separate ailment sticker needed for that — the dullness *is* the base
image). What's missing is the payoff: as she polishes, the horn should gain
warm gold/rainbow shine. **New:** `horn-shine.png` — a tall, narrow horn-shaped
overlay of warm gold-to-rainbow gradient glow/sparkle, meant to sit exactly
over the horn shape and fade **in** (this is the one sticker in the whole set
that appears rather than disappears). ~150×300px, transparent, portrait
orientation matching a horn silhouette.

**8. Tired Hoof** (unicorn leg) — `dirt-smear.png` ✅ have for the wash step,
`cream-dab.png` ✅ have for the cream step, plus the same
`discomfort-squiggle.png` from Rumbly Tummy for a static "sore leg" mark from
frame one. No new art beyond the shared squiggle above.

**9. Tangled Tail** (fox tail) — small leaves/twigs caught in the fur. **New:**
`tangle-leaf.png` — a tiny cluster of 1–2 leaves and a small twig, tangled
together, ~220×180px, transparent.

**10. Sugar-Bug Tooth** (bunny mouth) — `bug-plaque.png` ✅ have — this is the
germ character already built; it should be the ailment mark on the teeth from
frame one, and what fades away during brushing. The toothpaste step just
uses the plain `cream-dab.png` like every other cream/paste step. No new art
(this is a code wiring fix on the game side, not an art gap — flagged for
Codex).

## Summary: what's actually needed

Only **4 new images**:

1. `discomfort-squiggle.png` — 180×100px
2. `smoke-puff.png` — 240×200px
3. `horn-shine.png` — 150×300px (fades in, not out — different from every
   other sticker in this set)
4. `tangle-leaf.png` — 220×180px

Everything else across all 10 cases reuses the 12 stickers already in
`assets/`. Drop the 4 new files straight into `assets/` with those exact
names — the code changes to actually use them (frame-one visibility, the
toothbrush/toothpaste fix, the horn fade-in) are described in
`docs/UX_HANDOVER.md` for Codex to implement.
