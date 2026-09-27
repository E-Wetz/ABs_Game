# Hospital lobby — background art, September 27, 2026

One new asset for the walk-in Animal Hospital lobby. Same "storybook-3D" house style as the existing room backgrounds (`fern-treatment-room.png`, `bramble-potion-lab.png`, `twinkle-dental-clinic.png`, `maple-heartbeat-room.png`, `panda-treasure-cave.png` — see [ART_GENERATION_2026-09-22.md](ART_GENERATION_2026-09-22.md) for that prior style register), **not** the coloring-book line-art style used elsewhere in this repo.

Save as `assets/hospital-lobby.png`, 16:9. No code changes needed once it's dropped in — the lobby screen loads it if present and falls back to a simple placeholder layout if not. **One follow-up step once the file exists:** add `"./assets/hospital-lobby.png"` to the `ASSETS` list in [sw.js](../sw.js) and bump `CACHE` — it's deliberately left out of the precache list until the file exists, since `cache.addAll()` fails the whole offline install if any listed file 404s.

### Prompt

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten magical-veterinary-hospital lobby/waiting-room hub screen. Match the existing game's polished storybook-3D rendering style, rounded friendly proportions, warm saturated lavender-gold-turquoise palette, soft daylight, tactile materials — consistent with this clinic's other room backgrounds. A warm, welcoming hospital lobby. A friendly reception desk at left with a small brass bell on the counter. A cozy bench along the back wall where Fern the orange fox and Bramble the cream bunny sit calmly waiting, both healthy and happy, no injuries visible. Along the back and right wall, five clearly separated doorways or alcoves, each with a small round signboard icon above it so a child can tell them apart at a glance: a paw-print icon over the Treatment Room door, a tooth icon over the Dental Room door, a woven-basket icon over a supply-pantry alcove with a shelf of neatly organized bottles and baskets, a ruler icon over a supply-hall alcove with shelves of bandages and bottles arranged small to large, and a bubbling-potion-bottle icon over the Medicine Room door. Leave the center of the floor open and empty — no furniture, no characters there — so a character sprite can be placed standing on it later. Soft warm lighting, calm and inviting rather than clinical. No text, numerals, letters, logos, watermark, UI elements, scary imagery, weapons, or syringes/sharp tools visible on any surface.

### Status: done, wired in

`assets/hospital-lobby.png` was generated from the prompt above and is now live — this is the actual lobby background you'll see in the game. It works very well, for a specific, repeatable reason (see below), so this section is now a reference for getting the *next* location's lobby art (Enchanted Forest, Castle, etc., if we build those later) right on the first try, not a todo for this one.

### Why this composition works (read this before commissioning another lobby scene)

The one hard requirement for this scene type is **vertical separation**: the doors and her avatar must never compete for the same band of the image, because the game positions both as simple top/bottom regions, not by detecting objects in the picture.

