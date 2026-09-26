# Veterinary equipment art audit — September 23, 2026

Scope: every distinct tool in the ten active four-step care cases, at its actual kit-card size and while held or used. The gallery is `qa-equipment-audit.png`, generated in a muted, disposable browser by `tests/equipment-art.mjs`. Equipment is judged by its silhouette without requiring a child to read its label. A natural round lens or stethoscope diaphragm is part of the instrument; a decorative circle *around* an instrument is not.

| Equipment | Kit depiction | In-use depiction | Audit result |
| --- | --- | --- | --- |
| Magnifier | Gold-rimmed lens and handle | Moveable lens that reveals the condition | Recognizable; the live lens must stay round to magnify. |
| Star tweezers | Enlarged open tweezers | Open/closed illustrated tweezers | Recognizable tips and two arms. |
| Cleaning sponge | Yellow porous sponge | Same sponge at contact | Recognizable. |
| Soft bandage | Mint paw-print dressing | Same dressing dragged and placed | Recognizable as a wrap, not a free-floating symbol. |
| Flashlight | Gray barrel, bezel, and light | Same torch with a beam into the ear | Replaced emoji. |
| Cotton puff (ear) | Irregular white cotton puff | Same puff wiping visible debris | Replaced the inconsistent held swab stick. |
| Magic drops | Bulb, pipette, bottle, and drop | Same dropper at contact | Redrawn from generic bottle. |
| Soft brush | Bristles and handle | Same brush on fur/tail | Recognizable. |
| Stethoscope | Earpieces, Y branches, tubing, diaphragm | Enlarged instrument, diaphragm at examination site | Rebuilt in prior pass; no wrapper circle. |
| Thermometer | Stem, scale, bulb | Instrument held steady with a numeric readout | Recognizable, no wrapper circle. |
| Cotton puff (prep) | Irregular white puff | Same puff on skin | Recognizable. |
| Medicine syringe | Illustrated barrel, needle, and plunger | Same syringe in the guided make-believe injection | Recognizable; only a grown-up vet gives real injections. |
| Gentle wash | Pink soap bar with suds | Soap at muddy site | Recognizable. |
| Healing cream | Squeezable ointment tube and cap | Same tube at contact | Redrawn from carton-like shape. |
| Cooling mist | Trigger sprayer with bottle and nozzle | Playable sprayer directed toward Pip's nose | Redrawn kit; active sprayer has a matching bottle silhouette. |
| Medicine potion | Glass dosing vial, spout, and medicine mark | The same vial tilts toward the mouth and visibly empties | Redrawn from carton-like shape. |
| Magic scanner | Slim wand with glowing end | Same wand on horn | Readable as a fictional scanner, not a real medical instrument. |
| Soft polisher | Handled, soft buffing pad | Same pad on horn | Redrawn from a plain puck. |
| Healing crystal | Three faceted crystals without a background disk | Same transparent SVG dragged onto horn | Removed the decorative circular backing. |
| Comfort ribbon | Pink bow | Same bow placed at finish | Recognizable. |
| Support wrap | Purple hoof dressing | Same wrap dragged and placed | Recognizable. |
| Detangling spray | Trigger sprayer with pink liquid | Active bottle sprays visibly toward tail | Redrawn kit; action points at the affected tail. |
| Dental mirror | Small angled round mirror on a long thin handle | Same mirror reveals tiny tooth bugs | Redrawn from a magnifying-glass-like mirror. |
| Sparkle paste | Squeezable toothpaste tube with cap | Same tube places paste | Redrawn from carton/diamond-like shape. |
| Toothbrush | Pink handle and bristled head | Matching brush scrubs the mouth | Replaced tray emoji. |
| Magic rinse | Trigger sprayer with mint liquid | Active nozzle sends mist into the enlarged mouth | Redrawn kit; spray direction verified in browser. |

All 26 kit choices now render SVG or transparent artwork, with no emoji stand-ins. All used held tools have pictured artwork rather than a generic icon. The tool card is a rounded rectangular button for tapping, but the equipment itself is not drawn inside a circular badge.

Verification: `node tests/equipment-art.mjs` checks all 26 images/SVGs load and no emoji stand-ins remain; `node tests/care-clinic.mjs` drives all ten cases and checks the actual three-choice kits and held tools. The full case run passed with zero browser errors and all 539 offline assets; a later focused Sugar-Bug Tooth run passed after the small-head dental-mirror refinement. This is visual/interaction QA, not a veterinary medical endorsement or a substitute for Annabeth's real iPad playtest.
