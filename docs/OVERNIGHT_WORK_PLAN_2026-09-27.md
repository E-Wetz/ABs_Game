# Work plan — Annabeth's Magical Animal Hospital (2026-09-27)

**Purpose:** Four issues reported directly after playtest. Fix in this order.

## 1. Enchanted Search — pictures cut off / cropped

**Root cause confirmed by screenshot diff at iPad landscape size (1194x834):** `.target-scene.forest-search` / `.xray-search` use `width:min(1100px,100%)` with a fixed `aspect-ratio:16/9`. On any viewport short enough that 16:9-at-that-width doesn't fit the remaining vertical space (landscape iPad, small iPad, split view), the scene's rendered box extends below `100dvh`. Since `.world-screen,.activity-screen{overflow:hidden}`, the bottom slice of the picture (and any hotspot placed there, e.g. the moon/key near y:80-86%) is pushed off-screen and is neither visible nor reachable — this is the "cropped/cut off" bug, not a `background-size:cover` cropping issue (the art's own aspect ratio already matches 16:9 exactly).

**Fix:** cap the scene's height to the actual available space (e.g. `max-height` derived from the surrounding flex column, or switch the sizing to `width:auto;height:min(...)` driven off viewport height with `aspect-ratio` as the constraint that yields width, not a fixed width that dictates an uncapped height). Verify at desktop, iPad portrait, and iPad landscape that the whole picture and all hotspots stay within the visible, tappable area with no page scrolling needed.

## 2. Recovery Room Memory — cards not flipping ("orange box blocker")

Could not reproduce the flip failure in a fresh disposable Chrome profile (`renderMemory` in [adventure.js](../adventure.js) flips correctly: purple back → cream front showing the emoji). Two working theories, both worth checking on her actual iPad before assuming a code bug:

- **Stale service worker cache.** `sw.js` is at `CACHE = "annabeth-hospital-v86"`; if the iPad is holding an old cached `adventure.css`/`adventure.js` from before a previous fix, a since-fixed bug could still show up there. Bump the cache version on every change made tonight so the device is forced to refetch.
- **Actual card color:** current back-face color is purple (`#7959c4`), not orange — confirm on-device whether it's literally orange (points to a stale/different build) or she's describing the purple as it renders on her screen.

Bump `CACHE` in [sw.js](../sw.js) as part of tonight's changes regardless, and ask for a fresh screenshot from her iPad if the symptom persists after a hard-refresh.

## 3. Potion Mixer — same recipe every time

**Confirmed bug** in `renderMix` ([adventure.js:841-879](../adventure.js#L841-L879)): the spoken line, the target counts (`count["🍓"]===3&&count["⭐"]===2`), and the per-icon cap (`icon==="🍓"?3:2`) are all hardcoded to one recipe, every round, every session. Fix: define a small pool of recipes (varying berry/star counts, and later other ingredient pairs) and pick one per round/session, updating the spoken line, the progress readout, and the cap logic to read from the chosen recipe instead of literals.

## 4. Coloring book — 20 new pages

No image-generation tool is available in this CLI session (the existing 12 pages were made earlier through a different tool that had that capability). Per the parent's choice: **write the 20 prompts only**, in the same style/format as [COLORING_ART_PROMPTS_2026-09-23.md](COLORING_ART_PROMPTS_2026-09-23.md), so they can be run through an AI image tool later and dropped into `assets/` to extend the book. No app-code changes for this item until PNGs exist.

## Verification gate

- Re-run the disposable-browser screenshot check on Enchanted Search at desktop, iPad portrait, and iPad landscape sizes — confirm no part of the picture or any hotspot falls outside the visible box.
- Play Potion Mixer through at least 3 rounds and confirm the recipe (spoken line + counts) changes.
- Bump `sw.js` cache version.
- Note the still-open memory-game item in the handover for a follow-up device screenshot.