This image nails it because:
- All 5 door icons + archways sit entirely in the **top ~50%** of the frame.
- The floor is wide open with no furniture from the **~55% mark down to the bottom edge**, centered on a big circular paw-print medallion — that whole lower half is where her avatar now stands, sized generously (about 15% of the scene's width, roughly knee-to-head of the visible room height) without touching any door.
- Fern and Bramble's bench and the reception desk (the "pet" and "ring the bell" tap targets) sit off to the *left*, clear of both the door row above and the avatar's floor spot below.

For any future location scene, carry over these same rules: doors/signage confined to the top half, a genuinely empty, visually distinct floor area (a rug, a medallion, a spotlight — something that reads as "stand here") occupying at least the bottom 40-45% and centered rather than off to one side, and any decorative/pettable characters kept off to a side rather than in the center-floor zone. If a future prompt follows that shape, no code changes are needed to place the avatar and hotspots — just new x/y percentages tuned to that image's specific door and prop positions.

## Follow-up, same day: two reaction stickers for the hidden taps

Fern/Bramble on the bench and the front-desk bell are now hidden tap targets (no visible button, just like the secret heart on the title screen) — tapping them currently plays a soft chime and a light glow, which confirms *something* happened but the characters themselves don't move, since they're baked into the flat background image. To make them genuinely react, two small transparent overlay stickers are needed — the same "sticker overlay" technique already used elsewhere in this game (`tweezers-open.png`/`tweezers-closed.png`, `ear-fuzz.png`, etc. — see `docs/ART_SPEC.md`): a happy/active version of the same object, sized and posed to match its counterpart in `hospital-lobby.png` closely enough to sit exactly on top of it, shown briefly on tap, then hidden again.

### Fern & Bramble happy reaction — save as `assets/lobby-pet-happy.png`

> Use case: precise-object-edit. Asset type: transparent sticker overlay matching an existing background element. Reference image: `assets/hospital-lobby.png` — specifically Fern the orange fox and Bramble the white bunny sitting together on the teal bench near the reception desk. Create a happy reaction version of the same two characters, same species, colors, size, seated pose, camera angle, and lighting as they appear in that reference, but now visibly delighted: Fern's tail mid-wag with a couple of small motion lines, Bramble mid-hop or ears perked up excitedly, both with bigger smiles. Isolate just the two characters (no bench, no background, no other objects) on a truly transparent alpha background, cropped tightly to their combined silhouette so it can be overlaid precisely on top of the original bench characters in the game. No text, logos, watermark, sparkle bursts, or extra characters.

### Bell mid-ring — save as `assets/lobby-bell-rung.png`

> Use case: precise-object-edit. Asset type: transparent sticker overlay matching an existing background element. Reference image: `assets/hospital-lobby.png` — specifically the small brass bell sitting on the reception desk counter. Create a "just rung" version of the same bell: same size, shape, color, and camera angle as the reference, but now tilted slightly as if mid-ring, with two or three small curved motion lines and a tiny musical note beside it suggesting sound. Isolate just the bell and its motion/sound marks (no desk, no counter, no background) on a truly transparent alpha background, cropped tightly so it can be overlaid precisely on top of the original bell in the game. No text, logos, watermark, or extra objects.

Once these exist, tapping either hotspot can briefly show the matching sticker (fade in, hold under a second, fade out) instead of relying on the glow alone — that's a small code change I can make as soon as the files are in `assets/`.

## Second follow-up: the happy/rung stickers don't align with the painted background

Once `lobby-pet-happy.png` and `lobby-bell-rung.png` came back and were wired in, testing showed the real problem: they're overlaid on top of Fern, Bramble, and the bell as they're *painted into* `hospital-lobby.png` — two completely separate pieces of art that were never generated together, so their edges don't line up. At full opacity it mostly reads fine, but during any fade there's a brief double-exposure/ghosting where both versions show through at once, and the bell in particular renders visibly offset and oversized against the painted one underneath it. No amount of repositioning fixes this — the two images just don't match pixel-for-pixel.

The fix: stop painting Fern, Bramble, and the bell into the background at all, and make *every* state — resting and happy/rung — a sticker. Then the "idle" and "reaction" images are generated as a matched pair (same crop, scale, and reference), so they align with each other by construction instead of needing to match a static painting.

### Remove them from the background — save as `assets/hospital-lobby-empty-v1.png`

> Use case: precise-object-removal. Asset type: edit of an existing background illustration. Reference image: `assets/hospital-lobby.png`. Remove Fern the orange fox and Bramble the white bunny from the teal bench near the reception desk, leaving the bench and its purple pillows empty and intact. Remove the small brass bell from the reception desk counter, leaving that spot on the counter bare. Do not change anything else in the image — same room, same doorways, icons, lighting, plants, and floor medallion, same camera angle and resolution. No text, logos, or watermark.

### Fern & Bramble at rest — save as `assets/lobby-pet-idle.png`

> Use case: identity-preserve. Asset type: transparent sticker overlay, matched pair with an existing sticker. Reference image: `assets/lobby-pet-happy.png` — use it only for exact pose layout, camera angle, scale, and crop framing (not for the happy expression). Recreate Fern the orange fox and Bramble the white bunny in the same seated positions, same size, same camera angle, same crop, but now in their normal calm resting expression: soft closed-mouth smiles, no motion lines, ears relaxed and still. Isolate just the two characters on a truly transparent alpha background, cropped identically to the reference. No text, logos, or watermark.

### Bell at rest — save as `assets/lobby-bell-idle.png`

> Use case: identity-preserve. Asset type: transparent sticker overlay, matched pair with an existing sticker. Reference image: `assets/lobby-bell-rung.png` — use it only for exact size, shape, camera angle, scale, and crop framing (not the mid-ring motion). Recreate the same brass bell sitting still and at rest: no tilt, no motion lines, no musical note. Isolate just the bell on a truly transparent alpha background, cropped identically to the reference. No text, logos, or watermark.

Once these three exist, the code change is: swap `hospital-lobby.png` for `hospital-lobby-empty-v1.png` as the base, add the two idle stickers as always-visible overlays in the same spots, and have a tap crossfade idle → happy/rung → idle instead of the current instant pop. Since idle and reaction are a matched pair this time, that crossfade should actually look clean.
