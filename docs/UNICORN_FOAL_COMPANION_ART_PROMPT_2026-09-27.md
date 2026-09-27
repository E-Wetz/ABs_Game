# Companion swap: baby unicorn instead of Lemon — September 27, 2026

Replaces `docs/LEMON_COMPANION_ART_PROMPT_2026-09-27.md` — same gem-unlock feature, different companion. Instead of the real dog, it's the small lavender baby unicorn already drawn on the far right of `assets/title-screen-poster.png`, standing next to her mother Nova. Code is updated: `companions` in `adventure.js` now points at `{id:"unicornfoal",name:"Star",gems:10,file:"unicorn-foal-companion.png"}` — I picked "Star" as a placeholder name since the foal doesn't have one yet (she has small star markings on her coat in the reference art); happy to use a different name if you'd rather.

Same mechanic as before: once 10 gems are collected, she appears standing beside Annabeth in every building's lobby, permanently. Nothing else to change once the image exists at `assets/unicorn-foal-companion.png`.

## Prompt

> Use case: precise-object-edit. Asset type: transparent sticker overlay, isolated from an existing illustration. Reference image: `assets/title-screen-poster.png` — specifically the small lavender baby unicorn on the far right of the scene, standing beside the larger unicorn (Nova). Recreate just that baby unicorn: same coloring (soft lavender coat, deeper purple mane and tail, small gold horn, faint star markings on her coat), same size, proportions, pose, and camera angle as she appears in that reference, same polished storybook-3D style and soft lighting. Isolate just her — no mother unicorn, no background, no other characters — on a truly transparent alpha background, cropped tightly to her silhouette so she can be placed standing beside Annabeth in other scenes. No text, logos, or watermark.

Save as `assets/unicorn-foal-companion.png`. Once it's there, tell me and I'll add it to the offline cache list — that's the only remaining step.
