# Clinic play redesign — September 22, 2026

## Why this pass was necessary

The clinic repeatedly rewarded moving a tool over a broad circle, even if the action did not resemble what a veterinarian would do. That made the magnifier and fox detangler particularly unconvincing. This pass changes the *cause and effect* of the interaction, not only its visual styling.

## What changed across all ten cases

| Step type | Player action | Visible response |
| --- | --- | --- |
| Magnifier, scanner, flashlight, dental mirror | Move the tool to three details on the actual ailment and examine each briefly. The magnifier shows a live enlarged view of the underlying patient art. | Each detail lights up and is checked off. Examination does not magically heal an injury. |
| Washing, brushing, polishing | Wipe the actual mark; movement elsewhere does not advance treatment. Multiple marks (tail leaves, mouth germs) resolve individually. | Dirt, leaves, germs, or the horn's dullness changes in the treated location. |
| Healing cream | Rub the cream into the affected area. | Small cream strokes appear where applied while the discomfort mark fades. |
| Cooling mist and fox detangler | Press and hold a bottle that points toward the affected area. Releasing pauses it. | Mist visibly travels onto the patient; smoke diminishes, or tail leaves loosen for the following brush step. |
| Stethoscope and thermometer | Hold the instrument steady in the correct anatomical place. | A pulsing heart or rising thermometer readout responds during the check. |
| Oral medicine | Move the medicine to Pip's mouth, then hold for gentle sips. | The flask tilts and empties; a tap alone does nothing. |
| Debris removal, drops, paste, dressings, injection, dental rinse | Keep their location-specific drag, place, dab, press, or spray gestures. | The relevant item moves, appears, fades, or is retained on the patient. |

Only the four tools in the current patient's treatment plan appear in the choice tray. Unrelated equipment is never offered as a random distractor.

## Verification

The isolated, muted browser playthrough completed all ten cases and all 40 care steps with rewards, mouse and touch hit tests, a tablet-portrait bounds check, and no browser errors. The test also checks that a click does not finish inspection or cleaning, the fox mist visibly emits droplets and pauses on release, and the magnifier uses the actual patient image. The offline cache version is `annabeth-hospital-v47`.

Screenshots (ignored by Git): `qa-care-0-inspection.png`, `qa-care-8-surface-spray.png`, `qa-care-8-after.png`, `qa-care-potion-ready.png`, `qa-care-heartbeat-matched.png`, `qa-care-letter-drawn.png`, `qa-care-number-drawn.png`, `qa-care-shape-repaired.png`, `qa-care-supplies-sorted.png`, and `qa-care-horn-rainbow-restored.png`.

## Other activities caught by the same audit

- The potion mixer no longer fills its bowl through five button taps. Annabeth drags five ingredients into the illustrated bowl and makes a full stirring circle. The recipe tray fills visually as each ingredient lands.
- The heartbeat check no longer accepts any four taps. Maple's pulse pattern is demonstrated; Annabeth taps as each heartbeat glows, with a replay button and forgiving timing. A generated Maple Bear exam scene replaces the unrelated dragon X-ray backdrop.
- The Maple scene is saved as `assets/maple-heartbeat-room.png`; the built-in image generator edited `assets/pip-xray-room.png` to replace the dragon/X-ray with Maple and a heartbeat monitor while preserving the existing clinic style.
- Letter Skywriting and Number Trails now require a drawn finger/stylus path through the guide points. Tapping dots does not advance them. Each replay chooses among three letters or numbers, rather than always showing the first one. A generated Treasure Cave scene with the panda companion replaces the castle backdrop for Number Trails (`assets/panda-treasure-cave.png`).
- Castle Shape Repair now requires dragging the chosen piece into the window; the matching window visibly fills. Animal Supply Sort requires moving each of six items into its corresponding basket, which retains the collected item icons.
- Unicorn Horn Repair no longer awards six color taps. Annabeth drags rainbow colors in order to Nova's horn; each color reveals another band within the original horn's calibrated outline. The base art itself remains aligned and stationary.
- The classic teeth-cleaning game now needs a short brushing motion on each plaque spot and a short polishing motion on each glowing tooth. Plaque fades progressively instead of disappearing on first contact.

These seven side adventures passed isolated, muted mouse playthrough checks; clicks alone cannot fill the potion, repair the window or horn, sort supplies, or write a letter, and off-beat taps do not advance the heartbeat. A child-led iPad playtest is still necessary to judge pacing, clarity, and entertainment value. Other older side adventures need a similar design review before the *whole app* can be called production-level.
