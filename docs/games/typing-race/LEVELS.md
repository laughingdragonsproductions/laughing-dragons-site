# Typing Race — Levels

## Structure

Typing Race uses a single **Heat** run instead of numbered levels. Difficulty tier changes timing and letter pool only.

- **Heat target:** 20 correct keypresses
- **Miss handling:** wrong key or timeout counts as a miss; after 1 miss on a letter, next letter spawns (letter is not re-queued)
- **Max misses before soft fail:** none — run always reaches 20 correct or player quits
- **Practice mode:** infinite letters, no score toward clear

## Heat progression (within one run)

| Correct count | Timer feel | Notes |
|---------------|------------|-------|
| 1–5 | Full tier duration | Warm-up; friend hint shown |
| 6–12 | −10% time per tier | Streak counter appears after 3 |
| 13–20 | −20% time (floor 1.8 s Easy) | Optional "You're on fire!" at streak 8 |

Timer adjustments are multipliers on base tier time, not separate levels.

## Letter selection

- Random uniform from active pool for tier
- No immediate repeat of same letter (debounce last 2)
- Fruit Friend portrait shown when letter maps to cast (optional flair, not required to type)

## Win condition

Score **20 correct** letters in one Heat on any difficulty → `KIDS_UNLOCKS.markCleared("typing-race")` → hub shows `SORT-COLOR-6`.

Practice mode never calls `markCleared`.

## Par

Optional flair only (not gating unlock):

| Tier | Par time | Message |
|------|----------|---------|
| Easy | ≤ 90 s total | *Speedy fingers!* |
| Normal | ≤ 75 s | *Workroom pro!* |
| Hard | ≤ 60 s | *Dragon typist!* |

Par does not block clear if exceeded.

## Session length target

~2–4 minutes for 20 letters on Easy.
