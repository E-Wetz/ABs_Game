# Annabeth's Magical Animal Hospital — audio handoff for Claude

## September 26 continued — found and fixed the actual source of robotic voice on the map

The parent reported hearing computer-sounding speech on the main map at game start. Root cause: `speakChapter()` (fired the moment the world/map screen opens on chapter 1, i.e. at the very start of a fresh game) had no `recordedOnly` guard, and its two lines (the chapter intro + "The glowing place on the map is X...") were never actually recorded. Missing `recordedOnly` means the code's designed fallback kicks in — browser `speechSynthesis` — which is exactly the "computer sounding" voice reported. This is a different, more serious class of bug than a simple missing recording: it's a missing safety guard that let the game's own core rule ("never robotic speech in the child's play path") get silently violated.

A full sweep of every `.speak(...)` call in `adventure.js` found **13 more call sites with the same missing guard**: the map chapter/stop narration, both locked-game/locked-outfit "more stars to unlock" hints, the shared `narrate()` and `good()` helpers used across most learning games, the potion-recipe replay button, four wrong-answer/round-start lines in the learning games, the "One full ten!" nest-building line, and the star/gem reward line. All 13 now pass `{recordedOnly:true}`. Verified directly (not just by reading the code) by instrumenting `speechSynthesis.speak` in a real headless Chrome session and confirming zero calls while opening the map, tapping a locked game, and starting a learning activity — previously this reproduced robotic speech every time. The full `tests/care-clinic.mjs` regression still passes all ten cases after this change.

This does **not** add any new recordings — lines that were already silent (no clip) stay silent, exactly as designed elsewhere in this file. It only stops those same gaps from being audible as robot voice. The map's chapter/stop lines (MAP-01–10) are still unrecorded and now correctly silent; they remain on the list below.

**Practical implication for anyone reviewing "the audio isn't done yet" reports:** a silent line is an expected, tracked gap (see the tables in this file). A *computer-voiced* line is always a code bug — the guard is missing somewhere — and should be reported as such rather than assumed to be a recording gap.

## September 26 — verified, complete gap audit (supersedes guesswork in older entries below)

