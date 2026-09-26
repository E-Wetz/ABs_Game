# Overnight work plan — Annabeth's Magical Animal Hospital

**Purpose:** This is an execution brief for the existing five-hour reset-cycle task. Do not implement this plan during the parent conversation that created it. Begin only when the scheduled task wakes after the usage window resets.

**Operating rules**

- Preserve all existing uncommitted work and the child's saved progress. Use disposable, muted browser profiles for QA.
- Do not push, publish, reset saves, or redeem usage credits.
- Work in small verified increments. Update `docs/PLAYTEST_HANDOVER_2026-09-22.md` after each meaningful pass.
- Use packaged `af_heart` recordings for child-facing audio. Never add robotic browser speech as a substitute.
- Run the complete muted regression after each major group and capture screenshots at desktop and iPad portrait sizes.

## Priority 1 — make veterinary care varied and genuinely fun

The parent played three cases and received the same magnifier → scrub → cream → bandage rhythm every time. Expand the ten-case rotation and add at least four additional medically sensible case plans using visibly different tools and motions:

- shot/injection with a real syringe: drag to the glowing site, hold the pink plunger, show a brief safe make-believe response, and explain that real shots are for grown-up vets;
- otoscope/ear inspection for an ear case, with a visible ear canal view and a gentle hold/inspect action;
- stitches or wound-closure for a scraped injury, with a short guided stitch/zip motion and healing progression;
- thermometer, stethoscope, mist, medicine, scanner, mirror, tweezers, dropper, sponge, soap, cream, polisher, crystals, wrap, brush, and dental tools each used in the anatomically sensible place where they belong.

Every case should have 4–5 meaningful steps, condition-specific art that visibly improves after each step, an emotional patient response, and a different motion (drag, wipe, hold steady, tap sequence, circular polish, squeeze, or place). Do not use generic circles as the action. Make the hit area forgiving so the child can grab anywhere on the tool, then guide the tool to the correct body region.

Remove or redesign the broken heartbeat game: cadence must matter, not merely four taps. If it cannot be made delightful, remove it from the map and progression. Keep `Sound Bridge`, `Word-Cracker Eggs`, and standalone `Rhyme Garden` retired.

## Priority 2 — repair interaction feel

- Fern's tweezers must be dragged around the visible prickle, not tapped.
- Fern's ear drops and cotton must accept a natural drag from the tool to the ear debris.
- Soap, sponge, cream, brush, and polisher should show the actual implement and local effect; no oversized target rings.
- Bramble's dental mirror, paste, toothbrush, and rinse must align with the enlarged mouth. Rinse mist must travel into the mouth and clear several small sugar bugs.
- Thermometer must show a rising temperature and a clear final reading. Stethoscope must contact chest/heart, never a paw.
- Pip's medicine vial must tip toward his mouth, dock reliably, and visibly empty in sips.

## Priority 3 — educational game pacing and challenge

- Any one-round game must become a three- or four-round session with visibly different content and one reward at the end.
- Counting Eggs, Magical Measuring, Word Treats, Letter Skywriting, Number Trails, Potion Mixer, Royal Pattern Parade, Number Kingdom, Magic Number Nests, and Castle Shape Repair must all show clear round progress.
- Potion Mixer must include distractor ingredients so listening is required; recipes should vary between sessions and rounds.
- Letter tracing must tolerate a lifted finger and use clean, well-formed M, A, S paths. Number trails must use equally clear 2, 7, and 9 paths.
- X-Ray Detective needs a larger scan area, more separated layouts, three steady discoveries, and a delayed hint.
- Enchanted Search needs multiple scenes, five-of-six finds, at least one minute before the hint, and hotspots spread far enough that a broad circle cannot solve it.

## Priority 4 — map, coloring, and wardrobe

- The map must visibly show journey progression, visited stops, and replayable games; verify each of the 22 active games appears exactly once.
- Coloring must use nearly the whole screen on iPad, with twelve strong line-art pages, a recognizable eraser icon, and clear hand/fit controls understandable without reading.
- Keep the parent-approved smaller collection of complete polished outfits. Do not revive floating accessory composition. Verify each complete-look thumbnail and the full avatar persist through navigation and reload.
- Show the selected avatar/outfit in activity screens where it helps the child feel present, without shrinking the veterinary or coloring play area.

## Priority 5 — audio production and verification

- Use [`CLAUDE_AUDIO_HANDOFF.md`](voice/CLAUDE_AUDIO_HANDOFF.md) plus [`RECORDING_SCRIPT.md`](voice/RECORDING_SCRIPT.md) as the source for all current and new lines.
- Record new map-stop narration, revised veterinary action cues, varied potion recipes, X-ray scanning cues, and any new shape-drag lines in `af_heart`.
- Keep narration from being cut off between frames or rounds. Stop/queue clips cleanly and do not replay the full home narration on every return.
- Use gentle optional title music on the home screen, respecting mute and autoplay rules.
- Change the location of my audio from the pocket of the main character on the title screen to the big heart on the main hospital on the title screen

## Verification gate before reporting completion

Run the full muted disposable-browser suite through all ten existing care cases plus every new case, dentist, map progression, all three-round educational activities, search, X-ray, potion drag/stir, tracing, coloring, wardrobe persistence, mouse input, touch-sized targets, offline cache, and zero console errors. Visually inspect the key screenshots and record remaining issues in the handover. Do not call the app production-ready without a real iPad/child playtest.

