> **Superseded:** the companion idea changed from Lemon the dog to the baby unicorn from the title screen — see `docs/UNICORN_FOAL_COMPANION_ART_PROMPT_2026-09-27.md` instead. Left here only for history.

# Lemon the companion — art needed, September 27, 2026

## What this unlocks

A new gem-based reward, separate from the star-based outfit system: once Annabeth has collected 10 gems (the rarer currency, earned only from the "variety bonus" for playing 3 different games in a row), Lemon — the real 13-year-old golden retriever — appears standing beside her in every building's lobby, permanently, from then on. Code side is done (`companions` array + `companionUnlocked()` check in `adventure.js`, `.lobby-companion` positioning in `adventure.css`) — it's wired to render `assets/lemon-companion.png` automatically the moment that file exists, exactly like the other graceful-fallback art in this game. Nothing else to change once the image is in place.

## One question before writing the final prompt: do you have a photo of Lemon?

Every other character in this game (Annabeth herself, Fern, Bramble) was built in "identity-preserve" mode — the image generator was given a real reference image and told to keep the exact identity/likeness while changing only style or pose. If you have a clear photo of Lemon (a few, ideally: face straight-on, and a side/full-body shot), I can write a much better prompt that actually looks like *your* dog rather than a generic golden retriever. If not, I'll write a generic-but-warm senior-golden-retriever prompt instead — still fine, just less personal.

## Draft prompt (generic version, use as a starting point if no photo is supplied)

> Use case: stylized-concept. Asset type: production game character render, transparent sticker overlay. Create a warm, friendly senior golden retriever, about 13 years old — a slightly graying muzzle, soft kind eyes, relaxed happy expression, sitting calmly. Match the game's polished storybook-3D rendering style (same style register as Fern the fox and Bramble the bunny — rounded, friendly proportions, soft fur texture, gentle lighting), not a photorealistic render. Full body visible, sitting pose, facing slightly toward camera-left as if looking up at someone standing beside her. Truly transparent alpha background, clean silhouette including fine fur detail. No text, logos, watermark, collar tags with readable text, leash, or other characters.

## If you do have a photo: identity-preserve version

> Use case: identity-preserve. Asset type: production game character render, transparent sticker overlay. Input image is the exact dog's identity reference — a real golden retriever named Lemon, 13 years old. Preserve her real coloring, face shape, ear shape, and any distinguishing markings exactly, but render her in the game's polished storybook-3D illustrated style (same style register as Fern the fox and Bramble the bunny in this game — rounded friendly proportions, soft fur texture, warm gentle lighting), not photorealistic. Show her sitting calmly, full body visible, gentle happy expression appropriate for her age (soft eyes, slightly graying muzzle if visible in the reference), facing slightly toward camera-left as if looking up at someone standing beside her. Truly transparent alpha background, clean silhouette including fine fur detail. No text, logos, watermark, collar tags with readable text, leash, or other characters.

Save either version as `assets/lemon-companion.png`. Once it's there, tell me and I'll add it to the offline cache list — that's the only remaining step.