A script cross-checked every spoken line the ten live veterinary cases can actually generate (on-pick, delayed "Step N" hint, and wrong-tool nudge for all 4 steps × 10 cases, plus each case's spoken intro) against the packaged `assets/voice/index.json`, using the same word-matching logic the game itself uses. This is a full accounting, not a sample.

**Fixed for free (no new recording needed), already done in code:**
- Bramble's Sugar-Bug Tooth: the plan order was `mirror → toothpaste → toothbrush → rinse`, but the existing recordings (VO092–VO095) assumed `mirror → toothbrush → toothpaste → rinse`. Every step past the mirror was silently unreachable. Reordered the code to match the recordings — no re-recording required. This was the "audio drops after the first one" bug reported for this case.

**Genuinely still silent — needs new `af_heart` recordings (confirmed by direct testing, not guessed):**

| Case | Step | Tool | Missing lines |
| --- | --- | --- | --- |
| Fern — Prickly Paw | step 3 | cleanser | On-pick, delayed hint, wrong-tool. The tool was renamed from "cleaning bubbles"/"clean the sore spot" to "cleaning sponge"/"wipe the sore spot" (a deliberate fix for the parent's "doesn't read as a cleaning implement" complaint) after the original recording pass, so the old clips no longer match. This is a new gap introduced by that rename, not a pre-existing one. |
| Fern — Itchy Ear | step 1 | otoscope | On-pick, delayed hint, wrong-tool (already tracked as VET-19–21 below; confirmed still missing) |
| Bramble — Rumbly Tummy | step 4 | syringe | On-pick (`vet's medicine shot. Move the shot to the glowing spot. Then hold the pink plunger.`), delayed hint (`Step 4. Let's use the vet's medicine shot.`), wrong-tool (`Let's try the vet's medicine shot!`). VET-01 below only covers a separate mid-action cue, not these three. |
| Bramble — Rumbly Tummy | step 3 | prep | Delayed hint only (`Step 3. Let's use the cotton puff.`) — the on-pick and wrong-tool lines for cotton puff are already covered by an older recording. Reordering the plan to fix this would break the already-working thermometer hint instead (no "step three...thermometer" clip exists), so this is left as a genuine, low-severity gap: the nudge is silent only if the child hasn't picked a tool within 350ms, but the on-pick confirmation still speaks normally once she does. |
| Pip — Scraped Scale | step 3 | stitches | On-pick, delayed hint, wrong-tool (already tracked as VET-22–24 below; confirmed still missing) |
| Nova — Tired Hoof | step 2 | hoofbrush | On-pick, delayed hint, wrong-tool (already tracked as VET-25–27 below; confirmed still missing) |
| Nova — Tired Hoof | step 3 | coolpack | On-pick, delayed hint, wrong-tool (already tracked as VET-28–30 below; confirmed still missing) |

Every other case, tool, and step in the current ten-case rotation is fully covered. The map's six "[Place]. Choose a picture to play." lines (MAP-11–16) are also still unrecorded — confirmed by the same audit, matches the existing entry below.

The stale case-plan table in section 2 below (row for Prickly Paw) still says "cleaning bubbles" — that reflects the original recording, not the current on-screen tool name. Do not record against that row; use "cleaning sponge" / "Wipe the sore spot" instead, per the table above.

**Status:** canonical recording brief, September 23, 2026  
**Voice:** `af_heart` (warm, natural, gentle storybook voice; never browser speech for child-facing lines)  
**Base transcript:** [`RECORDING_SCRIPT.md`](RECORDING_SCRIPT.md) contains the existing full 460-line recording script.  
**Packaged clips:** `assets/voice/index.json` maps the already-recorded lines to `VO###_*.mp3` files.

This handoff is the current-runtime supplement and correction list. Claude should use the base script for all unchanged lines, then record the additions and replacements below. Do not silently revive retired games or old wording. If a line is marked **NEW**, create a new stable clip and add it to the voice manifest; if marked **REPLACE**, retire the old clip after the new one is wired.

## Recording rules

- Read the text exactly as written. Keep the voice upbeat, calm, and clear for a nearly-six-year-old who cannot read yet.
- Record one clean clip per line, with no music or sound effects baked in. Leave roughly 300 ms of room tone at each end; do not concatenate clips in the recording.
- Keep short pauses where an ellipsis appears. Do not rush number names, letter sounds, or the word “stethoscope.”
- Child-facing clinic, map, and activity lines must resolve to packaged `af_heart` clips. Browser `speechSynthesis` is an adult preview/fallback only and must not be used in the child's play path.
- Keep praise short enough that it never overlaps the next round. Tool names should be spoken before the action, not after it.

## 1. Current map and home narration (NEW)

These lines are now spoken by the interactive six-stop map. Record each chapter line as a single clip, then the map sentence as a separate clip so the map can change without rerecording the story.

| ID | Exact line | Trigger |
| --- | --- | --- |
| MAP-01 | `The magical hospital is open! Fern, Bramble, and Nova need Doctor Annabeth's help.` | Chapter 1 begins |
| MAP-02 | `Oh no! Nova's rainbow magic scattered across the kingdom. Help the animals find it.` | Chapter 2 begins |
| MAP-03 | `The royal animal parade starts soon. Help everyone get ready to celebrate.` | Chapter 3 begins |
| MAP-04 | `Doctor Annabeth is the kingdom's magical healer. Choose any friend to help today!` | Chapter 4 begins |
| MAP-05 | `The glowing place on the map is Animal Hospital. Tap any place to choose an adventure.` | Current stop is Animal Hospital |
| MAP-06 | `The glowing place on the map is Enchanted Forest. Tap any place to choose an adventure.` | Current stop is Enchanted Forest |
| MAP-07 | `The glowing place on the map is Art Studio. Tap any place to choose an adventure.` | Current stop is Art Studio |
| MAP-08 | `The glowing place on the map is Dragon Cave. Tap any place to choose an adventure.` | Current stop is Dragon Cave |
| MAP-09 | `The glowing place on the map is Unicorn Stable. Tap any place to choose an adventure.` | Current stop is Unicorn Stable |
| MAP-10 | `The glowing place on the map is Royal Castle. Tap any place to choose an adventure.` | Current stop is Royal Castle |
| MAP-11 | `Animal Hospital. Choose a picture to play.` | Map stop opened |
| MAP-12 | `Enchanted Forest. Choose a picture to play.` | Map stop opened |
| MAP-13 | `Art Studio. Choose a picture to play.` | Map stop opened |
| MAP-14 | `Dragon Cave. Choose a picture to play.` | Map stop opened |
| MAP-15 | `Unicorn Stable. Choose a picture to play.` | Map stop opened |
| MAP-16 | `Royal Castle. Choose a picture to play.` | Map stop opened |
| MAP-17 | `Hello, Doctor Annabeth! Your magical animal friends are ready for an adventure.` | Voice preview / parent view |

The old “rainbow magic” line must not replay every time the player returns home. Home should use a quiet looping music bed; narration begins only when a new chapter or map stop is entered.

## 2. Veterinary clinic: current case and tool audio

The base script's case introductions (lines 6–16), 26 tool prompts (17–41), wrong-tool prompts (42–66), step announcements (67–95), and finish lines (96–100) remain valid **only where the current care plan still uses that tool**. The ten active plans are:

| Case | Spoken introduction | Current four-step plan |
| --- | --- | --- |
| Fern — Prickly Paw | `Fern found prickles on her paw. Let's help her feel comfortable again.` | magnifier → star tweezers → cleaning bubbles → soft bandage |
| Fern — Itchy Ear | `Fern keeps shaking one ear. Let's find out why it feels itchy.` | otoscope → cotton puff → magic drops → soft brush |
| Bramble — Rumbly Tummy | `Bramble's tummy is making funny rumbles. Let's give him a careful checkup.` | stethoscope → thermometer → prep → syringe |
| Bramble — Muddy Paw | `Bramble slipped into a muddy puddle and his paw needs gentle care.` | magnifier → gentle wash → healing cream → soft bandage |
| Pip — Smoky Sneezes | `Every time Pip sneezes, a tiny smoke cloud pops out. Let's cool it down.` | thermometer → stethoscope → cooling mist → medicine potion |
| Pip — Scraped Scale | `Pip bumped one shiny scale while practicing his flying.` | magnifier → gentle wash → guided stitches → soft bandage |
| Nova — Dim Horn | `Nova's horn has lost its rainbow sparkle. Let's restore the magic.` | magic scanner → soft polisher → healing crystal → comfort ribbon |
| Nova — Tired Hoof | `Nova danced all morning and one hoof feels tired.` | magnifier → hoof brush → soft cool pack → support wrap |
| Fern — Tangled Tail | `The wind tangled leaves into Fern's fluffy tail.` | magnifier → detangling spray → soft brush → comfort ribbon |
| Bramble — Sugar-Bug Tooth | `Little sugar bugs are hiding in Bramble's mouth. Let's brush them away.` | dental mirror → sparkle paste → toothbrush → magic rinse |

### New/replacement clinic lines

| ID | Exact line | Trigger |
| --- | --- | --- |
| VET-01 | `Hold the pink plunger. Nice and steady.` | Syringe is in the correct glowing spot |
| VET-02 | `The medicine is helping Bramble's tummy settle.` | Shot completes |
| VET-03 | `The temperature is rising. Hold still and watch the number.` | Thermometer first contacts the measurement site |
| VET-04 | `All done. The thermometer says thirty-eight point one degrees.` | Thermometer reaches its final reading |
| VET-05 | `A little sip. Keep the potion tipped toward Pip's mouth.` | Medicine vial is held at the mouth |
| VET-06 | `Pip swallowed! One more gentle sip.` | Each successful medicine sip before the last |
| VET-07 | `The last sip is in. Pip can breathe more easily now.` | Medicine step completes |
| VET-08 | `Drag the cotton puff across the itchy spot.` | Fern's ear step begins |
| VET-09 | `The dirt is coming away. Keep wiping gently.` | Ear dirt is contacted and starts clearing |
| VET-10 | `A soft mist into the open mouth.` | Dental rinse begins |
| VET-11 | `The sugar bugs are disappearing, one by one.` | Dental rinse clears a group of bugs |
| VET-12 | `Every sugar bug is gone. Bramble's teeth sparkle!` | Dental rinse completes |
| VET-13 | `Use the tweezers to lift the prickle, then let go.` | Prickly Paw action cue |
| VET-14 | `Wipe the muddy paw until the brown marks fade.` | Muddy Paw action cue |
| VET-15 | `Rub the cream over the sore spot.` | Healing cream action cue |
| VET-16 | `Polish the horn in small circles. Look at that rainbow shine!` | Dim Horn polish step |
| VET-17 | `The scanner found the dim place at the base of the horn.` | Horn scan finds the condition |
| VET-18 | `A real dental mirror lets us look at the teeth.` | Dental mirror selected |
| VET-19 | `Step one. Let's use the otoscope.` | Fern's Itchy Ear, first step |
| VET-20 | `otoscope. Look gently inside the ear.` | Otoscope chosen |
| VET-21 | `Let's try the otoscope!` | Otoscope wrong-tool nudge |
| VET-22 | `Step three. Let's use the stitching tool.` | Pip's Scraped Scale, third step |
| VET-23 | `stitching tool. Guide the thread across the little cut.` | Stitching tool chosen |
| VET-24 | `Let's try the stitching tool!` | Stitching tool wrong-tool nudge |
| VET-25 | `Step two. Let's use the hoof brush.` | Nova's Tired Hoof, second step |
| VET-26 | `hoof brush. Brush the dusty hoof.` | Hoof brush chosen |
| VET-27 | `Let's try the hoof brush!` | Hoof brush wrong-tool nudge |
| VET-28 | `Step three. Let's use the soft cool pack.` | Nova's Tired Hoof, third step |
| VET-29 | `soft cool pack. Hold the cool pack gently on the tired hoof.` | Cool pack chosen |
| VET-30 | `Let's try the soft cool pack!` | Cool pack wrong-tool nudge |

**Audio gap:** VET-19 through VET-30 are not in the current voice manifest. The runtime intentionally uses `recordedOnly` for these tool prompts, so they are silent until new natural `af_heart` recordings are packaged. Do not replace them with browser speech. The guide instructions visible on-screen are `Start at each little star. Guide the stitching tool across the cut.` and the otoscope's ear-finding view. These should also be recorded in the final child-facing narration pass. The retired Heartbeat Check activity should not be recorded or wired again.

If a tool is selected incorrectly, use the existing “Let's try the [tool]!” clips. Do not add a generic circle-target line. The implement itself and the condition art explain the gesture.

## 3. Activity opening and repeatable-round audio

The existing base script contains the original opening, feedback, literacy, counting, tracing, and reward lines. The current runtime repeats the task speech on rounds 2 and 3, so record the following templates with the variable portions as separate clips where possible:

| ID | Exact line/template | Used by |
| --- | --- | --- |
| ROUND-01 | `Round one.` | Any three-round activity, optional transition |
| ROUND-02 | `Round two.` | Any three-round activity |
| ROUND-03 | `Round three.` | Any three-round activity |
| ROUND-04 | `One full ten! Now add the extra ones.` | Magic Number Nests |
| ROUND-05 | `Count the eggs. Which nest has more eggs?` | Dragon Egg Nursery |
| ROUND-06 | `Count the eggs. Which nest has fewer eggs?` | Dragon Egg Nursery |
| ROUND-07 | `Build [NUMBER]. Fill one nest with ten eggs, then add [NUMBER] more.` | Magic Number Nests; record 11–19 as full clips |
| ROUND-08 | `Find the [SHAPE]. Tap it to repair the window.` | Castle Shape Repair |
| ROUND-09 | `Find the [SHAPE]. Tap it or move it into the window.` | Castle Shape Repair drag/tap cue |
| ROUND-10 | `Which [ITEM] is longer?` / `Which [ITEM] is shorter?` / `Which potion bottle holds more?` | Magical Measuring Room |
| ROUND-11 | `Where does this belong? Food, care tools, or play things?` | Animal Supply Sort |
| ROUND-12 | `Start at the star. Follow the dots to write [GLYPH].` | Letter Skywriting and Number Trails |
| ROUND-13 | `[GLYPH] is glowing!` | Letter Skywriting and Number Trails success |
| ROUND-14 | `Your trail is glowing!` | Legacy free-trace fallback only |

### Literacy and math lines that must remain natural

Keep every line in sections 9–14 of `RECORDING_SCRIPT.md`, including the six end/middle-sound examples, sight words, double-digit numbers, three Bunny Hop Math problems, three Royal Pattern Parade prompts, and the single-sound clips. The code now chooses three varied tasks per session for Forest Sounds, Word Treats, Number Stable, Bunny Hop Math, and Royal Pattern Parade; record every task in the challenge tables, not only the first task shown in the old script.

For phonics, say sounds rather than letter names when the line says “sound”: `/k/`, `/t/`, `/s/`, `/f/`, `/n/`, `/sh/`, and the short vowel sounds. Leave a small pause between phonemes in blending lines.

## 4. Games removed or pending removal — do not make new clips

These names remain in older recordings or stale documentation but are not part of the desired current experience:

- Sound Bridge — delete the card and its playback path.
- Word-Cracker Eggs — delete the three-tap one-round game.
- Rhyme Garden — delete the standalone world activity. Keep rhyming practice only if it remains embedded in a current kindergarten learning challenge.
- Heartbeat Check — parent found that four taps ignored the cadence. Remove it from the map and progression unless the mechanic is redesigned to require matching the rhythm.

Mark old clips for these activities as **legacy / do not wire** rather than rerecording them.

## 5. Dentist and classic games

The dentist wording in base-script lines 282–292 remains current, with these replacements for the repaired flow:

| ID | Exact line | Trigger |
| --- | --- | --- |
| DENT-01 | `Tap the sparkly tooth to check Bramble's smile.` | Dental game opens |
| DENT-02 | `The mirror found the sugar bugs. Brush every glowing tooth.` | Mirror inspection completes |
| DENT-03 | `Move the toothbrush over every bug. Keep the brush on the teeth.` | Brushing phase |
| DENT-04 | `The sugar bugs are gone. Add tiny paste dots for the sparkle finish.` | Toothbrush phase completes |
| DENT-05 | `Rinse the magic mist into the open mouth.` | Rinse phase |
| DENT-06 | `Hooray! Bramble's smile sparkles. Wonderful work, Doctor Annabeth!` | Dentist complete |

Keep the Tic-Tac-Toe lines in base-script 293–296. The game remains replayable; do not award a one-time-only completion.

## 6. Search, X-ray, potion, and coloring notes

- Enchanted Search uses three different scenes and asks for five of six objects per scene. Existing “You found the [object]!” and one-minute hint lines remain valid; record each object noun as a clean replacement clip if the current manifest lacks it.
- X-Ray Detective now uses a larger scanner beam, six possible layouts, and three steady scans. Keep the existing key/button/bell find lines, but add: `Move the scanner slowly across Pip's tummy. Hold it still when the glow appears.` and `You found all three treasures! Pip's tummy is clear.`
- Potion Mixer now offers distractor ingredients and three randomized rounds. Keep the recipe sentence as a spoken-only prompt; do not label the correct ingredients in text. Add: `Listen carefully. Only some of these ingredients belong in the potion.` and `Stir the potion in a big gentle circle.`
- Magical Coloring has twelve pages and a full-screen finger/stylus canvas. Add: `Choose a color, then draw anywhere on the picture.` and `Use the picture button to see the whole page, or the hand button to slide across it.` These are adult-readable accessibility labels too, but the spoken clip should be child-friendly.

## 7. Rewards and outfit audio

Use the existing reward clips in `RECORDING_SCRIPT.md` lines 278–280, but correct singular grammar:

- `Wonderful work, Doctor Annabeth! You earned one star.`
- `Wonderful work, Doctor Annabeth! You earned four stars.`
- `Wonderful work, Doctor Annabeth! Variety bonus! You earned five stars and a magic gem.`
- `Wonderful work, Doctor Annabeth! Variety bonus! You earned eight stars and a magic gem.`

For the current complete-look wardrobe, record each outfit name from the existing list (Doctor Coat, Mint Scrubs, Royal Dress, Forest Vest, Art Smock, Sparkle Scrubs, Royal Healer, Starry Veterinarian, Rainbow Rescuer, Forest Veterinarian, Unicorn Stable Jacket, Royal Parade Healer, Cozy Unicorn Pajamas, Ocean Animal Doctor, Rainbow Art Smock) only if the UI announces it. The wardrobe is now a small set of polished complete illustrations; do not record the retired floating accessory-layer names as unlock promises.

## 8. Delivery checklist for Claude

1. Start from the exact lines in `RECORDING_SCRIPT.md`; do not paraphrase unchanged educational prompts.
2. Record every **NEW** line above and every changed current task in the challenge data.
3. Generate deterministic slugs such as `MAP-05_the-glowing-place-is-animal-hospital.mp3` and preserve the existing `VO###_` files for unchanged lines.
4. Update `assets/voice/index.json` and the manifest CSV together. A missing clip must be reported as missing; never silently route a child-facing line to browser TTS.
5. Keep each clip short, avoid overlapping praise and instructions, and test the complete muted playthrough after wiring.
6. Retain old clips in the archive until the code no longer references them; mark retired activities clearly so they cannot be accidentally reintroduced.
