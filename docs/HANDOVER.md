# Annabeth's Magical Animal Hospital — Project Handover

Last updated: September 20, 2026  
Repository: `https://github.com/E-Wetz/ABs_Game`  
Current branch: `main`  
Current handover baseline: commit `ec9b009`

## 1. Product goal

Build a polished, colorful, iPad-first educational game for Annabeth, a bright kindergarten student who cannot yet rely on reading. The experience should feel like an interactive magical-animal adventure rather than a worksheet collection.

The intended pillars are:

- Playable without reading: pictures, animation, demonstration, and natural spoken guidance must carry the experience.
- Meaningful interaction: gestures should imitate the action being performed rather than add arbitrary tapping or dragging.
- Replayability without grinding: varied patients, ailments, questions, coloring pages, searches, rewards, and favorite-game replay.
- Visible progression: stars, gems, discoveries, story chapters, outfits, and mix-and-match accessories.
- Educational integrity: kindergarten-level phonemic awareness, rhyming, sight words, number recognition, early mathematics, patterns, tracing, and related skills.
- Production-quality presentation: coherent art, expressive characters, understandable feedback, and age-appropriate audio.

## 2. Current implementation

The project is a dependency-free HTML/CSS/JavaScript progressive web app. It runs in a browser, supports mouse and pointer/touch events, can be installed on an iPad, and caches its files for offline use.

Primary files:

- `index.html`: application screens, dialogs, parent controls, and semantic structure.
- `styles.css`: shared application and original game styling.
- `adventure.css`: world, activities, veterinarian interface, coloring, and wardrobe styling.
- `app.js`: persisted state, dentist game, tic-tac-toe, speech, parent controls, and sound preference.
- `adventure.js`: story world, educational activities, veterinarian cases, rewards, coloring, and wardrobe behavior.
- `sw.js`: offline asset cache. Its cache version must be incremented whenever cached files change.
- `tests/playthrough.mjs`: Chrome DevTools-based automated playthrough harness.
- `docs/literacy-design.md`: literacy activity rationale.
- `docs/academic-audit.md`: standards and academic coverage audit.
- `docs/architecture.md`: broader architecture notes.

Local progress is stored in browser `localStorage` under `annabeth-magical-hospital-v1`. There are no accounts, advertisements, analytics, or external data collection.

## 3. Current game inventory

The application includes:

- Ten rotating veterinary cases with four steps each.
- Teeth cleaning and polishing.
- Replayable tic-tac-toe.
- Hidden-object searches with delayed hints.
- Freehand coloring with touch/stylus support.
- Phonemic-awareness activities for ending and middle sounds.
- Rhyming and kindergarten sight words.
- Sound blending and segmenting.
- Number recognition, including teen and double-digit enrichment.
- Counting, comparing, early addition/subtraction, shapes, measurement, sorting, patterns, memory, and guided tracing.
- Story chapters, unlockable locations, rewards, replay bonuses, and mastery tracking.
- Twelve ready-made outfits.
- A persistent mix-and-match wardrobe with separate clothing, headwear, shoes, jewelry, ribbons, and veterinary-equipment selections.

## 4. Critical unresolved experience issues

These issues are explicitly not considered production-ready.

### 4.1 Veterinarian interactions are not medically or mechanically credible

Current behavior in `renderCareClinic()` maps several diagnostic tools to a generic `inspect` mode. Progress is earned by moving the selected item around the treatment image. This produces interactions such as moving a stethoscope around a chest or moving a thermometer around a mouth. That does not reflect how those tools are used and teaches an incorrect process.

The interface also calls `tone()` repeatedly while movement increases the progress meter. The result is a crude electronic sound during treatment rather than believable, gentle feedback.

This must be replaced with tool-specific interaction controllers:

| Tool/action | Appropriate interaction |
| --- | --- |
| Stethoscope | Place the chest piece on one or two illustrated chest targets and hold it still while a heartbeat is heard. |
| Thermometer | Place it at the clearly indicated mouth, ear, or underarm target and hold still while a short meter fills. The selected measurement site must make sense for the animal and case. |
| Magnifier/scanner | Move slowly across a bounded examination area to reveal details. This is one of the few diagnostic tools for which scanning motion is appropriate. |
| Flashlight/dental mirror | Position at the ear or mouth target; tap to adjust angle if needed. Do not scrub or roam arbitrarily. |
| Tweezers | Tap or drag individual visible splinters, burrs, or debris outward. |
| Wash/cleanser/toothbrush/polisher | Use repeated wiping, brushing, or circular pointer strokes directly over visible dirt, plaque, or the affected surface. |
| Drops/cream/paste/mist | Deliberate drops, dabs, or sprays on marked treatment areas, with visible material accumulation or fading. |
| Bandage/wrap | Drag from a starting edge and follow a guided wrapping path, then smooth it once. |
| Blanket/ribbon | Drag into the correct placement zone and release. |
| Potion | A small number of measured sips, with swallowing/comfort animation rather than rubbing. |

The progress meter should measure the correct action, not raw pointer movement. Incorrect movement should simply do nothing; it should not punish a young player.

Each case also needs a case-specific visual review. The treatment artwork and tool plan must agree about body location, symptoms, treatment, and recovery. Fantastical ailments may use magical tools, but ordinary medical tools should behave recognizably.

### 4.2 The narration voice is unacceptable

The current `speak()` implementation in `app.js` uses the browser Web Speech API (`speechSynthesis`). The application scores available English voices and offers a voice picker, but this cannot create a better voice than the operating system/browser provides. On the test laptop, the result still sounds like an old computer-game voice. That is not suitable for a polished game led by audio instructions.

