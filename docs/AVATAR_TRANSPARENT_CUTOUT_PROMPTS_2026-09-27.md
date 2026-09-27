# Avatar cutouts — resolved, no art needed

This doc originally asked for 12 new transparent avatar images, believing only 2 of her 13 outfits had real cutout art. That was wrong on two counts, found while wiring the fix in:

1. The live `outfits` array in `adventure.js` actually has **24** outfits, not 13 — it already includes a "ten-look expansion" (moonlight, blossom, dragonflight, arctic, safari, crystalvet, oceanpearl, royalrescue, fairyforest, auroravet) that an earlier session added and fully wired into the wardrobe.
2. Checking `assets/`, every single one of those 24 outfits — including the default "Magic Doctor" and all 12 this doc used to ask for prompts for — already has a `annabeth-complete-<id>-v1.png` file. I verified actual pixel transparency (not just the file's alpha-capable header) by loading each one in a browser and sampling corner pixels: all 24 came back fully transparent.

So there was no art gap. I wired all 24 into `lobbyAvatarCutouts` in `adventure.js`, added the missing 12 filenames to `sw.js`'s precache `ASSETS` list, and bumped `CACHE` to v93. Every outfit now stands natively in the Animal Hospital lobby with no box and no background — including the one she starts with.

Nothing to generate. This file is kept only so a future session doesn't repeat the same wrong assumption.
