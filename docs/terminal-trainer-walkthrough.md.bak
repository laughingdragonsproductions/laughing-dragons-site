# Terminal Trainer — Walkthrough & Content Map

Dev reference for [Terminal Trainer](/kids/games/terminal/). Use this to see every page, file, folder, and the exact command path from intro to true ending.

---

## Site pages (where players land)

| URL | Repo path | Purpose |
|-----|-----------|---------|
| `/kids/` | [kids/index.html](../kids/index.html) | Kids hub — games section links here |
| `/kids/#games` | [assets/js/kids.js](../assets/js/kids.js) `games[]` | Game card grid |
| `/kids/games/terminal/` | [kids/games/terminal/index.html](../kids/games/terminal/index.html) | **Playable game** (intro video → desk → terminal) |
| `/kids/games/coming-soon/` | [kids/games/coming-soon/index.html](../kids/games/coming-soon/index.html) | Stub for other games |

**Local test:** `.\scripts\play-terminal.ps1` → `http://localhost:8080/kids/games/terminal/`

---

## Repo files (what to edit)

| What you want to change | File |
|-------------------------|------|
| Intro video | [assets/kids/games/terminal/newterminalvideo.mp4](../assets/kids/games/terminal/newterminalvideo.mp4) |
| Desk / monitor frame | [assets/kids/games/terminal/desk-monitor-frame.png](../assets/kids/games/terminal/desk-monitor-frame.png) |
| Monitor position on desk | [assets/css/terminal-game.css](../assets/css/terminal-game.css) — `--monitor-top/left/width/height` |
| All game logic, levels, filesystem | [assets/js/terminal-game.js](../assets/js/terminal-game.js) |
| Page shell, hints panel | [kids/games/terminal/index.html](../kids/games/terminal/index.html) |
| List on Kids hub | [assets/js/kids.js](../assets/js/kids.js) — `games[]` entry `terminal-trainer` |
| This map + tree image | [docs/terminal-trainer-walkthrough.md](terminal-trainer-walkthrough.md), [docs/terminal-trainer-game-tree.png](terminal-trainer-game-tree.png) |
| Sync video from PC | `.\scripts\copy-terminal-assets.ps1` |

---

## In-game UI layers

```
kids/games/terminal/index.html
├── #intro-stage          → intro video + Tap to start / Skip
├── #game-layout
│   ├── #desk-stage       → desk-monitor-frame.png
│   │   └── #monitor-viewport
│   │       ├── #terminal-status   → Level HUD
│   │       └── #terminal-game
│   │           ├── #terminal-screen   → command output
│   │           ├── #terminal-input      → command line
│   │           └── #command-list        → click shortcuts
│   └── #terminal-hints   → sidebar walkthrough text (#hint-walkthrough)
└── #replay-intro         → replay video
```

---

## A:\ filesystem (in-memory — edit in `buildFilesystem()`)

```
A:\
├── SYSTEM\                 ← all .EXE tools (Level 1 discovery)
│   ├── HELP.EXE  DIR.EXE  CLS.EXE  CD.EXE
│   ├── TYPE.EXE  READ.EXE  ECHO.EXE  REBOOT.EXE
│   └── LOGIN.EXE  EXIT.EXE
├── TOOLS\
│   └── SCANNER.TXT         → optional hint: DIR A SYSTEM
├── NOTES\
│   └── WELCOME.TXT         → Level 1 self-discovery clue
└── MISSIONS\               🔒 hidden until Level 1 fake-end secret unlock
    ├── LEVEL2.TXT          → points to VAULT\
    ├── VAULT\
    │   └── HINT.TXT        🔑 password FRUIT-42
    └── FINAL\              🔒 readable after Level 2 complete
        └── CLUE.TXT        🔑 passphrase LAUGHING-DRAGONS
```

**To add a folder or file:** edit `buildFilesystem()` in [terminal-game.js](../assets/js/terminal-game.js).