A substantially more natural voice is possible. The recommended production solution is:

1. Record or generate a consistent warm adult narrator voice for all fixed story lines, instructions, encouragement, tool names, picture names, phonemes, words, and numbers.
2. Store the resulting compressed audio files locally in the project, preferably as `.m4a`/AAC for Apple devices with an `.ogg` or `.mp3` fallback where needed.
3. Add an audio manifest that maps semantic IDs to files, captions, and duration.
4. Replace direct `speechSynthesis` calls with an audio manager that plays packaged narration first.
5. Retain browser speech only as a last-resort fallback for unforeseen dynamic text.
6. Cache narration files in the service worker so the installed iPad game works offline.

Do not place a paid cloud text-to-speech API key in client-side JavaScript. If narration must be synthesized dynamically, it requires a small authenticated backend and an online connection. For this mostly fixed-content game, prerecorded local narration is simpler, safer, more consistent, and works offline.

Phonics audio needs special review by an early-literacy educator or a carefully directed human speaker. Isolated sounds should not add an unintended schwa; for example, `/m/` should not become “muh.” General-purpose text-to-speech is not reliable enough for this requirement.

### 4.3 Sound design needs replacement

The application currently creates simple oscillator tones with the Web Audio API. These are acceptable only as temporary implementation cues.

The next audio pass should use short, gentle recorded effects:

- Soft cloth/water wiping for cleaning.
- Quiet brush texture for teeth and fur.
- A calm heartbeat only while a stethoscope is correctly placed.
- A small thermometer completion chime after the hold finishes.
- Light drop, spray, bandage, sparkle, and reward sounds.
- No continuous tone tied directly to every pointer-move event.

All effects and narration must respect the existing sound toggle. Separate voice and effects volume controls would be preferable.

### 4.4 Wardrobe artwork needs device-level visual QA

The wardrobe now stores independent selections and contains transparent sprite sheets for clothes, headwear, shoes, jewelry/ribbons, and medical equipment. The layer architecture supports mixing and replacing one category without clearing the others.

However, the latest accessory sheets were integrated through CSS positioning and have not yet completed a careful device-level alignment pass on every combination. Test each item on both laptop and iPad aspect ratios. Check headwear against the hair, necklaces against every neckline, shoes against both legs, gloves against hands, and the medical bag against the hand. Adjust per-item transforms rather than accepting visibly floating or clipped accessories.

The generic round mouse ears are original, unbranded artwork. Do not add protected Disney character art or logos without an appropriate license.

## 5. Recommended next development order

1. Stop adding new activities until the core veterinarian interaction and narration quality are corrected.
2. Split `renderCareClinic()` into explicit tool controllers instead of the current broad mode map.
3. Remove movement-triggered oscillator tones from veterinarian gameplay.
4. Produce and integrate a natural prerecorded narration pack.
5. Conduct a complete wardrobe alignment pass for every item and representative mixed combinations.
6. Perform a supervised playtest with Annabeth, observing without coaching wherever possible.
7. Fix confusion, missed touch targets, pacing problems, and any places where she waits for instructions.
8. Re-run automated regression testing after the interaction changes.

## 6. Testing status

An automated playthrough harness exists and previously completed the activity library. It was updated for the newer veterinarian gesture interface, but the latest veterinarian and wardrobe changes have not received a fully observed end-to-end iPad playtest.

Recent changes passed JavaScript syntax and Git diff checks. That is not equivalent to validating gameplay quality, medical sense, touch behavior, visual layer alignment, speech quality, or child comprehension.

Before calling the app production-ready, verify:

- Every game can be entered, completed, rewarded, replayed, and exited.
- Mouse, touch, and stylus paths all work.
- No game produces sound while muted.
- Every spoken instruction is understandable without reading the screen.
- Every veterinarian tool uses a sensible action on a sensible body location.
- Each ailment visibly improves after the relevant step.
- All ten veterinary cases complete without repeated or contradictory state changes.
- Every wardrobe item appears in the correct position and persists after reopening.
- Offline installation and reload work on the target iPad.
- Progress export, import, and reset behave correctly.

## 7. Running locally

From the repository root:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`.

The earlier directory-listing problem occurred because the server was started from `C:\Windows\System32` instead of the project directory. Run the command only after changing to the repository folder, or provide the directory explicitly:

```powershell
python -m http.server 8080 --directory "C:\Users\emw0009\Desktop\ABs_Game"
```

## 8. Deployment notes

- The repository is private on GitHub.
- It can be hosted as a static site, including through GitHub Pages if repository/account settings permit private-repository Pages.
- An iPad does not run the PowerShell server after deployment; it opens the hosted URL and may install the PWA to the Home Screen.
- Increment the cache name in `sw.js` whenever cached code, artwork, or audio changes.
- During testing, refresh twice or clear the site's stored data if an old service-worker cache continues to appear.

## 9. Important recent commits

- `ec9b009` — layered mix-and-match accessory artwork.
- `aa37976` — fitted clothing artwork and clothing previews.
- `2270b9b` — rebuilt veterinarian treatment interface and illustrated treatment states.
- `b8f3ec3` — voice selection improvements and app icon update.
- `887d7d4` — mute setting applied to all generated sounds.
- `32cced5` — automated full-game playthrough harness.

## 10. Definition of done

The project should not be described as production-ready until:

- The veterinarian tools use clinically sensible, tool-specific interactions.
- The crude movement tones are replaced with appropriate sound effects.
- Narration sounds natural and consistent on the actual iPad.
- A child can understand and complete every core loop without needing to read or receive adult explanation.
- The wardrobe layers are visually aligned across all combinations.
- A fresh end-to-end regression pass and an observed child playtest are complete.

