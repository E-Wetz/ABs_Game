# Clinic clean-base integration

Updated September 20, 2026.

## What is implemented

All ten cases now use separate, permanent 3:4 clean base illustrations. The three old treatment sprite sheets are no longer used by the clinic renderer. Original assets are retained on disk.

Generated files, references, and complete prompts are recorded in [BASE_IMAGE_PROMPTS.md](BASE_IMAGE_PROMPTS.md). Images were created using built-in reference-guided image generation and visually inspected.

`adventure.js` now defines `careBaseArt`, `careTargets`, and `careConditions`. The treatment scene has three layers:

- Persistent ailments: dirt, burrs, ear fuzz, smoke, discomfort marks, tangles, and tooth plaque.
- Persistent applied items: bandages, wraps, blanket, crystals, and ribbon.
- Temporary controls: target guides, debris tray, tool graphics, and particles.

Ailments appear before choosing a tool. Examination does not erase them. Only their matching treatment changes their opacity/removes them. Horn shine is the inverse: polishing reveals it. Toothpaste does not remove the sugar bug; brushing does. Placed items remain through the final celebration.

Existing distinct input families are preserved: hold still, scan, grab-and-drop debris, wipe, hold-to-dab, sip, and drag-and-place. Targets are calibrated to the new artwork; the dragon's stethoscope target is its chest, not its nose or paw. Completing treatment changes the smaller patient emotion portrait. The large base portrait remains static by design.

Removed the decorative clinic background's injured fox so it cannot appear behind another patient or remain injured after treatment. Corrected stretched emotion thumbnails and separated the unicorn's finishing accessories from its restored horn.

The service-worker cache is `annabeth-hospital-v37` and includes all new base images and condition assets.

## Verification

Final run passed: ten cases / 40 treatment steps, all reward screens, native mouse/touch replay, 57 precache files present, and no reported browser errors. JavaScript syntax checks and `git diff --check` also passed (Git emitted only line-ending warnings).

Run from the project folder:

```powershell
node tests/care-clinic.mjs
```

The test uses its own temporary, muted Chrome profile and local server. It does not connect to the player's browser or alter Annabeth's saved game.

Coverage:

- All ten cases, four treatment steps each, and their reward screens.
- Initial ailment visibility and a constant base image throughout each case.
- Correct-tool-only condition changes, removed debris, and retained dressings.
- Click-only input cannot complete wiping/scanning.
- Native Chrome mouse dragging and touch wiping through a complete Prickly Paw case.
- Landscape and tablet-portrait layout bounds; before/after screenshots.
- Browser exceptions, failed HTTP responses, and existence of every precached file.

Screenshots are written as `qa-care-0-before.png` through `qa-care-9-after.png`, plus `qa-care-tablet-portrait.png` (ignored by Git). Case order: Prickly Paw, Itchy Ear, Rumbly Tummy, Muddy Paw, Smoky Sneezes, Scraped Scale, Dim Horn, Tired Hoof, Tangled Tail, Sugar-Bug Tooth.

## Remaining scope

This pass addresses base artwork and clinic layering, not voice replacement or a redesign of every activity. Medical interactions remain simplified pretend play, not veterinary advice or a clinically validated treatment protocol. Cream guides/tool icons are still the existing UI, and symptom artwork is the supplied overlay set.

A physical iPad/Safari playthrough is still needed; Chrome touch input and tablet dimensions are not a substitute for device testing. Actual offline startup was not tested, only precache asset availability. The final fun/pacing assessment should be a hands-on session, not inferred from automated completion.

Reload the running app to receive the new service-worker version; if an old tab still displays sprite-sheet artwork, close and reopen that tab. No player-save reset is required.
