# Artwork batch: unicorn companion, updated map, Party Garden building — September 27, 2026

Everything needed for three linked features, in one file so it can all be commissioned together:

1. The gem-unlocked companion is the baby unicorn from the title screen (replacing the earlier Lemon-the-dog idea).
2. The map needs a 7th building added for "Party Garden" — a real building she walks into, not a popup menu.
3. Party Garden is a real lobby (like every other building) where she taps a themed prop to choose party decorations — birthday first and free, the rest locked behind gems.

Nothing in this file has been generated yet. Once each image exists at its exact filename below, tell me and I'll wire it in (each is a small, already-planned code change — the game already knows how to gracefully wait for art that isn't there yet).

---

## 1. Baby unicorn companion — save as `assets/unicorn-foal-companion.png`

Once she's collected 10 gems, this unicorn appears standing beside Annabeth in every building's lobby, permanently.

> Use case: precise-object-edit. Asset type: transparent sticker overlay, isolated from an existing illustration. Reference image: `assets/title-screen-poster.png` — specifically the small lavender baby unicorn on the far right of the scene, standing beside the larger unicorn (Nova). Recreate just that baby unicorn: same coloring (soft lavender coat, deeper purple mane and tail, small gold horn, faint star markings on her coat), same size, proportions, pose, and camera angle as she appears in that reference, same polished storybook-3D style and soft lighting. Isolate just her — no mother unicorn, no background, no other characters — on a truly transparent alpha background, cropped tightly to her silhouette so she can be placed standing beside Annabeth in other scenes. No text, logos, or watermark.

---

## 2. Updated kingdom map with Party Garden added — save as `assets/magical-kingdom-map-v2.png`

The map needs a 7th building added for Party Garden, without losing the existing 6 (Animal Hospital, Enchanted Forest, Art Studio, Dragon Cave, Unicorn Stable, Royal Castle) or redrawing the whole scene from scratch.

> Use case: precise-object-edit. Asset type: edit of an existing top-down kingdom map illustration. Reference image: `assets/magical-kingdom-map.png` — keep everything in this image exactly as it is (the castle, the purple hospital building, the art studio cottage, the unicorn stable, the crystal dragon cave, the forest, all paths, water, and decoration). Add one new small, cheerful building into the open garden area in the lower-center-right of the scene, near the existing bench and stepping-stone path (the area with the puzzle-piece hedges) — a festive little pavilion or garden gazebo covered in string lights, bunting, and balloons, in the same polished storybook-3D style and lavender-gold-turquoise palette as the rest of the map. Connect it to the existing path network with a short stone path matching the others already on the map. Do not move, resize, or restyle any of the other six buildings or the surrounding landscape. No text, numerals, letters, logos, or watermark.

Once this exists, `assets/magical-kingdom-map-v2.png` replaces `assets/magical-kingdom-map.png` in the world map screen, and the new "Party Garden" marker gets repositioned to sit exactly on the new pavilion.

---

## 3. Party Garden lobby — save as `assets/party-lobby.png`

Same composition rule as every other lobby in this game: signed alcoves/stations across the **top half** of the frame, a genuinely open, empty floor across the **bottom half** for Annabeth (and her unicorn companion, once unlocked) to stand. Instead of doors into mini-games, each station here is a themed decoration display she taps to choose that theme for every building on the map. Five stations, left to right:

1. **Birthday** (always unlocked) — a birthday cake with lit candles and a small balloon bunch.
2. **Christmas** (gem-locked) — a small decorated Christmas tree with lights.
3. **Halloween** (gem-locked) — a friendly, non-scary carved pumpkin with a warm glowing face.
4. **Fourth of July** (gem-locked) — a burst of sparkling firework stars.
5. **Springtime** (gem-locked) — a basket overflowing with spring blossoms.

Locked stations show the same soft dark overlay and padlock icon already used on locked doors elsewhere in this game (that part is code, not art — no lock icon needed in the painting itself).

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten "party decorations" hub screen. Match the existing game's polished storybook-3D rendering style, rounded friendly proportions, warm saturated lavender-gold-turquoise palette, soft daylight — consistent with this game's other room backgrounds (see `assets/hospital-lobby-empty-v1.png` for the exact style register and composition pattern to follow). A bright, festive indoor garden pavilion with string lights and bunting overhead. Along the back wall, five clearly separated arched alcoves in a row, each displaying one distinct party display so a child can tell them apart at a glance: a birthday cake with lit candles and balloons, a small decorated Christmas tree with lights, a friendly glowing carved pumpkin, a burst of sparkling firework stars, and a basket overflowing with spring blossoms. Leave the entire center of the floor open and empty — no furniture, no characters there — so a character sprite can be placed standing on it later, matching the open-floor style of the game's other lobbies. Soft warm lighting, joyful and inviting. No text, numerals, letters, logos, watermark, UI elements, or scary imagery.

---

