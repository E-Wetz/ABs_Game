# Annabeth's Magical Animal Hospital

An iPad-first, offline-capable educational PWA with a connected magical kingdom, story chapters, unlockable outfits, and a library of replayable animal-care and learning games.

## Run locally

Service workers require HTTP rather than opening `index.html` directly.

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`. For iPad layout testing, use a landscape tablet viewport such as 1180 × 820.

## Included

- Touch/pointer teeth inspection, brushing, and polishing
- Replayable tic-tac-toe against a friendly dragon opponent, with saved wins
- Twenty-three integrated world-map adventures plus teeth cleaning and tic-tac-toe, spanning treatment, potions, searching, rhythm, phonics, rhyming, sight words, counting and comparing, numbers 11–19, double-digit enrichment, shapes, measurement, sorting, sound blending and segmenting, guided tracing, visual math, patterns, memory, and coloring
- Four lightweight story chapters with recurring magical patients
- A world map and free-choice activity carousel
- Twelve locally saved illustrated outfits unlocked from 0–100 stars, with original unlocks preserved
- Persistent mix-and-match dress-up with independent headwear, clothing, jewelry, shoes, ribbons, and veterinary-equipment layers
- Original storybook-park accessories, including classic mouse ears, without licensed character artwork or branding
- Pre-reader design: visual story sequences, picture-led activity selection, automatic spoken setup, repeated audio buttons, and short optional captions
- Cohesive illustrated scenes for the hospital, treatment room, potion lab, X-ray room, enchanted forest, castle meadow, art studio, recovery room, and outfit wardrobe
- Gentle interaction tones, celebration sounds, animated feedback, and replay-varied learning prompts
- A more challenging illustrated hidden-object activity with delayed, optional hints
- Four persistent freehand coloring pages that support touch, stylus, any color, brush sizing, and erasing
- A personalized blonde, fair-skinned, blue-eyed Annabeth avatar across all four outfits
- Ten non-repeating veterinary cases per care cycle, each with a visible ailment close-up, four equipment stages, tool-specific touch/mouse gestures, illustrated healing progress, spoken guidance, and worried-to-happy patient reactions
- Search hints wait a full minute before appearing and can be requested again after another minute
- Adventure unlock path with clear visual locks; discovered favorites remain permanently replayable
- Exploration-friendly rewards: first discoveries earn more, favorite replays still earn a small reward, and three different activities award a Variety Bonus plus a gem
- Educational mastery reporting across phonics, rhyming, sight words, double-digit numbers, visual arithmetic, patterns, and tracing
- Short modeled learning sessions with two or three playful rounds, keeping educational games substantial without turning them into long quizzes
- Research-aligned listening routines: a modeled first round, two independent practice rounds, spoken picture choices, shuffled answers, and immediate audio feedback; see `docs/literacy-design.md`
- Standards map and limitations for every academic activity; see `docs/academic-audit.md`

## Art direction

The original scene art is stored locally so the installed game works offline. Related activities reuse the same illustrated location and recurring patient, keeping the world visually coherent without requiring a separate large background for every question.
- Spoken instructions using the device's built-in Web Speech voice
- Adaptive challenge selection across ending sounds, middle sounds, rhyming, kindergarten sight words, and double-digit numbers
- Supportive hints rather than failure states
- Stars, gems, mission totals, and per-skill mastery stored locally
- Parent view with progress export, import, and reset
- Installable manifest and offline service worker
- No accounts, ads, analytics, or external data collection

## Project structure

- `index.html` — screens and accessible semantic structure
- `styles.css` — responsive landscape-first game presentation
- `app.js` — content, activity state machine, mastery, speech, and persistence
- `assets/` — local artwork and install icon
- `manifest.webmanifest` / `sw.js` — installation and offline support
- `docs/architecture.md` — expansion architecture and phased plan

For GitHub Pages, publish the repository root. Update the cache name in `sw.js` whenever a release changes cached files.
