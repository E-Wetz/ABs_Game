# Vet-clinic interactive art spec

Prompts for an image generator. Drop finished files into `assets/` using the
exact filenames below and they'll be wired in directly — no code changes
needed on your end.

## Style guide (prepend to every prompt)

> Pixar/DreamWorks-style 3D rendered illustration, soft pastel color palette, warm
> gentle studio lighting, smooth rounded shapes, subtle glossy highlights, friendly
> and non-scary, aimed at kindergarten-age children. Matches a magical veterinary
> clinic universe.

## Tier 0 — plain base plates (highest priority, new)

**The problem these solve:** the current background photo for each case already
has the ailment drawn into it (prickles, mud, a scrape, germs, etc). No matter
how well the touch interaction erases things locally, the starting image still
shows the problem baked in. These 10 images replace that photo entirely — each
one is the *same* character, crop, pose, and clinic background as today, but
completely healthy: no ailment mark, and also no tool, no gloved hand, no
bandage/treatment item. The base image then never changes for the rest of the
case; only the sticker overlays (Tier 1–3 below) appear and disappear on top
of it.

Full-scene image (not a transparent cutout), 900×1200px, portrait 3:4, PNG.
Soft pastel veterinary-clinic backdrop for every one: pale blue-green walls, a
blurred blue paw-print wall decal, a white shelf with small potted plants,
blue padded exam-table surface, warm soft studio lighting — matching the
existing `care-treatments-*.png` sprite sheets already in the repo (use them
as reference images for the generator if it accepts them).

1. **`base-prickly-paw.png`** — Fern the fox's front paw, close-up, resting on
   the blue cushion, orange-and-cream fur, dark brown paw pad and toes filling
   most of the frame. Clean, healthy fur, nothing on it.
2. **`base-itchy-ear.png`** — Fern the fox's head, close-up on one ear, pale
   pink inner ear facing camera, orange fur, a hint of the green leaf-pattern
   bandana at the frame edge. Ear calm and clean.
3. **`base-rumbly-tummy.png`** — Bramble the bunny, small full figure, cream
   fur, a white daisy behind one ear, sitting/reclining with tummy visible.
   Calm, neutral, no discomfort marks.
4. **`base-muddy-paw.png`** — Bramble the bunny's front paw, close-up, cream
   fur, resting on the cushion. Dry and clean.
5. **`base-smoky-sneezes.png`** — Pip the dragon's face/head, close-up, teal
   scales, small horns, big eyes, calm relaxed expression, mouth closed.
6. **`base-scraped-scale.png`** — Pip the dragon's body/tail section, close-up
   on teal scales with small cream back spikes. Smooth and unblemished.
7. **`base-dim-horn.png`** — Nova the unicorn's face and horn, close-up, pale
   lavender fur, flowing purple-and-white mane, plain gray/silver horn (not
   sparkling gold yet).
8. **`base-tired-hoof.png`** — Nova the unicorn's leg and hoof, close-up, pale
   lavender fur above a gray hoof, resting on the cushion. Clean and calm.
9. **`base-tangled-tail.png`** — Fern the fox's tail, close-up, fluffy
   orange-and-white fur, smooth and neatly brushed.
10. **`base-sugar-bug-tooth.png`** — Bramble the bunny's face, close-up on an
    open mouth showing clean white teeth, cream fur, small daisy near one ear.

None of these ten should contain: a tool, a gloved hand, sparkle/shine effects,
or a bandage/wrap/crystal/ribbon — those all come in as separate overlay
stickers so they can appear only once the child actually places them.

## Tier 1 — done ✅ (already in `assets/`)

`tweezers-open.png`, `tweezers-closed.png`, `prickle-burr.png` — transparent
sticker PNGs, already generated and wired into the game.

## Tier 2 — done ✅ (already in `assets/`)

`ear-fuzz.png`, `dirt-smear.png`, `cream-dab.png`, `bug-plaque.png` —
transparent sticker PNGs, already generated and wired into the game.

## Tier 3 — final "applied item" stickers (needed once Tier 0 lands)

Once the base plates above replace the old photo, the final bandage/wrap/etc.
can no longer come from the sprite sheet (it was baked into a frame that no
longer gets shown) — it needs to be its own overlay sticker instead, same
treatment as Tier 1/2: isolated object, transparent background.

1. **`bandage-wrap.png`** — a soft mint-green fabric wrap/bandage with a small
   white paw-print patch, wrapped in a slight curve as if already applied
   around a limb. 300×220px.
2. **`support-wrap.png`** — a wider lavender elastic support band with a small
   heart patch, same curved "already applied" shape. 300×220px.
3. **`ribbon-bow.png`** — a small pink or rainbow ribbon bow, tied. 220×180px.
4. **`crystal-set.png`** — 2–3 small faceted rainbow/gem crystals clustered
   together with a soft glow. 240×200px.
5. **`cozy-blanket.png`** — a folded mint-green blanket corner with a small
   paw-print pattern, as if tucked over something. 320×220px.

## Tier 4 — coloring-page line art (found while testing, real bug)

The "Magical Coloring" activity's outlines are currently hand-coded bezier
shapes, not real art — they don't read as a unicorn/butterfly/castle/fox at
all (a round blob with two triangle ears and a horn). The code has already
been fixed to load a real image here automatically if one exists at the right
filename, falling back to the current crude shape if not — so dropping these
in is the only step left, no further code changes needed.

Standard black-line coloring-book art, transparent background PNG, no color
fill (children add the color), clean bold outlines (~6–8px at this size) with
simple, printable, easily-recognizable interior line detail (mane strands, a
few wing patterns, castle bricks, tail fur), similar spirit to a page from a
kids' coloring book — simplified enough for a kindergartner to color inside
the lines but still clearly the right animal/object. 1400×860px (landscape,
matches the canvas' 700×430 working area at 2x), transparent PNG.

1. `coloring-unicorn.png` — a unicorn head and neck with mane and horn, sitting
   inside the frame at a friendly 3/4 angle.
2. `coloring-butterfly.png` — a butterfly, wings spread, symmetrical, seen from
   above.
3. `coloring-castle.png` — a small fairy-tale castle with two turrets and a
   flag.
4. `coloring-fox.png` — a sitting fox, front-facing, bushy tail curled around.

## Optional — future expansion (not blocking)

- `swab-open.png` / `swab-closed.png` — cotton-swab tip pair, same treatment
  as the tweezers pair.
- `sparkle-mist.png` — a small puff of soft blue cooling mist/spray droplets.
- `magnifier.png` — a standalone lens-and-handle magnifying glass, if bespoke
  art is wanted instead of the current CSS-built one (lower priority — the CSS
  version already reads fine).
