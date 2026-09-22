"""Crawlable game guide copy for Laughing Dragons browser games."""

GAME_GUIDES: dict[str, dict] = {
    "count-the-dragons": {
        "title": "Count the Dragons",
        "short_lead": "Scan crowded Fruit Friends maps and tap how many laughing dragons are hiding in plain sight.",
        "short_blurb": (
            "Count the Dragons drops dragon tiles into colorful I-Spy scenes packed with Fruit Friends. "
            "Only the dragons count — scan fast and tap 1 through 10. Clear ten rounds to earn your unlock code."
        ),
        "guide_paragraphs": [
            (
                "Count the Dragons is a number-spotting challenge built on the same busy maps as Fruit Search, "
                "but with a twist: your job is to count laughing dragon tiles hiding among the Fruit Friends crowd. "
                "Each round drops you into a colorful scene. Read the prompt, scan every corner, and tap the number "
                "that matches how many dragons you see — not apples, not bananas, just dragons. Easy mode keeps "
                "counts between one and five with fewer decoys. Hard mode packs the map tighter, shrinks sprites, "
                "and asks for counts up to ten. Wrong taps get a gentle nudge; right answers roll you straight "
                "into the next round."
            ),
            (
                "The game is always open from the Laughing Dragons Games hub — no Terminal Trainer code required. "
                "That makes it a perfect warm-up before the hidden-object chain or a quick brain break on its own. "
                "Progress saves locally in your browser, so your round count and settings stick between visits without "
                "any account or install. Play on desktop with a mouse click or on a tablet with a finger tap; the "
                "maps scroll on smaller screens so nothing hides off the edge."
            ),
            (
                "Scoring is simple: survive ten cleared rounds in one Count Run and you win. The victory screen "
                "reveals unlock code SIMON-GLOW-8. Take that code to Terminal Trainer and type LOGIN SIMON-GLOW-8 "
                "to crack Simon Says Light Pad open on the hub — or just stash the code on your cleared game card "
                "for later. Laughing Dragons keeps earned codes visible so returning players never lose track."
            ),
            (
                "Tips from the workroom floor: sweep the map in a grid pattern instead of random hunting — top left "
                "to bottom right, then double-check the edges where dragons love to peek from behind bigger fruit. "
                "On Hard, ignore similarly colored Fruit Friends by looking for the dragon snout and wing silhouette "
                "first, then count. If two dragons overlap, zoom mentally: one body, two heads still means two dragons. "
                "Speed matters less than accuracy; a wrong tap costs you the round momentum."
            ),
            (
                "Difficulty ramps through crowd size and decoy density rather than trick questions. Easy is ideal for "
                "younger counters still learning numerals; Hard is for eagle-eyed players who want the full 1–10 range "
                "and a crowded scene. There is no timer pressure — take the seconds you need. When you finish a run, "
                "play again for a fresh shuffle of maps and counts. Count the Dragons teaches careful observation "
                "and quick number recognition while staying firmly in the Laughing Dragons playful arcade lane."
            ),
        ],
    },
    "typing-race": {
        "title": "Typing Race",
        "short_lead": "Letters flash on screen — type each one before it vanishes in this keyboard warm-up.",
        "short_blurb": (
            "Typing Race is a bite-sized keyboard sprint from the Laughing Dragons workroom. "
            "Letters appear one at a time; hit the matching key before time runs out. "
            "Clear a Heat of twenty correct letters to earn SORT-COLOR-6."
        ),
        "guide_paragraphs": [
            (
                "Typing Race turns letter recognition into a mini arcade sprint. A single character flashes in the "
                "center of the screen — uppercase or lowercase — and you have a short window to press the matching "
                "key on your keyboard before it disappears. Correct hits streak forward; misses or slow fingers reset "
                "your momentum. The aesthetic matches Terminal Trainer's retro workroom energy, but sessions stay "
                "short and friendly for younger players still mapping keys to letters. No mouse required once you "
                "start; just hands on home row and eyes on the prompt."
            ),
            (
                "Always open from the Games hub — no unlock code needed. That makes Typing Race one of the best "
                "entry points in the catalog: zero gating, instant play, real skill building. Your best streaks and "
                "session progress save locally in the browser via localStorage, so you can close the tab and pick up "
                "later without an account. Works on physical keyboards; on tablets, an on-screen keyboard appears "
                "when you tap the play area."
            ),
            (
                "Win condition: complete a Heat of twenty correct letters in one run. Finish the Heat and the victory "
                "overlay shows reward code SORT-COLOR-6. Head to Terminal Trainer, type LOGIN SORT-COLOR-6, and Color "
                "Match Sort unlocks on the hub when that title ships. Even if the next game is still in production, "
                "the code stays on your cleared Typing Race card for reference — Laughing Dragons never hides earned "
                "passwords from returning players."
            ),
            (
                "Difficulty is self-paced through speed and focus rather than a formal Easy/Hard toggle. Early letters "
                "feel generous; as your streak grows, the flash time tightens slightly so veteran typists stay engaged. "
                "If you hunt-and-peck, that is fine — the game rewards accuracy first. Keep your eyes on the letter, "
                "not the keyboard, and let muscle memory build over repeated Heats. Tab away mid-run and you can resume "
                "from the hub without losing unlock progress already saved."
            ),
            (
                "Pro tips: rest fingers on ASDF and JKL; for uppercase letters, tap Shift with the opposite hand. "
                "When a letter vanishes, breathe and read the next one fully before striking — panic typing causes "
                "double keystrokes. Play three short Heats instead of one marathon session; kids especially benefit "
                "from breaks. Typing Race pairs naturally with Terminal Trainer — master keys here, then explore "
                "HELP, DIR, and CD commands there. Both games save independently in your browser."
            ),
            (
                "Laughing Dragons built Typing Race as a bridge between arcade fun and real computer literacy. "
                "There are no lives, no game-over screen — only the Heat counter climbing toward twenty. "
                "Clear it once per session or chase personal bests on consecutive correct letters. "
                "Either way, you leave with warmer fingers and a fresh unlock code for the color-sorting "
                "chapter of the Fruit Friends saga."
            ),
        ],
    },
    "hangman-lite": {
        "title": "Hangman Lite",
        "short_lead": "Classic hangman with dragon-themed words — guess letters before the stickman goes limp.",
        "short_blurb": (
            "Hangman Lite serves classic word guessing with a Laughing Dragons twist: FIRE, DRAGON, TALON, LAUGHING, and more. "
            "Reveal the hidden word letter by letter. Clear a five-word Word Run to earn WHACK-GRID-10."
        ),
        "guide_paragraphs": [
            (
                "Hangman Lite is word guessing stripped to the essentials and dressed in dragon fire. "
                "Each round picks a hidden word from a curated list — think FIRE, DRAGON, TALON, LAUGHING, "
                "and other studio-flavored vocabulary. Tap or click letters on the on-screen keyboard to guess. "
                "Correct letters lock into place across the blank spaces; wrong guesses add another segment to "
                "a simple stick figure drawing. Run out of misses before the word is complete and the figure "
                "goes limp — then a fresh random word appears and you try again. No harsh game over, just "
                "another chance to beat the gallows."
            ),
            (
                "The game is always playable from the Games hub with no Terminal Trainer gate. "
                "Progress — including your current Word Run tally toward the win — saves in local browser storage, "
                "so closing the tab mid-run does not erase letters already revealed on the active word. "
                "Desktop players can also press keyboard letters directly. Mobile players get large tap targets "
                "on the letter grid. Accessibility stays kid-friendly: wrong guesses are noted visually, not "
                "with loud penalties."
            ),
            (
                "Your goal is a Word Run: solve five complete words in one session. Hit that fifth victory and "
                "the win banner displays unlock code WHACK-GRID-10. Open Terminal Trainer and type "
                "LOGIN WHACK-GRID-10 to grant Whack-a-Fruit on the hub when it ships. The code also prints "
                "on your cleared Hangman Lite card in the games list, so you can copy it weeks later without "
                "re-beating the run — standard Laughing Dragons courtesy for returning adventurers."
            ),
            (
                "Strategy starts with vowels: E, A, and O appear often in the dragon word list. "
                "After vowels, try common consonants like R, S, and T. Short words punish random guessing; "
                "longer words like LAUGHING give you more blanks to infer from pattern. If you see _RA_ON, "
                "the answer practically roars at you. Avoid burning guesses on Q, X, and Z until shorter words "
                "are eliminated — the curated list favors playable classroom letters over Scrabble nightmares."
            ),
            (
                "Difficulty scales through word length and obscure vocabulary, not a menu toggle. "
                "Early words in a run tend toward four and five letters; later picks may stretch longer. "
                "There is no countdown timer — think as long as you need. The stickman art fills in piece "
                "by piece, giving you a clear visual budget for remaining misses. Young readers can treat "
                "each round as spelling practice; older players can speed-run vowel opens for bragging rights."
            ),
            (
                "Hangman Lite sits in the always-open tier alongside Count the Dragons and Typing Race, "
                "making it a reliable party game or classroom warm-up. Because saves are local, each browser "
                "profile tracks its own Word Run progress — shared family computers may want separate profiles "
                "if siblings race for WHACK-GRID-10 first. However you play, the Laughing Dragons voice stays "
                "playful: lose a word, shrug at the limp stickman, and charge into the next dragon syllable."
            ),
        ],
    },
    "sliding-scale": {
        "title": "The Sliding Scale",
        "short_lead": "Slide tiles on the workroom floor to rebuild workshop photos and Laughing Dragons brand art.",
        "short_blurb": (
            "The Sliding Scale is a classic sliding-tile puzzle on the Laughing Dragons workroom floor. "
            "Choose 3×3, 4×4, or 5×5 grids, shuffle, and rebuild the picture. Always open — no code required."
        ),
        "guide_paragraphs": [
            (
                "The Sliding Scale revives the timeless sliding-tile puzzle with Laughing Dragons workshop flair. "
                "One square is always empty; every other tile shows a slice of a larger image — workshop photos, "
                "the workroom banner, or the studio logo. Click or tap a tile in the same row or column as the "
                "empty gap and the whole line slides toward the hole. Tap farther from the gap to move multiple "
                "tiles in one motion. Arrow keys on desktop nudge one tile at a time for precision fans. "
                "When every fragment lands in order, the full picture snaps together and you win."
            ),
            (
                "Pick your grid before shuffling: Easy uses a 3×3 board (eight tiles plus the gap), Med stretches "
                "to 4×4, and Hard expands to 5×5 for a serious scramble. Each size swaps in different source art "
                "so repeats feel fresh. Hit Shuffle anytime for a new random configuration of the same image — "
                "no two solves play identically even on the same difficulty. The game is always open from the hub; "
                "no Terminal Trainer LOGIN required."
            ),
            (
                "Progress saves locally in your browser: last chosen difficulty, selected artwork, and move counts "
                "where implemented persist between sessions. No account, no download — pure browser play like the "
                "rest of the Laughing Dragons catalog. Touch screens work well; fat fingers may prefer arrow-key "
                "nudges on Bluetooth keyboards for 5×5 precision. There is no unlock code chain for Sliding Scale; "
                "it is a standalone zen break between code-hunting adventures."
            ),
            (
                "Beginner tip: solve the top row first, then the left column, then work inward — classic sliding-puzzle "
                "strategy still applies on dragon art. Keep the empty tile in a corner while you line up edge pieces. "
                "On 5×5, plan three moves ahead; reckless sliding creates parity traps that need extra shuffles to fix. "
                "If you feel stuck, Shuffle is not cheating — it is a fresh start with the same photo."
            ),
            (
                "Difficulty is entirely your grid choice. 3×3 clears in minutes for younger players; 5×5 can absorb "
                "a lunch break. There is no timer and no life counter — only the quiet satisfaction of tiles clicking "
                "home. Med mode is the sweet spot for family co-op: one person calls directions, another taps. "
                "Laughing Dragons hid familiar brand imagery in the tile sets so finishing a puzzle feels like "
                "tidying the actual workroom."
            ),
            (
                "Unlike chain-gated titles, Sliding Scale never asks for FORGE-GATE-7 or FIND-WALDO-3. "
                "Open the Games hub, pick The Sliding Scale, choose a size, shuffle, and slide. "
                "Return anytime your brain wants spatial logic instead of typing or hidden-object scans. "
                "Local saves mean your preferred difficulty waits exactly where you left it — "
                "the digital equivalent of a puzzle book bookmarked on the studio desk."
            ),
        ],
    },
    "flappy-dragon": {
        "title": "Flappy Dragon",
        "short_lead": "Tap to flap through stone pillars — chase high scores and unlock all eight dragon colors.",
        "short_blurb": (
            "Flappy Dragon is tap-to-fly arcade action against a scrolling Laughing Dragons sky. "
            "Thread gaps between pillars, pick Easy or Hard gravity, and unlock eight dragon skins. Always open."
        ),
        "guide_paragraphs": [
            (
                "Flappy Dragon sends your laughing dragon soaring through a side-scrolling sky filled with stone "
                "pillars. Tap the screen, click the mouse, or press Space to flap upward; release and gravity pulls "
                "you down. Each pillar pair leaves a gap — thread it cleanly to keep flying and rack up score. "
                "Hit a pillar or the ground and the run ends, but restart is instant. The vibe is classic flash-era "
                "arcade: one more try, one more gap, one more point. Laughing Dragons wrapped the mechanic in "
                "eight collectible dragon color skins instead of generic birds."
            ),
            (
                "Choose gravity before you launch: Easy mode applies fifteen percent lighter gravity and a gentler "
                "jump arc, perfect for younger fliers or first-time players. Hard mode uses standard physics for "
                "the full arcade challenge. The game also speeds up slightly as your score climbs, so late-run gaps "
                "demand tighter timing even on Easy. Always open from the Games hub — no Terminal code, no unlock "
                "chain. Just flap."
            ),
            (
                "Dragon colors unlock through score milestones. You start with green; beat threshold scores to reveal "
                "red, blue, purple, orange, pink, teal, and charcoal skins. Unlocked colors persist in local browser "
                "storage, so your wardrobe survives tab closes and computer restarts without an account. "
                "Pick your favorite from the selector before each run — showing off teal at score fifty is half the fun."
            ),
            (
                "Control tips: short taps beat holding — Flappy Dragon rewards rhythmic micro-flaps, not constant "
                "mashing. Aim for the vertical center of each gap; corrections are cheaper when you enter level. "
                "On mobile, play in portrait so your thumb naturally taps the lower third without blocking the view. "
                "Watch the next pillar early; panic flapping near the ground causes most crashes."
            ),
            (
                "Difficulty layers stack: Easy versus Hard gravity, accelerating scroll speed, and narrower effective "
                "gaps at high scores. There is no story mode or level map — pure endless runner until you misjudge "
                "a pillar. Laughing Dragons treats high scores as the progression system; screenshot your personal "
                "best and challenge siblings on the same machine. Local saves track unlocked colors only — each run "
                "starts at zero score by design."
            ),
            (
                "Flappy Dragon sits beside Dragon-Ball V and Drago's Revenge in the always-open arcade tier. "
                "No reward codes feed Terminal Trainer here; the prize is cosmetic dragon pride and bragging rights. "
                "Sessions stay under a minute unless you are deep into a legendary streak — ideal for queue waiting "
                "or quick breaks. Fire it up, pick Hard when Easy feels tame, and paint the sky every color the "
                "studio forged."
            ),
        ],
    },
    "dragon-vball": {
        "title": "Dragon-Ball V",
        "short_lead": "Forest Pong with dragons — rally past the AI paddle and be first to three points.",
        "short_blurb": (
            "Dragon-Ball V is classic Pong in a sunlit forest clearing. Move your dragon paddle, keep rallies alive, "
            "and score three times to win. Eight hits in a row ignites the fireball. Always open."
        ),
        "guide_paragraphs": [
            (
                "Dragon-Ball V drops classic Pong into a Laughing Dragons forest glade. You control a dragon paddle "
                "on one side; the AI guards the other. The ball launches automatically and bounces off both paddles "
                "and the top and bottom walls. Move up and down with arrow keys on desktop or drag your paddle on "
                "touch screens. Send the ball past the AI to score; let it slip past you and the AI earns a point. "
                "First side to three wins the match — short sets keep rematches fast and friendly."
            ),
            (
                "Rally depth adds spice: after eight consecutive paddle hits without a point scored, the ball ignites "
                "into a fireball — faster travel and trickier angles. The counter resets when someone scores, so long "
                "volleys become intentional gambits rather than accidents. Win matches to unlock all eight dragon "
                "paddle colors, same palette as Flappy Dragon. Unlocked skins save in local browser storage across "
                "visits. Pick your color before each match from the selector screen."
            ),
            (
                "Always playable from the Games hub with no Terminal Trainer gate and no LOGIN code. "
                "Dragon-Ball V is a standalone arcade title for quick head-to-head energy against the computer. "
                "Progress — unlocked colors and optional match stats where tracked — persists locally; no account "
                "needed. Works on keyboard and touch; landscape orientation on phones gives the widest court view."
            ),
            (
                "Strategy: meet the ball with the paddle center for predictable returns; edge hits send sharper angles "
                "that punish slow AI recovery. When the fireball activates, soften your guard — small movements "
                "beat wild sliding. After you score, the serve angle shifts; anticipate center rebounds rather than "
                "chasing corners. The AI ramps slightly with longer rallies but never cheats through walls."
            ),
            (
                "Difficulty is moderate by default — suitable for kids who know arrow keys and adults nostalgic for "
                "living-room Pong. There is no separate Easy/Hard menu; challenge scales through fireball speed and "
                "your own reflex goals. Matches end at three points, so a full game takes under two minutes unless "
                "you pause for color swaps. Rematch instantly; no lives, no continues, just forest sunshine and "
                " bouncing dragons."
            ),
            (
                "Laughing Dragons paired Dragon-Ball V with Flappy Dragon as always-open reflex games — no codes "
                "for Memory Matching or Fruit Search here. Local saves mean family members sharing one browser may "
                "want to agree whose unlock colors count, or use separate profiles. However you play, the fireball "
                "eight-hit rule is the studio's wink at combo systems in bigger games: stay calm, keep rallying, "
                "and let the ball burn when it is ready."
            ),
        ],
    },
    "dragos-revenge": {
        "title": "Drago's Revenge",
        "short_lead": "Push blocks, trap knights, and collect dragon tiles as Drago the Dragon Fruit.",
        "short_blurb": (
            "Drago's Revenge is a Rodent's Revenge-style grid puzzle starring Drago the Dragon Fruit. "
            "Push green blocks to trap knights, grab pickups, and clear eight levels. Always open."
        ),
        "guide_paragraphs": [
            (
                "Drago's Revenge resurrects the classic push-blocks-trap-hunters formula with Fruit Friends charm. "
                "You are Drago the Dragon Fruit — not a generic tile — sliding one cell at a time across an olive "
                "game board with pink leaf walls. Green slidables sit in your path; push them into knights to pin "
                "those hunters against walls or other blocks. Trap every knight on a level and they convert into "
                "laughing-dragon tile pickups you can collect by walking over them. Clear all collectables to "
                "finish the stage and advance. Eight hand-built levels await, each with tighter knight patrols "
                "and trickier block geometry."
            ),
            (
                "Knights move on their own timer, independent of your steps, using eight-way pursuit paths — "
                "diagonals included — so they feel alive rather than turn-based statues. A block can shove an "
                "adjacent knight if the tile behind the knight is empty, enabling chain traps that would make "
                "Rodent's Revenge fans grin. You have three lives per run; lose them all and the run resets, "
                "though best scores persist locally. A countdown timer adds urgency on each level — plan fast, "
                "but think before you push."
            ),
            (
                "Pick Easy or Hard before starting: Easy slows knights to roughly three-quarters of a second per "
                "tile and grants thirty bonus seconds on the clock. Hard cranks knight speed to about a third of "
                "a second per tile with the standard timer — the authentic retro challenge. The game is always "
                "open from the Games hub; no Terminal LOGIN required and no unlock codes feed the wider chain. "
                "Standalone puzzle glory, Laughing Dragons style."
            ),
            (
                "Tactical tips: never push a block into a corner you still need unless a knight is pinned there. "
                "Lure knights into narrow corridors before sliding the killing block. Because knights move while "
                "you think, bait them toward a wall, step aside, then push from the flank. Cluster trapping converts "
                "multiple knights simultaneously when the geometry aligns — watch for those batch conversions to "
                "save timer seconds. Collect every dragon tile before exiting; leftover pickups mean the level is "
                "not actually clear."
            ),
            (
                "Difficulty climbs through level layout, knight count, and mode choice rather than procedural "
                "generation — each stage is authored. Early levels teach push mechanics with one or two hunters; "
                "later ones demand multi-block setups and diagonal awareness. Three lives mean reckless pushes "
                "hurt, but the game is generous about letting you learn patterns on repeat attempts. "
                "Scores and best runs save in browser localStorage."
            ),
            (
                "Drago's Revenge targets retro puzzle fans and parents who remember Windows 3.x grid games. "
                "Art pulls from the studio Drago sprite set: green slidables, olive floors, memory-matching dragon "
                "tiles as collectables. No online leaderboard — compete with household high scores on the same "
                "machine. When the eighth level falls, celebrate Drago's victory lap and shuffle back to level one "
                "for a faster clear time. Always open, always local, always one more knight to trap."
            ),
        ],
    },
    "terminal": {
        "title": "Terminal Trainer",
        "short_lead": "Retro DOS commands on a workroom CRT — HELP, DIR, CD, TYPE, and LOGIN across three levels.",
        "short_blurb": (
            "Terminal Trainer puts you at a glowing CRT on the Laughing Dragons desk. "
            "Type real command-line basics across three hacking-themed levels. "
            "Beat Level 3 to unlock Memory Matching and earn FORGE-GATE-7 plus DragonForge15."
        ),
        "guide_paragraphs": [
            (
                "Terminal Trainer is Laughing Dragons love letter to the A:\\> era. An intro video sets the scene — "
                "you are at a workroom desk facing a humming CRT — then the prompt awaits your input. Type commands "
                "exactly as you would on a classic DOS shell: HELP lists available tools, DIR shows folder contents, "
                "CD moves between directories, TYPE reads text files, and LOGIN attempts passwords or game unlock codes. "
                "Tab autocompletes commands; a sidebar offers hints when you are stuck. Three levels escalate from "
                "discovery to vault cracking, teaching real navigation skills wrapped in playful hacking fiction."
            ),
            (
                "Level one teaches exploration: scan SYSTEM folders, read NOTES files for clues, and learn how paths "
                "nest. Level two opens hidden MISSIONS with password-protected directories — combine clues from earlier "
                "reads to know what to TYPE and where to CD next. Level three is the true ending: finish the final "
                "objective with ECHO LAUGHING-DRAGONS and the monitor flashes YOU WIN. That moment triggers the reward "
                "flow that gates much of the Kids catalog."
            ),
            (
                "Victory grants two prizes: unlock code FORGE-GATE-7 for Memory Matching Game and store coupon "
                "DragonForge15 — fifteen percent off anything in the Laughing Dragons shop. Memory Matching unlocks "
                "automatically in local browser storage the instant Level 3 completes; you do not need to re-type the "
                "code unless you want practice. The win banner displays both rewards; the games hub card for Memory "
                "Matching flips from locked to playable on your next visit. Progress saves under ldp-terminal-trainer-v2 "
                "in localStorage, including levels beaten and commands discovered."
            ),
            (
                "LOGIN is the master key for the wider game chain. Any reward code earned from other Laughing Dragons "
                "titles works here — type LOGIN FORGE-GATE-7 after beating Terminal, or LOGIN FIND-WALDO-3 from "
                "Memory Matching, or codes from Count the Dragons, Typing Race, Hangman Lite, and Fruit Search. "
                "The terminal validates codes against the studio registry and grants hub unlocks without forcing you "
                "to replay games on a new browser. Cleared game cards also display codes for lookup."
            ),
            (
                "Difficulty is cognitive, not arcade: read carefully, take notes on paper if needed, and expect "
                "backtracking through directories. Younger players may need a co-pilot for spelling long filenames; "
                "older kids often speed-run once they internalize DIR and CD. There is no game-over timer on Level "
                "one; later levels add pressure through mission structure rather than countdown clocks. Mistyped "
                "commands simply return an error — experiment safely."
            ),
            (
                "Tips: read every file you TYPE; clues hide in plain text. Use DIR before CD so you know exact "
                "folder names — capitalization matters. When LOGIN prompts appear, remember codes use ALL-CAPS with "
                "hyphens, like FORGE-GATE-7. After winning, visit Memory Matching from the hub; your DragonForge15 "
                "coupon link resolves to the live shop. Terminal Trainer is the spine of the Laughing Dragons unlock "
                "tree — master it first, then fan out through matching, search, and typing adventures."
            ),
        ],
    },
    "memory-matching": {
        "title": "Memory Matching Game",
        "short_lead": "Flip dragon tiles on scenic maps, match every pair, and beat par for a better star rating.",
        "short_blurb": (
            "Memory Matching is concentration on Laughing Dragons map art. "
            "Flip two tiles per turn, clear the board, and finish at or under par to unlock Fruit Search. "
            "Requires beating Terminal Trainer first."
        ),
        "guide_paragraphs": [
            (
                "Memory Matching Game brings classic concentration to Laughing Dragons scenic map backgrounds. "
                "Tiles start face-down showing dragon card backs; each turn you flip two. Matching pair IDs stay "
                "revealed with a satisfying lock; mismatches flip back after a brief delay so you must remember "
                "positions. Clear every pair to win. The board uses laughing dragon tile art drawn from the same "
                "family as Drago's Revenge pickups — cohesive studio visuals across games."
            ),
            (
                "Choose Easy or Hard before dealing: Easy lays out four pairs — eight tiles on a compact grid — "
                "with par set at eight moves. Hard doubles to eight pairs — sixteen tiles — with par at sixteen moves. "
                "Finish at or under par for Standard rating or better and you earn stars plus the right to advance "
                "in the unlock chain. Beat par comfortably for higher star tiers. Move counts display live so you "
                "always know whether Fruit Search is within reach."
            ),
            (
                "Gating matters: Memory Matching stays locked until you complete all three levels of Terminal Trainer. "
                "Finish the true ending — ECHO LAUGHING-DRAGONS — and FORGE-GATE-7 grants access automatically via "
                "localStorage. You can also type LOGIN FORGE-GATE-7 in Terminal on a fresh browser if you already "
                "know the code. Without that unlock flag, the hub card shows locked with a link back to Terminal."
            ),
            (
                "Win at or under par and the victory overlay reveals FIND-WALDO-3. Take that code to Terminal Trainer "
                "with LOGIN FIND-WALDO-3 to unlock Fruit Search, or rely on the automatic hub grant when the game "
                "registers your par clear. The code persists on your cleared Memory Matching card for later lookup. "
                "Best scores and star ratings save locally in your browser — no account required."
            ),
            (
                "Strategy: on your first pass, flip tiles systematically to map the board without worrying about "
                "pairs — even failed mismatches teach locations. Once you see a pair member, prioritize finding its "
                "twin before exploring new tiles. On Hard, anchor corners first; edge tiles have fewer neighbors and "
                "are easier to track. Avoid random flipping when you already know two locations — deliberate moves "
                "beat par more reliably than luck."
            ),
            (
                "Difficulty splits cleanly between Easy and Hard pair counts; there is no timer pressure. "
                "Younger players can ignore par and simply enjoy clearing boards; par exists for unlock progression "
                "and replay challenge. Laughing Dragons designed Memory Matching as the bridge between Terminal's "
                "text puzzles and Fruit Search's visual scanning — success here proves you can hold spatial memory "
                "long enough for crowded I-Spy maps. Play again to chase three-star clears even after Fruit Search "
                "unlocks; local saves keep your best runs on the leaderboard of one."
            ),
        ],
    },
    "fruit-search": {
        "title": "Fruit Search",
        "short_lead": "I-Spy hidden-object maps — find the Fruit Friend named in the prompt before the crowd wins.",
        "short_blurb": (
            "Fruit Search is Where's-Waldo style hunting with the Fruit Friends A-Z cast. "
            "Scan busy maps, tap the right portrait, and clear five finds to win. "
            "Unlocks after Memory Matching at par; reward code TRACE-A-Z-4."
        ),
        "guide_paragraphs": [
            (
                "Fruit Search hides the Fruit Friends A-Z cast inside bustling illustrated maps and asks you to "
                "find exactly who the HUD names — Adam the Apple, Benjamin the Banana, or a letter-based clue like "
                "find the fruit that starts with M. Scan the scene, tap the matching portrait hitbox, and a correct "
                "find celebrates with score plus one before rolling the next target. Wrong taps earn a gentle "
                "try again without harsh penalties. After five successful finds, the round clears and you can replay "
                "or advance to another map. Scroll on mobile so edge sprites stay reachable."
            ),
            (
                "Unlock gating ties Fruit Search to Memory Matching: beat Memory Matching at or under par — "
                "Standard rating or better — and the hub card opens. Alternatively, type LOGIN FIND-WALDO-3 in "
                "Terminal Trainer if you earned that code from a par clear on another browser. Until unlocked, "
                "the games list shows a locked card pointing you to Memory Matching or Terminal. Once open, "
                "progress and cleared rounds save locally like every Laughing Dragons title."
            ),
            (
                "Clear a full round — five finds — and the victory screen displays reward code TRACE-A-Z-4. "
                "Head to Terminal Trainer and type LOGIN TRACE-A-Z-4 to grant Alphabet Trace when that game ships. "
                "The code also lives on your cleared Fruit Search card for later reference. Laughing Dragons keeps "
                "the unlock chain readable: Terminal opens Memory, Memory at par opens Fruit Search, Fruit Search "
                "feeds Alphabet Trace through the terminal."
            ),
            (
                "Difficulty tiers scale crowd density and sprite size: Easy maps use six to eight large characters "
                "on map one; Medium packs ten to fourteen medium sprites on map two; Hard crowds sixteen to twenty-two "
                "small portraits on map three. Prompt mode toggles between name hunts and letter hunts — letter mode "
                "rewards alphabet familiarity, name mode rewards character recognition. Pick the tier that matches "
                "your player's patience; Hard is genuinely busy."
            ),
            (
                "Search tips: read the HUD portrait before scanning — lock the target face in mind. Sweep left to "
                "right in horizontal bands rather than random jumping; I-Spy rewards systematic eyes. On Hard, ignore "
                "similar color blobs until you check silhouettes; banana yellow and lemon yellow diverge in shape. "
                "If the map scrolls, drag slowly so momentum does not overshoot targets. Two players can co-op with "
                "one caller and one tapper."
            ),
            (
                "Fruit Search shares map DNA with Count the Dragons — same crowded art style, different goal — "
                "so skills transfer between titles. No timer on finds; difficulty is purely visual clutter. "
                "Replay loops forever for road trips or classroom quiet time. Because saves are browser-local, "
                "each profile tracks its own unlock state and TRACE-A-Z-4 eligibility separately. "
                "Master the maps, earn your trace code, and keep the Fruit Friends saga rolling toward "
                "Alphabet Trace and beyond."
            ),
        ],
    },
}
