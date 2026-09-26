# Wiring in the plain base images (vet clinic)

Written for: Codex, picking this up cold with no prior context on this codebase.

## What this app is

`Annabeth's Magical Animal Hospital` is a dependency-free HTML/CSS/vanilla-JS
kids' PWA (no build step, no framework — `index.html` + `adventure.js` +
`adventure.css` + `styles.css` + `app.js`, served as static files, see
`README.md`/`docs/architecture.md`). All the vet-clinic mini-game logic lives
in one function: `renderCareClinic(box, patient)` in `adventure.js` (currently
around line 180). `patient` is one entry from the `careCases` array (also in
`adventure.js`), e.g.:

```js
{animal:"fox",row:0,name:"Fern",ailment:"Prickly Paw",intro:"...",plan:["magnifier","tweezers","cleanser","bandage"]}
```

## The problem being fixed

Today the close-up photo shown during a case comes from one of three 4×4
sprite sheets, `assets/care-treatments-1.png` / `-2.png` / `-3.png`. Each
sheet has 4 rows (one per case) and 4 columns (one per plan step). Column 0 of
each row already has the ailment drawn into the photo (visible immediately —
this part is fine). The code reveals later columns locally, through a canvas,
as the child interacts, to show the tool actively removing the problem.

Two real problems with this:
1. It requires the sprite art to have been drawn with the ailment already
   baked into column 0, tool-in-hand baked into columns 1–2, and the final
   item baked into column 3 — so there is no "clean" frame to fall back to,
   and no way to show the ailment as something dynamically added and then
   removed, independent of the photo itself.
2. The 4 rows in the existing sheets are not evenly spaced (this was a real
   rendering bug independently found and fixed — see `FRAME_MARGIN` in
   `renderCareClinic`), which is exactly the kind of fragility a hand-tuned
   sprite grid produces.

**The base plates being generated now replace this entirely.** Each of the 10
cases gets one static, permanent background photo — the character, healthy,
no ailment, no tool, no hand, no bandage — that never changes for the whole
case. The ailment itself and its removal are handled entirely by separate
transparent overlay stickers the game already draws and animates in code
(pluck-and-carry, wipe-and-fade, dab-and-glow, drag-and-place — all already
built and working). See `docs/AILMENT_ART_SPEC.md` for what's being
generated to sit on top of these base plates, and read that doc's "why now"
section too — the ailment overlay needs to be visible from the very first
frame of the case, not appear partway through, which the current sprite-driven
design cannot do cleanly. That's the core motivation for this whole change.

## Files you'll touch

- `assets/` — the 10 new base images should already be here (or land here
  shortly): `base-prickly-paw.png`, `base-itchy-ear.png`,
  `base-rumbly-tummy.png`, `base-muddy-paw.png`, `base-smoky-sneezes.png`,
  `base-scraped-scale.png`, `base-dim-horn.png`, `base-tired-hoof.png`,
  `base-tangled-tail.png`, `base-sugar-bug-tooth.png`. If Codex generated them
  under different filenames, rename to match this list (the code below
  assumes it) or update the map to match whatever they're actually called —
  just keep it a 1:1 map from ailment name to file.
- `adventure.js` — `renderCareClinic()`.
- `sw.js` — bump `CACHE` version and add the new filenames to `ASSETS` (only
  after confirming they exist — `cache.addAll` fails the whole install if any
  listed file 404s).

## Step by step

**1. Add a base-image lookup**, next to the existing `careArt` map (search
for `const careArt=`):

```js
const careBaseArt={
  "Prickly Paw":"base-prickly-paw.png",
  "Itchy Ear":"base-itchy-ear.png",
  "Rumbly Tummy":"base-rumbly-tummy.png",
  "Muddy Paw":"base-muddy-paw.png",
  "Smoky Sneezes":"base-smoky-sneezes.png",
  "Scraped Scale":"base-scraped-scale.png",
  "Dim Horn":"base-dim-horn.png",
  "Tired Hoof":"base-tired-hoof.png",
  "Tangled Tail":"base-tangled-tail.png",
  "Sugar-Bug Tooth":"base-sugar-bug-tooth.png"
};
```

**2. Replace the sprite background with the flat base plate.** In
`renderCareClinic`, find:

```js
const [sheet,row]=careArt[patient.ailment]||[1,0];
...
const treatment=document.createElement("div");treatment.className="care-treatment";treatment.style.backgroundImage=`url("assets/care-treatments-${sheet}.png")`;treatment.setAttribute("aria-label",...);
```

Replace with a direct, permanent background — no sheet, no row, no column:

