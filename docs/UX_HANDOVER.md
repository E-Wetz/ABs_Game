# Vet-clinic UX/UI handover

Written for: Codex, picking this up cold with no prior context on this
codebase or conversation history.

## The app

`Annabeth's Magical Animal Hospital` — a dependency-free HTML/CSS/vanilla-JS
PWA for a kindergarten-age child (pre-reader), built by a solo parent
developer working with an AI assistant. No framework, no build step. All
files are static (`index.html`, `adventure.js`, `adventure.css`, `styles.css`,
`app.js`), see `docs/architecture.md`. This doc is about one part of it: the
"Magical Vet Care" mini-game, implemented almost entirely in one function,
`renderCareClinic()` in `adventure.js`.

## What it is

Ten short "cases" (`careCases` in `adventure.js`), each a 4-step sequence:
pick the right tool (out of a few icon choices, failure-free — wrong taps
just gently bounce, nothing is ever marked "wrong"), then physically interact
with a close-up photo of the patient using that tool — pluck something out
with tweezers and carry it to a tray, scrub an area with a cleanser and
watch bubbles form, dab a few spots with cream until each one fills and
pops, or drag a bandage/wrap/ribbon into place and drop it. This is meant to
feel like real hands-on pretend-play, not "tap the right multiple-choice
answer four times." That distinction has been the entire point of this
feature's development — earlier versions used a single generic "rub the
screen until a meter fills" gesture for every tool, which read as cheap and
was explicitly rejected in favor of what's there now: per-tool gesture
families (`toolFamily` map — `holdStill`, `scanArea`, `tapDebris`,
`wipeScrub`, `dabSpots`, `sip`, `placeItem`), each with its own physically
appropriate interaction, tool-specific cursor art (real tweezers-open/closed
PNGs that swap on grab, a built lens+handle magnifier, etc.), and real
overlay sticker art for the things being removed or applied (see
`docs/AILMENT_ART_SPEC.md`).

## The architecture, after the current in-flight change

Two things are landing at once, and Codex may be doing one or both:

1. **Base images** (`docs/CODEX_BASE_IMAGES.md`) — swap the old 4-column
   sprite-sheet-per-case background for one static, ailment-free photo per
   case that never changes for the whole case.
2. **Ailment overlay art** (`docs/AILMENT_ART_SPEC.md`) — the stickers that
   sit on top of that static photo and represent (and let the child remove)
   the actual problem.

Once both are in, `.care-treatment`'s background photo is *permanently
fixed* for the whole case — it is never swapped, revealed, or cross-faded.
100% of the visible "something changed" feedback comes from the overlay
sticker layer (`actionLayer`, a plain absolutely-positioned `<div>` on top of
the photo) — stickers appearing, filling, fading, flying to a tray, or being
dropped into place.

## The specific bug to fix: ailments must be visible from frame one

This is the most important functional change in this handover, distinct from
either art-swap task above. Right now (and this will still be true
immediately after the base-image swap, unless this is also fixed), each
step's interactive overlay is built inside `prepare()`, which only runs
*after* the child has already picked the correct tool **for that specific
step**. Concretely: on a 4-step case, step 2 might be "tweezers" (family
`tapDebris`), and the `prickle-burr.png` stickers that represent the
prickles are only created when step 2 begins — meaning during step 1 (say,
the magnifier/`scanArea` "look closely" step), the paw shows *nothing wrong
with it at all*. The child is told to use a magnifier to look closely at a
paw that, visually, has no problem. The ailment only appears once she
happens to reach the step that treats it. That's backwards — the whole
reason she's using any tool at all is that something is visibly wrong, and
it should be visible starting the instant the case opens, exactly like the
old sprite art's column 0 always showed the ailment immediately.

**Fix:** move ailment-sticker setup out of the per-step `prepare()` and into
case setup (near the top of `renderCareClinic`, before `update()` first
runs), so it renders once, immediately, and stays on screen continuously
across every earlier step until the specific step that treats it actually
completes it (at which point it fades/flies away/pops as it already does).
Concretely this means:

- `setupDebris()` (tweezers/swab stickers — `prickle-burr.png`,
  `ear-fuzz.png`) and `setupDabSpots()` (cream/mist/paste stickers) should be
  called once up front for whichever step in `patient.plan` is that case's
  actual `tapDebris`/`dabSpots` step, not re-called from inside `prepare()`
  keyed to "whatever step is currently active."
- The stickers should be visually present (and, per `docs/AILMENT_ART_SPEC.md`,
  a couple of cases — Rumbly Tummy, Tired Hoof, Smoky Sneezes' initial
  puff — need a *static* ailment mark shown from frame one even during a
  step that isn't itself interactive, like the stethoscope/holdStill check).
- They should **not** be interactive/grabbable until their own step is
  actually reached and its tool is chosen (keep the existing
  `if(!chosen)return` / `treatment.dataset.family` gating — that part is
  already correct and shouldn't change, only *when the art appears* changes).
- Once the relevant step completes (tray drop, dab fill, wipe amount reaching
  100), the sticker resolves exactly as it does today — no change to that
  part of the logic.

## Two small, specific fixes bundled into this same pass

**Sugar-Bug Tooth is currently mis-wired.** `bug-plaque.png` (the germ
character) is the ailment for this case and should be removed during the
`toothbrush` step (family `wipeScrub`) — that's the step that's actually
supposed to scrub the germs away. Currently the code special-cases
`ailment==="Sugar-Bug Tooth"` inside `setupDabSpots()`, which only runs
during the `toothpaste` step — meaning the germs currently show up (and can
only be "resolved") during the wrong step, one step later than they should.
Move that special-case so `bug-plaque.png` is the toothbrush/`wipeScrub`
step's ailment mark (fading out as the scrub `amount` climbs, same mechanism
already used for the plain mud smear on other cases), and let the
`toothpaste`/`dabSpots` step use the same plain `cream-dab.png` every other
dab step uses.

**Dim Horn needs an inverse animation.** Every other sticker in this game
fades *out* as it's treated (removed, wiped away, popped). Dim Horn is the
one exception: the horn starts plain gray (that's just the base photo, no
sticker needed for that part), and `horn-shine.png` (see
`docs/AILMENT_ART_SPEC.md`) needs to fade **in** — its opacity should track
`polish` step progress (`amount`) directly rather than inversely, positioned
over the horn using the same anchor-point system (`careTargets`) everything
else uses.

## What "done" looks like

Load any case fresh (no interaction yet) and the problem should already be
visible on the patient — a scattering of prickles, a smear of mud, the germ
character on the teeth, a small ache mark — never a blank, already-healthy-
looking photo waiting for a later step to reveal what's wrong. Work through
all 4 steps of all 10 cases and confirm each one's ailment mark is present
from the start, resolves during its own correct step (not a different one),
and the background photo itself never visibly changes or jumps. See the
"Testing" section of `docs/CODEX_BASE_IMAGES.md` for how verification was
done on this file previously (headless Chrome via CDP, synthetic pointer
events, actual screenshots — not just "no console errors").
