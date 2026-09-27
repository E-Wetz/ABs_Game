# Seasonal lobby decorations — art needed, September 27, 2026

## What this is

A new "Party Garden" building on the map (already wired in) lets Annabeth pick a decoration theme. Whatever she picks then shows up automatically in **all six** existing lobbies (Animal Hospital, Enchanted Forest, Art Studio, Dragon Cave, Unicorn Stable, Royal Castle) — one small transparent decoration image per theme, layered on top of each lobby's existing background, rather than repainting six full scenes per theme. First theme: **Birthday Surprise**, free/always available (no gem cost) since her birthday is coming up soon. Code is done and already tested — it silently does nothing until the file below exists, then picks it up automatically.

## The one hard rule: this must never block a door or the avatar

Every lobby already follows a strict layout — door icons and archways live in the **top ~50%** of the frame, and the **bottom ~40-45%** is a clear, open floor where Annabeth (and, once unlocked, her unicorn companion) stand. The decoration image is a full-frame overlay drawn on top of that background at the exact same size, so it must leave both of those zones completely untouched: **decorate the corners and outer edges only** (think balloon clusters low in the left/right corners, a soft garland or bunting arcing just along the very top edge above where the door signage already sits, maybe a little confetti drifting near the frame edges) and leave the entire center of the image — top row of doors and bottom floor alike — fully transparent. Nothing should ever visually sit on top of a door icon or the character.

## The quality bar

This should look like a real park does it — think Disney-level seasonal dressing: cohesive, elegant, a little magical, never cluttered or cheap-looking. A few well-placed, beautifully rendered elements beat a dozen small ones. It also has to work draped over six *different* backgrounds (purple-toned hospital, green forest, pastel art studio, crystal-blue dragon cave, warm-wood unicorn stable, gold-and-blue royal castle), so the palette needs to be its own warm, neutral "party" identity — soft gold, cream, blush pink, white — rather than matched to any one room, so it harmonizes with all six instead of clashing with some of them.

## Prompt — save as `assets/decor-birthday.png`

> Use case: stylized-concept. Asset type: transparent decoration overlay for a kindergarten game, to be layered on top of six different indoor storybook-3D room backgrounds at full frame size (16:9). Create an elegant birthday-party decoration overlay: soft gold and blush-pink balloon clusters low in the bottom-left and bottom-right corners only, a delicate gold-and-white bunting garland strung along the very top edge of the frame (staying within the top 10% of the image, well above where a row of doorway icons sits), and a light scatter of gold confetti drifting near the frame's edges. Match the game's polished storybook-3D rendering style — soft lighting, tactile materials, rounded friendly shapes, a warm gold-cream-blush palette that reads as "party" without matching any single room's colors. Leave the entire center of the frame — both the top-center area and the whole bottom half — completely empty and fully transparent, since a doorway row and a standing character already occupy that space in every room this will be placed over. Truly transparent alpha background everywhere except the corner/edge decorations themselves. No text, numerals, letters, "Happy Birthday" banners with readable text, logos, watermark, or candles/cakes placed centrally.

## Once it exists

Save it at exactly `assets/decor-birthday.png` (already referenced by that name in `adventure.js`), then tell me — the only remaining step is adding it to `sw.js`'s offline cache list and bumping the version number, same as every other asset this session.

## Resolved: no spoken birthday line, no new audio needed

Originally planned as a new recorded voice line, since no existing clip says "birthday," "surprise," "party," or "present." Decided against it — the birthday theme now only says her name visually, through the "Happy birthday, Annabeth" banner baked into `decor-birthday.png` itself, which she'll see every time that theme is selected regardless of the actual date. There's no spoken line tied to selecting it (same as every other theme — just the sparkle chime). This means the whole seasonal-decorations feature ended up needing **zero new voice recordings**: every locked-station message reuses existing recorded phrases ("N more magic gems to unlock").