```js
const baseArt=careBaseArt[patient.ailment]||"base-prickly-paw.png";
const treatment=document.createElement("div");treatment.className="care-treatment";treatment.style.backgroundImage=`url("assets/${baseArt}")`;treatment.style.backgroundSize="cover";treatment.style.backgroundPosition="center";treatment.setAttribute("aria-label",`${patient.ailment} close-up`);
```

The base plates are already the same 3:4 portrait aspect as `.care-treatment`
(see `adventure.css`), so `background-size:cover` should show the whole
photo with no cropping — verify this visually once the real files are in and
adjust to `contain` only if a plate's framing doesn't fill the box cleanly.

**3. Delete the entire reveal-canvas system.** It exists purely to fake
"changing frame" on the old sprite sheets and has no purpose once the
background never changes. Remove all of the following from
`renderCareClinic` (all currently between the `treatment` element creation
and the `prepare()` function):

- `const revealCanvas=...`, `const revealCtx=...`, `const sheetImg=...`
- `const resizeReveal=...`
- `const FRAME_MARGIN=...`, `const frameCrop=...`, `const applyBaseFrame=...`
  and its `sheetImg.addEventListener("load",applyBaseFrame)` line
- `const revealAt=...`, `const revealAtPercent=...`, `const fullReveal=...`
- the `revealCanvas` element from `treatment.append(revealCanvas,actionLayer,gestureTool,meter)` → becomes `treatment.append(actionLayer,gestureTool,meter)`
- every call site that references any of the above: `revealAt(...)` calls in
  the `pointermove` handler (scanArea/wipeScrub/holdStill branches),
  `revealAtPercent(...)` calls in the `dabSpots` fill interval, the
  `tapDebris` drop handler, the `sip` cup click handler, and the `placeItem`
  release handler. Just delete each call, leave everything else in those
  handlers as-is (the reveal was always a side effect alongside the real
  state changes — `addAmount(...)`, `classList.add(...)`, etc. — never the
  only thing happening).
- `fullReveal()` call and `resizeReveal()` calls in `finishStep()` and the
  final `care.append(...)` block — the final block becomes just:
  `care.append(progress,patientCard,treatment,prompt,tools);box.append(care);update();`

**4. Delete the now-dead CSS.** In `adventure.css`, remove the
`.care-reveal-canvas` rule, and simplify `.care-treatment`'s rule — it no
longer needs `background-repeat` gymnastics tied to a sprite grid, just:

```css
.care-treatment{position:relative;grid-column:2;grid-row:2;aspect-ratio:3/4;width:auto;height:100%;max-width:100%;min-height:0;justify-self:center;align-self:center;overflow:hidden;border:7px solid #fff;border-radius:30px;box-shadow:0 12px 30px #37275255;touch-action:none;cursor:crosshair}
```

**5. Re-check (don't blindly trust) `careTargets`.** This map (right below
`careArt`) gives each ailment's interaction anchor point as `{x,y}` percent
coordinates within `.care-treatment` — where the prickles/mud/etc. actually
sit on the photo, used to position every overlay sticker and hotspot. It was
calibrated against the *old* sprite crops. The base plates were specified to
match the same crop/pose/framing, so these should mostly still work, but
actually load each case and eyeball it — if a sticker lands slightly off the
character, nudge that ailment's `x`/`y` in `careTargets`, nothing else needs
to change.

**6. Ship it.** Bump `CACHE` in `sw.js` (e.g. `annabeth-hospital-vNN`) and add
the 10 new filenames to its `ASSETS` array (same pattern as the existing
`ASSETS.push(...)` lines) — only once you've confirmed the files are actually
in `assets/`, since a missing file breaks the service worker install for
everyone.

## Testing

There's no test framework here — verification in past work on this file was
done by serving the app locally (`python -m http.server 8080` per
`README.md`) and driving a real Chrome instance via the Chrome DevTools
Protocol (raw WebSocket + `Runtime.evaluate`), seeding `localStorage` with a
synthetic save state to jump straight to a specific case, e.g.:

```js
localStorage.setItem("annabeth-magical-hospital-v1", JSON.stringify({
  stars:50, gems:5, missions:0, ticTacToeWins:0, sound:false,
  story:{completedActivities:[], currentOutfit:"doctor", chapter:1, customLook:{}, careHistory:[1,2,3,4,5,6,7,8,9]}, // excludes index 0 -> forces "Prickly Paw"
  mastery:{}
}));
location.reload();
```

Then click `#worldButton` → `.activity-card[data-game="paw"]`, and dispatch
synthetic `PointerEvent`s at `.care-treatment` to work through all 4 steps.
Confirm: the background photo never changes/jumps between steps, the ailment
sticker is visible immediately on the first frame (see the other handover
doc for why this matters), no console errors, and each case reaches the
reward screen. Take screenshots (`Page.captureScreenshot` over CDP) and
actually look at them — this class of bug is visual, not something a
passing script proves on its own.
