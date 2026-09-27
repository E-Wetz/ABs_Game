# Bonus outfit wardrobe-card backdrops — September 27, 2026

## Why

In the wardrobe picker, the original 14 outfits (Magic Doctor through Constellation Healer) each show a fun painted scene behind Annabeth — stars, a ballroom, a forest cabin, a sunset ranch, and so on. The 10 "bonus" outfits added later (Moonlight Wildlife Rescuer through Aurora Sky Doctor) show her floating on flat plain lavender instead, since those images were built as plain transparent cutouts for standing in the hospital-lobby scenes, not as wardrobe-card art. Confirmed by screenshot — it's a real, visible inconsistency, and since these are also the highest-value outfits (120–300 stars), they currently look the least finished despite being the biggest rewards.

## Important: these are new, separate files — not replacements

Each bonus outfit's existing transparent image (e.g. `assets/annabeth-complete-moonlight-v1.png`) is still needed exactly as-is — it's what makes her stand naturally in every building's lobby with no box around her. Adding a background into that same file would break that. So each prompt below asks for a **new file**, built by taking the exact existing character render and adding a painted scene behind her, the same way `panda-treasure-cave.png` or the hospital lobby were built by referencing existing art for style. The character herself should come through unchanged — same pose, same colors, same identity — only the backdrop is new.

Once these exist, wiring them in is a one-line change per outfit in `adventure.css` (pointing the wardrobe card's `--outfit-sheet` at the new `-card-v1.png` file while `lobbyAvatarCutouts` in `adventure.js` keeps using the original transparent file, untouched) — no other code changes needed.

## The 10 prompts

Each uses the same template: identity-preserve on the existing character image, precise-object-edit style (add a background, don't touch the character), matching the storybook-3D style and warm lavender-gold-turquoise palette used throughout the game, themed to that outfit's name.

### 1. Moonlight Wildlife Rescuer — save as `assets/annabeth-complete-moonlight-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-moonlight-v1.png` — keep Annabeth exactly as she appears (same pose, same colors, same identity, unchanged), and add a painted background behind her: a soft moonlit forest clearing at night, deep indigo sky, a few glowing fireflies, gentle silver moonlight through tree branches. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 2. Blossom Garden Veterinarian — save as `assets/annabeth-complete-blossom-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-blossom-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a blooming spring garden with pink and white blossom trees, soft daylight, a few petals drifting in the air. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 3. Dragon Flight Medic — save as `assets/annabeth-complete-dragonflight-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-dragonflight-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a warm dragon aerie ledge at sunset, deep teal cave walls glowing with amber firelight, distant clouds. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 4. Arctic Animal Doctor — save as `assets/annabeth-complete-arctic-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-arctic-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a bright, friendly snowy landscape, soft icy blues and whites, gentle falling snowflakes, a clear pale sky. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 5. Sunbeam Safari Veterinarian — save as `assets/annabeth-complete-safari-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-safari-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a warm golden savanna at sunrise, tall grass, a distant acacia tree silhouette, soft gold-orange light. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 6. Crystal Cavern Healer — save as `assets/annabeth-complete-crystal-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-crystal-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a glowing crystal cave, soft lavender and violet gem light, sparkling crystal clusters catching the light. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 7. Ocean Pearl Veterinarian — save as `assets/annabeth-complete-oceanpearl-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-oceanpearl-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a sunlit tide pool shore, soft teal-aqua water, gentle waves, a few seashells and pearls on the sand. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 8. Royal Rescue Captain — save as `assets/annabeth-complete-royalrescue-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-royalrescue-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a grand royal courtyard, soft purple-and-gold banners, warm afternoon light, a hint of castle architecture. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 9. Fairy Forest Veterinarian — save as `assets/annabeth-complete-fairyforest-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-fairyforest-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: an enchanted fairy-lit forest grove, soft green-and-gold glow, tiny floating sparkles of light among the leaves. Match the game's polished storybook-3D style. No text, logos, or watermark.

### 10. Aurora Sky Doctor — save as `assets/annabeth-complete-aurora-card-v1.png`

> Use case: precise-object-edit. Asset type: wardrobe-card background for an existing character render. Input image: `assets/annabeth-complete-aurora-v1.png` — keep Annabeth exactly as she appears, unchanged, and add a painted background: a night sky glowing with soft aurora ribbons in purple, teal, and pink, a few twinkling stars. Match the game's polished storybook-3D style. No text, logos, or watermark.

## Once these exist

Save each at its exact filename above, then tell me — I'll add a `--card-bg-sheet`-style rule per outfit in `adventure.css` pointing the wardrobe card at the new file (and add each to `sw.js`'s offline cache list). The transparent lobby-companion versions stay exactly as they are; nothing about the lobby, the outfit-unlock logic, or the avatar rendering changes.
