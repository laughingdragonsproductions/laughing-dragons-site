# Hangman Lite — Levels

## Structure

One **Word Run** = **5 words solved** (not necessarily consecutive — failed words retry until solved or player quits). Difficulty tier controls pool, misses, and hints.

## Word Run composition (Normal / default)

| Word # | Length bias | Notes |
|--------|-------------|-------|
| 1 | 4 letters | Warm-up — category hint shown |
| 2 | 4–5 letters | |
| 3 | 5 letters | |
| 4 | 5–6 letters | |
| 5 | 6 letters | Celebration after solve |

No word repeats within a single Word Run. Shuffle pool with length constraints per slot.

## Easy tier

- Words 3–4 letters only
- 8 misses per word
- After 3 wrong guesses: reveal first letter slot (marked as hint — still counts as solved normally)

## Hard tier

- Words 6–8 letters
- 5 misses per word
- No category hint

## Win condition

Solve **5 words** in one Word Run → `KIDS_UNLOCKS.markCleared("hangman-lite")` → hub shows `WHACK-GRID-10`.

Free Play never triggers clear.

## Lose condition (per word)

Misses reach 0 before word complete → show *"Nice try!"* overlay with word reveal → **Try this word again** or **Skip to next** (Skip still requires eventual 5 solves for clear — track `wordsSolved` only on full solve).

For v1 simplicity: on fail, auto-retry same word with fresh miss counter (does not count toward 5).

## Par

Optional: all 5 words solved with ≤2 total wrong guesses across run → toast *Word wizard!*

## Session length target

~5–7 minutes for 5 words on Normal.