**To add Level 4+:** add folder under `MISSIONS\`, add mission object in `MISSIONS`, add `guidePhase` hints in `getGuideHint()`.

---

## Full player walkthrough (start → true ending)

Kid-friendly paths work: `CD A`, `CD A SYSTEM`, `DIR A`, Tab to autocomplete, ↑ for history.

### Phase 0 — Intro
| Step | Action | Result |
|------|--------|--------|
| 0 | Open `/kids/games/terminal/` | Intro video (Skip or Tap to start) |
| 0b | Skip / video ends | Terminal appears on desk monitor |

### Phase 1 — Tutorial (sidebar guides first two commands)
| Step | Type | Teaches |
|------|------|---------|
| 1 | `HELP` | Command list |
| 2 | `DIR` | See folders on `A:\` |

### Phase 2 — Level 1 “First Contact” (discovery)
Use **every** basic tool once. Sidebar lists what is still missing.

| Step | Type | Notes |
|------|------|-------|
| 3 | `DIR A SYSTEM` | See `.EXE` programs |
| 4 | `CLS` | Clear screen |
| 5 | `CD NOTES` | Change folder |
| 6 | `TYPE WELCOME.TXT` | Read clue file |
| 7 | `ECHO hello` | Print text |
| 8 | `REBOOT` | Restart terminal (progress kept) |

**Win condition:** all of HELP, DIR, CLS, CD, TYPE, ECHO, REBOOT used at least once.

| Step | What happens |
|------|----------------|
| 9 | Fake ending: `[THE END]` |
| 10 | ~4 sec or any key → secret unlock: `A:\MISSIONS\` appears |
| 11 | Cheat code shown: **DRAGON-ALPHA** (for optional `LOGIN` later) |

### Phase 3 — Level 2 “Locked Door”
| Step | Type | Notes |
|------|------|-------|
| 12 | `CD MISSIONS` | Enter missions folder |
| 13 | `TYPE LEVEL2.TXT` | Clue → look in VAULT |
| 14 | `CD VAULT` | |
| 15 | `TYPE HINT.TXT` | Password: **FRUIT-42** |
| 16 | `LOGIN FRUIT-42` | Level 2 complete → FINAL unlocked |

Optional: `LOGIN DRAGON-ALPHA` after step 11 gives a nudge toward VAULT.

### Phase 4 — Level 3 “Final Passphrase”
| Step | Type | Notes |
|------|------|-------|
| 17 | `CD FINAL` | (from `A:\MISSIONS\`) |
| 18 | `TYPE CLUE.TXT` | Passphrase instruction |
| 19 | `ECHO LAUGHING-DRAGONS` | **True ending** — game complete |

### After beat
- HUD shows **Complete**
- Progress saved in `localStorage` key `ldp-terminal-trainer-v2`
- `RESTART` or Restart button replays with progress kept

---

## Level gates (for adding content)

| Gate | Variable | When it opens |
|------|----------|----------------|
| MISSIONS folder in DIR | `secretUnlocked` | After Level 1 fake end + secret signal |
| VAULT / LEVEL2.TXT | `level1Complete` | Same as above |
| FINAL / CLUE.TXT content | `level2Complete` | After `LOGIN FRUIT-42` |
| Level 3 win | `level3Complete` | After `ECHO LAUGHING-DRAGONS` |

---

## Passwords & codes

| Code | Used for | Found in |
|------|----------|----------|
| DRAGON-ALPHA | Optional LOGIN hint | Unlocked at Level 1 complete |
| FRUIT-42 | LOGIN (Level 2 win) | `A:\MISSIONS\VAULT\HINT.TXT` |
| LAUGHING-DRAGONS | ECHO (Level 3 win) | `A:\MISSIONS\FINAL\CLUE.TXT` |

---

## Quick checklist (QA)

- [ ] Intro → desk → terminal
- [ ] HELP + DIR walkthrough
- [ ] All 7 Level 1 commands → fake END → MISSIONS unlock
- [ ] CD MISSIONS → TYPE files → LOGIN FRUIT-42
- [ ] CD FINAL → TYPE CLUE.TXT → ECHO LAUGHING-DRAGONS
- [ ] Tab / ↑ / `CD A` work
- [ ] Mobile fallback (no desk frame, terminal full width)

See also: [terminal-trainer-game-tree.png](terminal-trainer-game-tree.png) — visual map of the same path.
