# Bunny shot and localized brushing

September 20, 2026. Supersedes the blanket and single-germ details in BASE_IMAGE_IMPLEMENTATION.md.

## Changes

- The old `cozy-blanket.png` looked like underwear when placed on the bunny. It was used only in Rumbly Tummy. Removed the blanket from that case and from selectable tools; the original file remains on disk, but is no longer precached.
- Rumbly Tummy now follows stethoscope, thermometer, cleaning pad, then a vet-chosen medicine shot. This replaces the oral potion as well as the blanket so the game does not arbitrarily stack two medicines. The discomfort mark stays until the shot progresses.
- The syringe is reusable: `careTools.syringe`, the `injection` input family, and `assets/syringe.png`. Additional cases would need a deliberately chosen treatment plan and calibrated target; it is not automatically substituted for bandages or wraps.
- Drag the syringe to the prepared spot. It locks in place with its tip at the target. Hold the pink plunger with mouse, touch, or Space/Enter to advance; releasing pauses. The plunger art slides inward, the symptom fades, and the syringe withdraws after completion. Merely clicking, dragging, or rubbing does not administer the shot.
- Four separate small sugar-bug sprites replace the single large germ. Each has independent local brushing progress and a small idle wiggle. Brushing outside the mouth does nothing; brushing one germ does not clear its neighbors. Each disappears as its own area is brushed.
- Dental sequence is mirror, toothpaste, toothbrush, rinse. Paste guides are mouth-sized. The brush has a moving bristle head and brushing creates small bubbles and completion sparkles. Reduced-motion settings disable nonessential idle/bristle animations.
- Patient portraits become happy after the final step, not while the last treatment is still outstanding.

## Dynamic effects and limits

Tools follow mouse/finger movement. Wiping creates bubbles and fades the associated dirt overlay; mouth germs now clear locally rather than all fading together. Removed debris travels to its tray. Cream fills at held targets. Syringe placement and its plunger are distinct interactions. Completed dressings remain visible.

The large animal illustrations are still static background plates, not animated/rigged characters. Dirt fading is an opacity effect, not a pixel-by-pixel scrub mask. The separate small emotion portrait changes expression with progress. These distinctions matter: this is interactive layered artwork, not a fully animated animal simulation.

## Medical framing

The introductory line explicitly frames the medicine as selected by a vet and reminds the child that only a grown-up vet gives real shots. No drug, dose, real injection technique, or universal tummy-ache cure is taught. The skin target is a broad cartoon shoulder/side area, not a medical training diagram.

[PDSA's rabbit appetite guidance](https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/symptoms/my-rabbit-isn-t-eating-properly) emphasizes veterinary assessment and cause-dependent treatment. That informs the pretend-play framing; it does not clinically validate this simplified four-step game.

## Artwork record

Built-in image-generation mode, not CLI/API fallback. Saved asset: `assets/syringe.png` (2172 x 724 PNG). Original generated alpha is preserved; runtime CSS clips the stationary body and moving plunger from this one sprite. Visually inspected in the game.

Final generation prompt:

> Use case: stylized-concept. Asset type: transparent PNG game-tool sprite for a polished, gentle kindergarten veterinary game. Generate ONE syringe, perfectly horizontal pointing LEFT, orthographic side view, centered in a wide 3:1 canvas. Genuinely transparent background with alpha, no checkerboard drawn. Soft rounded 3D storybook rendering, pastel teal barrel accents, pale aqua translucent barrel, white/pink plunger. Needle very short, thin, silver and non-threatening at left; no blood or patient or hand. Syringe tip begins around x8%, y50%; barrel spans x25% to x64%; finger flange at x65%; exposed straight white plunger rod from x66% to x84%; rounded pink thumb button at x88%. All on same horizontal axis. Plunger must be drawn extended, ready to press left into barrel; clearly separate straight rod to allow runtime animation via clipping. Small unlabelled ticks on barrel, NO words, NO numerals or dosage, no other objects, no cast shadow on a surface, clean alpha edges. Friendly but clearly recognizable as a syringe, not a water pistol.

## Voice-pack additions

The concurrently added voice pack and player were not changed in this pass. These new/changed strings need recordings to avoid the existing device-speech fallback:

- Bramble needs a checkup. The vet has chosen medicine to help him feel better. Only a grown-up vet gives real shots.
- Little sugar bugs are hiding in Bramble's mouth. Let's brush them away.
- Cleaning pad. Wipe the little spot clean.
- Vet's medicine shot. Move the shot to the glowing spot. Then hold the pink plunger.
- Hold the pink plunger. Nice and steady.
- Let's try the cleaning pad!
- Let's try the vet's medicine shot!
- Step three. Let's use the cleaning pad.
- Step four. Let's use the vet's medicine shot.
- Step two. Let's use the sparkle paste.
- Step three. Let's use the toothbrush.

## Tests and previews

Full regression passed: all ten cases / 40 steps and rewards, native mouse/touch checks, 519 precache files present (including the concurrently installed voice pack), and no reported browser errors. JavaScript syntax and diff whitespace checks passed. Service-worker version for this update: `annabeth-hospital-v39`.

`node tests/care-clinic.mjs` covers all ten cases. Focused run in PowerShell: `$env:CARE_QA_CASES='2,9'` followed by the same command (remove that environment variable to restore all cases).

New assertions cover four small germs, brushing outside the mouth, cleaning one germ independently, incorrect shot placement, no injection on docking, partial mouse presses, release-to-pause, and native touch resume. Tests use an isolated muted browser/profile, not Annabeth's save.

Generated previews: `qa-care-2-shot.png`, `qa-care-2-after.png`, `qa-care-9-before.png`, `qa-care-9-partly-brushed.png`, and `qa-care-9-after.png`.

Physical iPad/Safari testing remains necessary.