## 4. The five decoration overlays (shown across all six existing lobbies once picked)

These are separate from the Party Garden lobby art above — each is a single small transparent overlay, reused on top of all six *existing* lobby backgrounds (hospital, forest, studio, dragon, stable, castle) rather than one image per building. The hard rule for all five: **decorate the corners and top edge only** — the top-center (where each lobby's own doorway row already sits) and the entire bottom half (where the character stands) must stay fully transparent, since this overlay sits on top of scenes that already have their own doors and character in those exact spots. Quality bar: Disney-parks-level seasonal dressing — elegant, a few beautiful details, never cluttered.

### Birthday — save as `assets/decor-birthday.png` (free, build this one first)

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, layered on top of six different indoor storybook-3D room backgrounds at full 16:9 frame size. Create an elegant birthday-party decoration overlay: soft gold and blush-pink balloon clusters low in the bottom-left and bottom-right corners only, a delicate gold-and-white bunting garland strung along the very top edge of the frame (staying within the top 10% of the image), and a light scatter of gold confetti drifting near the frame's edges. Match the game's polished storybook-3D rendering style, warm gold-cream-blush palette that reads as "party" without matching any single room's colors. Leave the entire center of the frame — top-center and the whole bottom half — completely empty and fully transparent. Truly transparent alpha background everywhere except the corner/edge decorations. No text, numerals, letters, banners with readable text, logos, watermark, or centrally-placed cake/candles.

### Christmas — save as `assets/decor-christmas.png`

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, layered on top of six different indoor storybook-3D room backgrounds at full 16:9 frame size. Create an elegant winter-holiday decoration overlay: soft snow-dusted pine garland strung along the very top edge only (staying within the top 10% of the image), small warm fairy lights woven through it, and a modest cluster of wrapped gifts and a little holly low in the bottom-left and bottom-right corners only. Match the game's polished storybook-3D rendering style, a cozy red-green-gold-white palette. Leave the entire center of the frame — top-center and the whole bottom half — completely empty and fully transparent. Truly transparent alpha background everywhere except the corner/edge decorations. No text, numerals, letters, logos, watermark, or a full Christmas tree placed centrally.

### Halloween — save as `assets/decor-halloween.png`

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, layered on top of six different indoor storybook-3D room backgrounds at full 16:9 frame size. Create a friendly, not-scary autumn/Halloween decoration overlay: a garland of small smiling paper bats and orange leaves strung along the very top edge only (staying within the top 10% of the image), and a couple of small glowing, friendly-faced pumpkins low in the bottom-left and bottom-right corners only. Match the game's polished storybook-3D rendering style, a warm orange-purple-cream palette, cheerful rather than spooky. Leave the entire center of the frame — top-center and the whole bottom half — completely empty and fully transparent. Truly transparent alpha background everywhere except the corner/edge decorations. No text, numerals, letters, logos, watermark, scary imagery, or anything centrally placed.

### Fourth of July — save as `assets/decor-july4.png`

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, layered on top of six different indoor storybook-3D room backgrounds at full 16:9 frame size. Create an elegant patriotic-celebration decoration overlay: a red-white-and-blue bunting garland strung along the very top edge only (staying within the top 10% of the image), and small sparkling firework-star bursts low in the bottom-left and bottom-right corners only. Match the game's polished storybook-3D rendering style, a soft red-white-blue-gold palette. Leave the entire center of the frame — top-center and the whole bottom half — completely empty and fully transparent. Truly transparent alpha background everywhere except the corner/edge decorations. No text, numerals, letters, flags with readable text, logos, watermark, or loud/realistic explosion imagery.

### Springtime — save as `assets/decor-spring.png`

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, layered on top of six different indoor storybook-3D room backgrounds at full 16:9 frame size. Create an elegant spring-blossom decoration overlay: a garland of small pink and white flower blossoms with a few butterflies strung along the very top edge only (staying within the top 10% of the image), and small flower baskets low in the bottom-left and bottom-right corners only. Match the game's polished storybook-3D rendering style, a soft pastel pink-green-white palette. Leave the entire center of the frame — top-center and the whole bottom half — completely empty and fully transparent. Truly transparent alpha background everywhere except the corner/edge decorations. No text, numerals, letters, logos, or watermark.

---

## Suggested gem costs (adjustable — just my starting guess)

Birthday: free. Christmas: 15 gems. Halloween: 20 gems. Fourth of July: 25 gems. Springtime: 30 gems — same ascending-cost pattern already used for outfits and doors elsewhere in this game.

## What I'll do once these land

Rebuild Party Garden as a real lobby (replacing the popup-menu version I built and was told to stop on): reuse the exact door/lock rendering the other six buildings already use, just pointed at decoration-theme selection instead of launching a game, so locked themes show the same padlock treatment she already recognizes. Swap the map background to the v2 file and reposition the marker onto the new pavilion. Wire each decoration overlay in as it arrives — birthday first.
