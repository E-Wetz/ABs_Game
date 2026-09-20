# Product and architecture plan

## Stack

The vertical slice uses dependency-free HTML, CSS, and JavaScript. That keeps first-load size low, works on GitHub Pages, and avoids a build tool while the gameplay patterns are still being validated. When the activity library grows, the same boundaries can move into ES modules or a lightweight component framework without changing the saved-data shape.

## Application boundaries

- **Shell and world:** screen navigation, hospital map, settings, install/update handling.
- **Activity registry:** metadata and a factory for each mini-game. An activity receives a mission, selected skill content, player state, audio service, and completion callback.
- **Content library:** structured prompts grouped by skill, difficulty, and presentation type.
- **Learning engine:** selects under-practiced or due-for-review skills, records attempts, and adjusts assistance/difficulty.
- **Progress service:** versions, validates, saves, exports, and imports local data.
- **Rewards/world state:** grants currencies and unlocks without real-money mechanics.
- **Audio service:** spoken prompts, effects, music buses, and independent settings.

Suggested next structure:

```text
src/
  app/              shell, router, world map
  activities/       exam, teeth-cleaning, medicine-mixing, tracing...
  content/          phonics, sight-words, math, missions
  services/         audio, persistence, mastery, rewards
  components/       shared touch controls and feedback
assets/
  art/ audio/ icons/
```

## Activity interface

```js
registerActivity({
  id: "teeth-cleaning",
  title: "Magic Smile Checkup",
  skills: ["endingSounds", "middleSounds", "rhyming", "sightWords", "doubleDigits"],
  create({ mount, mission, challenge, services, onComplete }) {
    return { start(), pause(), resume(), destroy() };
  }
});
```

Activities should report skill outcomes separately from mission completion. This lets a child finish and receive encouragement even after needing hints.

## Local data model

```js
{
  schemaVersion: 1,
  profile: { name: "Annabeth", avatar: {}, createdAt: "..." },
  wallet: { stars: 0, gems: 0 },
  world: { unlockedLocations: ["hospital"], unlockedItems: [] },
  mastery: {
    endingSounds: { attempts: 0, correct: 0, streak: 0, level: 1, lastPlayed: null }
  },
  missions: { completed: [], patientHistory: {} },
  settings: { speech: true, effects: true, music: true },
  artwork: []
}
```

IndexedDB is recommended once saved coloring pages/audio assets are added. Small structured V1 progress is safe in `localStorage`, with schema-versioned export/import.

## Initial world

The hospital lobby is the hub. Examination, treatment, X-ray, medicine, recovery, unicorn stable, and grooming rooms branch from it. The Enchanted Forest and Princess Castle become the first exterior unlocks. Returning patients connect missions across rooms and locations.

## First 15 activities

1. Magic Smile Checkup — brushing/polishing plus rotating literacy and number challenges.
2. Gentle Paw Rescue — remove thorns and bandage in counted steps.
3. Unicorn Horn Repair — order and match magical fragments.
4. Potion Mixer — count ingredients and follow spoken multi-step directions.
5. X-ray Detective — visually locate shapes, bones, and hidden objects.
6. Heartbeat Check — tap rhythmic patterns and count beats.
7. Forest Search — find objects by ending/beginning/middle sound.
8. Rhyme Garden — drag rhyming flowers into matching planters.
9. Word Treats — feed a patient the spoken sight word.
10. Number Stable — match double-digit stall numbers to spoken numbers.
11. Letter Trail — trace uppercase and lowercase letter paths.
12. Number Trail — trace numerals with progressive guidance.
13. Bunny Hop Math — act out visual addition and subtraction.
14. Royal Pattern Parade — complete animal/color/shape sequences.
15. Recovery Room Memory — match animals, words, numbers, or sounds.

## iPad/PWA constraints

- Speech synthesis voices are device-dependent and may need a user tap before speaking; recorded local voice lines are more consistent for a polished release.
- iOS can evict storage under pressure, so export/import remains important.
- Audio playback must be unlocked by an explicit interaction and should pause when the app is backgrounded.
- PWA updates can appear stale until the service worker activates; use versioned caches and an in-game update prompt.
- Test touch target size, safe-area insets, landscape rotation, and standalone mode on a physical iPad.
- Keep core textures compressed and avoid many simultaneous large images to control memory use.

## Phases

1. Validate this teeth-cleaning vertical slice on desktop and iPad: touch feel, spoken prompts, session length, and challenge difficulty.
2. Extract the activity registry, services, and JSON content packs; add recorded sound effects and robust IndexedDB saves.
3. Build the hospital hub, recurring patient system, examination activity, and first unlocks.
4. Add two activities at a time, with parent mastery controls and spaced-review tuning.
5. Add character customization, exterior locations, richer audio, accessibility options, and GitHub Pages release automation.
