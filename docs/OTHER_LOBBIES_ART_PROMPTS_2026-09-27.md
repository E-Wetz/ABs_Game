# Walk-in lobbies for the other 5 map buildings — September 27, 2026

The Animal Hospital's walk-in lobby (`assets/hospital-lobby.png`) is being extended to every building on the map: Enchanted Forest, Art Studio, Dragon Cave, Unicorn Stable, and Royal Castle. Same idea everywhere — tapping the building on the map steps her inside, she stands in the room in her current outfit, and the games that building already offers become tappable doors instead of a flat list. No bell/pet-style passive extras for these — just the doors, matching the interface she already knows from the hospital.

## The same composition rule applies to all five

Carried over from the hospital lobby doc: **door icons and archways stay in the top ~50% of the frame**, and **the bottom ~40-45% is a wide-open, empty floor** with a distinct central medallion/rug/spotlight for her avatar to stand on — no furniture, no characters, nothing placed there. That's the one hard rule that let the code place her and the doors with simple x/y percentages and no per-image special-casing. Everything else (palette, props along the side walls, decoration) is free to match each location's existing theme.

Each prompt below points at whichever existing background for that location already exists, purely as a style/palette reference (not to be copied) — the same way `panda-treasure-cave.png` was originally built by referencing `nova-castle-meadow.png` for style only.

---

### 1. Enchanted Forest — save as `assets/forest-lobby.png`

4 doors: Enchanted Search, Forest Sounds, Word Treats, Recovery Room Memory.

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten enchanted-forest hub screen. Style/palette reference: `assets/enchanted-forest-garden.png` (match its polished storybook-3D rendering, warm greens and teals, dappled forest light, and friendly rounded proportions — do not reproduce its specific layout). A cozy open forest glade encircled by big friendly tree trunks and glowing lanterns. Along the back of the glade, four clearly separated tree-trunk doorways or leafy archways, each with a small round wooden signboard icon above it so a child can tell them apart at a glance: a sparkling magnifying-glass-over-a-leaf icon, a leaf with a gentle sound-wave ripple icon, a cookie icon, and a pair of playing cards icon. Leave the center of the glade's floor open and empty — soft moss or a round stone circle, no furniture, no characters there — so a character sprite can be placed standing on it later. Soft magical daylight filtering through leaves, calm and inviting. No text, numerals, letters, logos, watermark, UI elements, or scary imagery.

### 2. Art Studio — save as `assets/studio-lobby.png`

2 doors: Magical Coloring, Magic Tic-Tac-Toe.

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten art-studio hub screen. Style/palette reference: `assets/art-recovery-studio.png` (match its polished storybook-3D rendering, warm creative palette, and friendly rounded proportions — do not reproduce its specific layout). A bright, cheerful art studio with easels, paint jars, and fairy-light strings along the walls. Along the back wall, two clearly separated doorways, each with a small round signboard icon above it: a paintbrush-and-palette icon, and a sparkling star icon. Leave the center of the studio floor open and empty — a round paint-splatter rug, no furniture, no characters there — so a character sprite can be placed standing on it later. Soft warm daylight, playful and inviting. No text, numerals, letters, logos, watermark, UI elements, or scary imagery.

### 3. Dragon Cave — save as `assets/dragon-lobby.png`

4 doors: Dragon Egg Nursery, Magic Number Nests, X-Ray Detective, Number Trails.

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten magical-dragon-cave hub screen. Style/palette reference: `assets/panda-treasure-cave.png` (match its polished storybook-3D rendering, sparkling gems, saturated lavender-gold-turquoise palette, and soft glow — do not reproduce its specific layout or its panda). A warm, friendly crystal cave interior, glowing softly with embedded gems, cozy rather than dark or scary. Along the back wall, four clearly separated cave-archway doorways, each with a small round glowing signboard icon above it: a speckled dragon-egg icon, a small nest-with-sparkling-eggs icon, a glowing crystal-blue scanner-screen icon, and a glowing crayon-with-a-trailing-sparkle icon. Leave the center of the cave floor open and empty — a round glowing crystal platform, no furniture, no characters there — so a character sprite can be placed standing on it later. Soft magical gem-light, calm and inviting rather than dark or spooky. No text, numerals, letters, logos, watermark, UI elements, scary imagery, or weapons.

### 4. Unicorn Stable — save as `assets/stable-lobby.png`

3 doors: Unicorn Horn Repair, Number Stable, Bunny Hop Math.

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten magical-unicorn-stable hub screen. Style/palette reference: `assets/nova-castle-meadow.png` (match its polished storybook-3D rendering, saturated lavender-gold-turquoise palette, and soft daylight — do not reproduce its specific layout). A warm, welcoming unicorn stable interior with polished wood stalls, fairy lights, and soft hay bedding. Along the back wall, three clearly separated stall-doorways, each with a small round signboard icon above it: a spiral rainbow unicorn-horn icon, a sparkling horseshoe icon, and a bunny-paw-print icon. Leave the center of the stable floor open and empty — a round straw-and-clover rug, no furniture, no characters there — so a character sprite can be placed standing on it later. Soft warm daylight through open stable windows, calm and inviting. No text, numerals, letters, logos, watermark, UI elements, or scary imagery.

### 5. Royal Castle — save as `assets/castle-lobby.png`

3 doors: Castle Shape Repair, Letter Skywriting, Royal Pattern Parade.

> Use case: stylized-concept. Asset type: finished 16:9 background illustration for a kindergarten magical-royal-castle hub screen. Style/palette reference: `assets/nova-castle-meadow.png` (match its polished storybook-3D rendering, saturated lavender-gold-turquoise palette, and soft daylight — do not reproduce its specific layout). A grand but friendly castle throne hall with tall stained-glass windows, banners, and soft golden light. Along the back wall, three clearly separated arched doorways, each with a small round signboard icon above it: a stained-glass diamond-shape icon, a feather-quill icon, and a ribbon banner icon with a small star-and-moon pattern. Leave the center of the hall floor open and empty — a round royal-blue rug with a gold border, no furniture, no characters there — so a character sprite can be placed standing on it later. Soft warm daylight through the stained glass, grand but welcoming rather than imposing. No text, numerals, letters, logos, watermark, UI elements, or scary imagery.

---

## Once these exist

The code needs a small generalization pass (currently `renderHospitalLobby`/`hospitalLobbyDoors`/`openHospitalLobby` are hospital-specific): turn those into a generic `renderLobby(stopId)` driven by each `mapStops` entry's own `games` list, with one new small table mapping each stop id to its background filename and per-door x-positions (same idea as `hospitalLobbyDoors`, just one array per building). `openMapStop()` would then route every stop into its lobby instead of only `hospital`. That's a code-only change I'll make once I can see each image and place the doors against its actual icon positions, the same way I tuned the hospital ones.
