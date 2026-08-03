/**
 * Kids Terminal Trainer V2 — desk intro, walkthrough, history, fake ending
 */
(function () {
  const STORAGE_KEY = "ldp-terminal-trainer-v2";
  const INTRO_KEY = "ldp-terminal-intro-seen";

  const EXE_COMMANDS = [
    "HELP", "DIR", "CLS", "CD", "TYPE", "READ", "ECHO", "REBOOT", "LOGIN", "EXIT",
  ];

  const COMMAND_HELP = {
    HELP: { summary: "Lists available commands and usage.", usage: "HELP or HELP <command>", example: "HELP DIR" },
    DIR: { summary: "Displays list of files and folders at destination.", usage: "DIR or DIR <folder> or <drive path>", example: "DIR A:\\SYSTEM" },
    CD: { summary: "Changes the current directory.", usage: "CD <folder> or CD ..", example: "CD NOTES" },
    CLS: { summary: "Clears the terminal screen.", usage: "CLS", example: "CLS" },
    TYPE: { summary: "Displays the contents of a text file.", usage: "TYPE <filename>", example: "TYPE WELCOME.TXT" },
    READ: { summary: "Same as TYPE — displays a text file.", usage: "READ <filename>", example: "READ WELCOME.TXT" },
    ECHO: { summary: "Prints text to the screen.", usage: "ECHO <text>", example: "ECHO Hello!" },
    REBOOT: { summary: "Restarts the terminal session.", usage: "REBOOT", example: "REBOOT" },
    LOGIN: { summary: "Attempts to log in with a password.", usage: "LOGIN <password>", example: "LOGIN DRAGON-ALPHA" },
    EXIT: { summary: "Ends the current session.", usage: "EXIT", example: "EXIT" },
  };

  const WALKTHROUGH = [
    { after: "boot", sidebar: "Step 1: Type HELP and press Enter.", terminal: ">> Type HELP for commands, or CD MISSIONS to start your first mission." },
    { after: "HELP", sidebar: "Step 2: Type DIR and press Enter.", terminal: ">> Now try DIR to see folders on Drive A — including MISSIONS." },
    { after: "DIR", sidebar: "Try DIR A:\\MISSIONS or CD MISSIONS to start the mission.", terminal: ">> Explore A:\\MISSIONS\\ for your first mission." },
  ];

  const LEVEL1_COMMANDS = ["HELP", "DIR", "CLS", "CD", "TYPE", "ECHO", "REBOOT"];

  function normalizePath(path) {
    let p = path.trim().toUpperCase().replace(/\//g, "\\");
    if (/^[A-Z]:[^\\]/.test(p)) {
      p = p.replace(/^([A-Z]):/, "$1:\\");
    }
    if (!p.endsWith("\\") && !p.includes(".")) {
      if (p.endsWith(":")) p += "\\";
    }
    return p;
  }

  function isHiddenUnlockPath(path) {
    const norm = normalizePath(path).replace(/\\+$/, "");
    return norm === "A:\\DEV\\UNLOCKMATCH";
  }

  function grantHiddenDevUnlock() {
    if (window.KIDS_UNLOCKS?.grantHiddenDevUnlock) {
      window.KIDS_UNLOCKS.grantHiddenDevUnlock();
      return;
    }
    if (window.KIDS_UNLOCKS?.grantTerminalWin) {
      window.KIDS_UNLOCKS.grantTerminalWin();
      return;
    }
    try {
      localStorage.setItem("ldp-kids-unlock-terminal-trainer-complete", "1");
      localStorage.setItem("ldp-kids-unlock-memory-matching-unlocked", "1");
    } catch {
      /* ignore */
    }
  }

  const MISSIONS = {
    1: {
      id: 1,
      title: "First Contact",
      requiredCommands: ["HELP", "DIR", "CLS", "CD", "TYPE", "ECHO", "REBOOT"],
      cheatCode: "DRAGON-ALPHA",
      fakeEndMessage: [
        "",
        "CONNECTION CLOSED.",
        "You learned the basics. Well done.",
        "[THE END]",
        "",
      ],
      secretUnlockMessage: [
        "...",
        "Wait. Incoming signal detected.",
        "Hidden folder unlocked: A:\\MISSIONS\\",
        "CHEAT CODE UNLOCKED: DRAGON-ALPHA",
        "There is more. Nobody said you were finished.",
        "",
      ],
    },
    2: {
      id: 2,
      title: "Locked Door",
      password: "FRUIT-42",
      completeMessage: [
        "",
        "VAULT OPEN — LEVEL 2 COMPLETE",
        "New path live: A:\\MISSIONS\\FINAL\\",
        "",
      ],
    },
    3: {
      id: 3,
      title: "Final Passphrase",
      passphrase: "LAUGHING-DRAGONS",
      completeMessage: [
        "",
        "PASSPHRASE ACCEPTED — LEVEL 3 COMPLETE",
        "You beat the Terminal Trainer. Well done, hacker.",
        "",
        ">> REWARD CHANNEL OPEN — collect your prizes on screen.",
        "",
      ],
    },
  };

  function buildFilesystem() {
    const exes = {};
    EXE_COMMANDS.forEach((cmd) => {
      exes[`${cmd}.EXE`] = { type: "file", exe: cmd };
    });

    return {
      "A:\\": {
        type: "dir",
        children: {
          SYSTEM: { type: "dir", children: exes },
          TOOLS: {
            type: "dir",
            children: {
              "SCANNER.TXT": {
                type: "file",
                content: [
                  "SYSTEM SCANNER v1.0",
                  "All core tools are in A:\\SYSTEM\\",
                  "Try: DIR A:\\SYSTEM",
                ],
              },
            },
          },
          NOTES: {
            type: "dir",
            children: {
              "WELCOME.TXT": {
                type: "file",
                content: [
                  "WELCOME TO THE TERMINAL TRAINER",
                  "",
                  "Laughing Dragons workroom terminal — online.",
                  "",
                  "Your mission folder is open:",
                  "  A:\\MISSIONS\\",
                  "",
                  "Quick start:",
                  "  HELP   — list commands",
                  "  DIR    — list files and folders",
                  "  CD MISSIONS — enter the mission folder",
                  "  TYPE LEVEL2.TXT — read your first clue",
                  "",
                  "Good luck, operator.",
                ],
              },
            },
          },
          MISSIONS: {
            type: "dir",
            children: {
              "LEVEL2.TXT": {
                type: "file",
                content: [
                  "LEVEL 2 — LOCKED DOOR",
                  "",
                  "Search the vault for a password.",
                  "Look in A:\\MISSIONS\\VAULT\\",
                  "Then use LOGIN with what you find.",
                ],
              },
              VAULT: {
                type: "dir",
                children: {
                  "HINT.TXT": {
                    type: "file",
                    content: [
                      "VAULT ACCESS NOTE",
                      "Password for LOGIN: FRUIT-42",
                    ],
                  },
                },
              },
              FINAL: {
                type: "dir",
                children: {
                  "CLUE.TXT": {
                    type: "file",
                    content: [
                      "FINAL MISSION",
                      "",
                      "Speak the passphrase aloud, then type:",
                      "ECHO LAUGHING-DRAGONS",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  const FILESYSTEM = buildFilesystem();

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProgress();
      const data = JSON.parse(raw);
      return {
        level: data.level || 1,
        level1Complete: Boolean(data.level1Complete),
        level2Complete: Boolean(data.level2Complete),
        level3Complete: Boolean(data.level3Complete),
        secretUnlocked: true,
        fakeEndShown: Boolean(data.fakeEndShown),
        walkthroughComplete: Boolean(data.walkthroughComplete),
        walkthroughStep: data.walkthroughStep || 0,
        commandsUsed: new Set(data.commandsUsed || []),
        discoveredCommands: new Set(data.discoveredCommands || ["HELP", "DIR", "EXIT"]),
        sessionEnded: false,
      };
    } catch {
      return defaultProgress();
    }
  }

  function defaultProgress() {
    return {
      level: 1,
      level1Complete: false,
      level2Complete: false,
      level3Complete: false,
      secretUnlocked: true,
      fakeEndShown: false,
      walkthroughComplete: false,
      walkthroughStep: 0,
      commandsUsed: new Set(),
      discoveredCommands: new Set(["HELP", "DIR", "CD", "TYPE", "READ", "CLS", "ECHO", "REBOOT", "LOGIN", "EXIT"]),
      sessionEnded: false,
    };
  }

  function saveProgress(state) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        level: state.level,
        level1Complete: state.level1Complete,
        level2Complete: state.level2Complete,
        level3Complete: state.level3Complete,
        secretUnlocked: state.secretUnlocked,
        fakeEndShown: state.fakeEndShown,
        walkthroughComplete: state.walkthroughComplete,
        walkthroughStep: state.walkthroughStep,
        commandsUsed: [...state.commandsUsed],
        discoveredCommands: [...state.discoveredCommands],
      })
    );
  }

  function splitPath(path) {
    return normalizePath(path).split("\\").filter(Boolean);
  }

  function findChild(children, part) {
    if (!children) return null;
    if (children[part]) return children[part];
    const upper = part.toUpperCase();
    const key = Object.keys(children).find((k) => k.toUpperCase() === upper);
    return key ? children[key] : null;
  }

  function resolveNode(path, fs = FILESYSTEM) {
    const parts = splitPath(path);
    if (parts.length === 0) return null;

    let node = fs;
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === 0 && part.endsWith(":")) {
        currentPath = part + "\\";
        node = fs[currentPath];
        if (!node) return null;
        continue;
      }

      if (!node || node.type !== "dir" || !node.children) return null;
      node = findChild(node.children, part);
      currentPath += (currentPath.endsWith("\\") ? "" : "\\") + part.toUpperCase();
      if (i < parts.length - 1 && node && node.type === "dir") {
        currentPath += "\\";
      }
    }

    return node ? { node, path: normalizePath(currentPath) } : null;
  }

  function getPrompt(cwd) {
    return `${cwd}>`;
  }

  function joinPath(base, segment) {
    const seg = segment.trim();
    if (/^[A-Z]:/i.test(seg)) {
      return normalizePath(seg.endsWith("\\") ? seg : seg + (seg.includes("\\") ? "" : "\\"));
    }
    const baseNorm = normalizePath(base);
    if (seg === "..") {
      const parts = splitPath(baseNorm);
      if (parts.length <= 1) return parts[0] + "\\";
      parts.pop();
      return parts.join("\\") + "\\";
    }
    if (seg === ".") return baseNorm;
    const joined = baseNorm.replace(/\\$/, "") + "\\" + seg.toUpperCase();
    return normalizePath(joined);
  }

  /** Kid-friendly paths: CD A, DIR A SYSTEM, etc. */
  function resolveKidPath(args, cwd) {
    const raw = args.trim();
    if (!raw) return normalizePath(cwd);
    if (raw === "..") return joinPath(cwd, "..");
    if (raw === ".") return normalizePath(cwd);

    if (/^[A-Z]$/i.test(raw)) {
      const drivePath = `${raw.toUpperCase()}:\\`;
      if (FILESYSTEM[drivePath]) return drivePath;
      return joinPath(cwd, raw);
    }

    if (/^[A-Z]:\\?$/i.test(raw)) {
      return `${raw[0].toUpperCase()}:\\`;
    }

    const driveRest = raw.match(/^([A-Z])[:\\/\s]+(.+)$/i);
    if (driveRest) {
      let rest = driveRest[2].trim().replace(/\//g, "\\");
      if (!rest.includes("\\")) {
        rest = rest.split(/\s+/).join("\\");
      }
      return normalizePath(`${driveRest[1].toUpperCase()}:\\${rest}`);
    }

    if (/^[A-Z]:/i.test(raw)) {
      return normalizePath(raw);
    }

    return joinPath(cwd, raw);
  }

  function parsePathPrefix(partialArg, cwd) {
    const p = partialArg.replace(/\//g, "\\").trimEnd();
    let baseDir = cwd;
    let prefix = p;

    const driveSpace = p.match(/^([A-Z])\s+(.+)$/i);
    if (driveSpace) {
      baseDir = `${driveSpace[1].toUpperCase()}:\\`;
      const rest = driveSpace[2];
      if (rest.includes("\\")) {
        const segs = rest.split("\\");
        prefix = segs.pop() || "";
        if (segs.length) baseDir = joinPath(baseDir, segs.join("\\"));
      } else if (rest.includes(" ")) {
        const segs = rest.split(/\s+/);
        prefix = segs.pop() || "";
        if (segs.length) baseDir = joinPath(baseDir, segs.join("\\"));
      } else {
        prefix = rest;
      }
      return { baseDir: normalizePath(baseDir), prefix: prefix.toUpperCase() };
    }

    const driveOnly = p.match(/^([A-Z])\\?$/i);
    if (driveOnly) {
      const drivePath = `${driveOnly[1].toUpperCase()}:\\`;
      if (FILESYSTEM[drivePath]) {
        return { baseDir: drivePath, prefix: "" };
      }
    }

    const driveRest = p.match(/^([A-Z])[:\\](.*)$/i);
    if (driveRest) {
      baseDir = `${driveRest[1].toUpperCase()}:\\`;
      prefix = driveRest[2] || "";
    } else if (p.includes("\\")) {
      const segs = p.split("\\");
      prefix = segs.pop() || "";
      baseDir = segs.length ? joinPath(cwd, segs.join("\\")) : cwd;
    }

    return { baseDir: normalizePath(baseDir), prefix: prefix.toUpperCase() };
  }

  function getVisibleEntries(dirPath, st, dirsOnly) {
    const resolved = resolveNode(dirPath, FILESYSTEM);
    if (!resolved || resolved.node.type !== "dir") return [];

    let entries = Object.entries(resolved.node.children || {});
    if (dirsOnly) {
      entries = entries.filter(([, node]) => node.type === "dir");
    }
    return entries.map(([name]) => name).sort();
  }

  function initIntro(onReady) {
    const gameLayout = document.getElementById("game-layout");
    const video = document.getElementById("intro-video");
    const skipBtn = document.getElementById("intro-skip");
    const fallbackBtn = document.getElementById("intro-fallback");
    const replayBtn = document.getElementById("replay-intro");
    const hintsToggleBtn = document.getElementById("hints-panel-toggle");
    const monitorViewport = document.getElementById("monitor-viewport");
    const terminalHints = document.getElementById("terminal-hints");
    let gameStarted = false;

    function setHintsPanelOpen(open) {
      if (!terminalHints || !hintsToggleBtn) return;
      terminalHints.hidden = !open;
      hintsToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function closeHintsPanel() {
      setHintsPanelOpen(false);
    }

    function toggleHintsPanel() {
      if (!terminalHints) return;
      setHintsPanelOpen(terminalHints.hidden);
    }

    if (!gameLayout || !video || !monitorViewport) {
      onReady();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function showIntroMode() {
      gameLayout.classList.add("is-intro");
      gameLayout.classList.remove("is-playing");
      video.classList.remove("is-hidden");
      monitorViewport.classList.remove("is-revealed");
      monitorViewport.classList.add("monitor-viewport--hidden");
      if (terminalHints) closeHintsPanel();
      skipBtn.hidden = false;
      fallbackBtn.hidden = true;
      replayBtn.hidden = true;
      if (hintsToggleBtn) hintsToggleBtn.hidden = true;
    }

    function showGame() {
      video.pause();
      video.classList.add("is-hidden");
      gameLayout.classList.remove("is-intro");
      gameLayout.classList.add("is-playing");
      monitorViewport.classList.remove("monitor-viewport--hidden");
      monitorViewport.classList.add("is-revealed");
      if (terminalHints) closeHintsPanel();
      skipBtn.hidden = true;
      fallbackBtn.hidden = true;
      replayBtn.hidden = false;
      if (hintsToggleBtn) hintsToggleBtn.hidden = false;
      localStorage.setItem(INTRO_KEY, "1");
      if (!gameStarted) {
        gameStarted = true;
        onReady();
      }
    }

    function startAutoplay() {
      video.currentTime = 0;
      video.play().catch(() => {
        fallbackBtn.hidden = false;
      });
    }

    function onIntroEnded() {
      showGame();
    }

    skipBtn.addEventListener("click", showGame);
    fallbackBtn.addEventListener("click", () => {
      fallbackBtn.hidden = true;
      startAutoplay();
    });
    video.addEventListener("ended", onIntroEnded);

    replayBtn.addEventListener("click", () => {
      showIntroMode();
      startAutoplay();
    });

    if (hintsToggleBtn) {
      hintsToggleBtn.addEventListener("click", toggleHintsPanel);
    }

    if (reduceMotion.matches || localStorage.getItem(INTRO_KEY)) {
      video.classList.add("is-hidden");
      showGame();
      return;
    }

    showIntroMode();
    startAutoplay();
  }

  function createTerminalGame(root) {
    const screen = root.querySelector("#terminal-screen");
    const promptLabel = root.querySelector("#terminal-prompt-label");
    const input = root.querySelector("#terminal-input");
    const commandList = root.querySelector("#command-list");
    const statusEl = document.getElementById("terminal-status");
    const restartWrap = root.querySelector("#terminal-restart");
    const hintWalkthrough = document.getElementById("hint-walkthrough");
    const winBanner = document.getElementById("terminal-win-banner");
    const winPlayAgain = document.getElementById("win-play-again");
    const rewards = window.KIDS_REWARDS?.terminalTrainer || {
      gameUnlockCode: "FORGE-GATE-7",
      unlocksGameTitle: "Memory Matching Game",
      unlocksGameHref: "/kids/games/memory-matching/",
      couponCode: "DragonForge15",
      couponLabel: "15% off anything in-store",
      shopHref: "/shop/",
    };

    let cwd = "A:\\";
    let state = loadProgress();
    let rebooting = false;
    let commandHistory = [];
    let historyIndex = -1;
    let draftInput = "";
    let tabMatches = [];
    let tabMatchIndex = 0;
    let tabLastPrefix = "";

    function ensureMissionsOpen() {
      state.secretUnlocked = true;
      discoverCommand(state, "LOGIN");
    }

    function updateStatus() {
      if (state.level3Complete) {
        statusEl.textContent = "Complete";
        return;
      }
      const lvl = state.level3Complete ? 3 : state.level2Complete ? 3 : state.secretUnlocked ? 2 : 1;
      const mission = MISSIONS[lvl] || MISSIONS[1];
      statusEl.textContent = `Level ${lvl}: ${mission.title}`;
    }

    function getGuideHint() {
      if (state.level3Complete) {
        return "You won! Collect your game unlock and store coupon on the reward screen.";
      }
      if (state.level2Complete) {
        return "Level 3: CD FINAL → TYPE CLUE.TXT → ECHO LAUGHING-DRAGONS";
      }
      if (!state.walkthroughComplete) {
        const step = WALKTHROUGH[state.walkthroughStep];
        return step ? step.sidebar : "";
      }
      if (!state.level2Complete) {
        return "Level 2: CD MISSIONS → TYPE LEVEL2.TXT → CD VAULT → TYPE HINT.TXT → LOGIN FRUIT-42";
      }
      return "Type HELP to see commands. A:\\MISSIONS\\ is open — start there.";
    }

    function populateWinBanner() {
      if (!winBanner) return;
      const gameName = document.getElementById("win-unlock-game-name");
      const gameCode = document.getElementById("win-game-code");
      const couponLabel = document.getElementById("win-coupon-label");
      const couponCode = document.getElementById("win-coupon-code");
      const shopLink = document.getElementById("win-shop-link");
      const gameLink = document.getElementById("win-game-link");

      if (gameName) gameName.textContent = rewards.unlocksGameTitle;
      if (gameCode) gameCode.textContent = rewards.gameUnlockCode;
      if (couponLabel) couponLabel.textContent = rewards.couponLabel;
      if (couponCode) couponCode.textContent = rewards.couponCode;
      if (shopLink) shopLink.href = window.KIDS_REWARDS?.getShopUrl?.() || rewards.shopHref;
      if (gameLink) gameLink.href = rewards.unlocksGameHref;
    }

    function grantWinRewards() {
      if (window.KIDS_UNLOCKS?.grantTerminalWin) {
        window.KIDS_UNLOCKS.grantTerminalWin();
      }
    }

    function showWinBanner() {
      if (!winBanner) return;
      grantWinRewards();
      populateWinBanner();
      winBanner.hidden = false;
      input.disabled = true;
      updateWalkthroughHint();
    }

    function hideWinBanner() {
      if (!winBanner) return;
      winBanner.hidden = true;
      if (!state.sessionEnded) input.disabled = false;
    }

    function onGameComplete() {
      grantWinRewards();
      updateStatus();
      onProgressEvent();
      setTimeout(showWinBanner, 600);
    }

    function syncWinRewardsFromSave() {
      if (state.level3Complete) grantWinRewards();
    }

    function updateWalkthroughHint() {
      hintWalkthrough.textContent = getGuideHint();
    }

    function copyWinCode(targetId, btn) {
      const el = document.getElementById(targetId);
      if (!el) return;
      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const prev = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = prev;
        }, 1400);
      }).catch(() => {});
    }

    function advanceWalkthrough(cmd) {
      if (state.walkthroughComplete) return;

      if (state.walkthroughStep === 0 && cmd === "HELP") {
        state.walkthroughStep = 1;
        if (WALKTHROUGH[1].terminal) printLine(WALKTHROUGH[1].terminal, "dim");
      } else if (state.walkthroughStep === 1 && cmd === "DIR") {
        state.walkthroughStep = 2;
        state.walkthroughComplete = true;
        if (WALKTHROUGH[2].terminal) printLine(WALKTHROUGH[2].terminal, "dim");
      }
      saveProgress(state);
      updateWalkthroughHint();
    }

    function onProgressEvent() {
      updateWalkthroughHint();
    }

    function printLine(text, className = "output") {
      const p = document.createElement("p");
      p.className = `terminal-line ${className}`;
      p.textContent = text;
      screen.appendChild(p);
      screen.scrollTop = screen.scrollHeight;
    }

    function printLines(lines, className = "output") {
      lines.forEach((line) => printLine(line, className));
    }

    function clearScreen() {
      screen.innerHTML = "";
    }

    function renderCommandList() {
      const ordered = EXE_COMMANDS.filter((c) => state.discoveredCommands.has(c));
      commandList.innerHTML = ordered
        .map((cmd) => `<button type="button" class="command-btn" data-command="${cmd}">${cmd}</button>`)
        .join("");
    }

    function updatePrompt() {
      promptLabel.textContent = getPrompt(cwd);
    }

    function bootSequence(skipDelay) {
      clearScreen();
      rebooting = false;
      state.sessionEnded = false;
      restartWrap.hidden = true;
      hideWinBanner();
      cwd = "A:\\";
      updatePrompt();
      updateStatus();
      renderCommandList();
      updateWalkthroughHint();

      const lines = [
        "Laughing Dragons Terminal Trainer v2.0",
        "Welcome, operator.",
        "",
        "Logging into Drive A: .............. OK",
        "Mission channel: A:\\MISSIONS\\ .... LIVE",
        "",
        "Type HELP for commands — or CD MISSIONS to begin.",
        "",
      ];

      const finishBoot = () => {
        if (!state.walkthroughComplete && WALKTHROUGH[0].terminal) {
          printLine(WALKTHROUGH[0].terminal, "dim");
        }
        if (state.level3Complete) {
          showWinBanner();
        } else {
          focusInput();
        }
      };

      if (skipDelay) {
        printLines(lines);
        finishBoot();
        return;
      }

      let i = 0;
      function nextLine() {
        if (i < lines.length) {
          printLine(lines[i], i === 0 ? "success" : "output");
          i += 1;
          setTimeout(nextLine, 120);
        } else {
          finishBoot();
        }
      }
      nextLine();
    }

    function focusInput() {
      input.disabled = state.sessionEnded || rebooting;
      if (!input.disabled) input.focus();
    }

    function pushHistory(line) {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (commandHistory[commandHistory.length - 1] !== trimmed) {
        commandHistory.push(trimmed);
      }
      historyIndex = commandHistory.length;
      draftInput = "";
    }

    function discoverCommand(st, cmd) {
      if (COMMAND_HELP[cmd]) st.discoveredCommands.add(cmd);
      if (cmd === "READ") st.discoveredCommands.add("TYPE");
      if (cmd === "TYPE") st.discoveredCommands.add("READ");
    }

    function trackCommand(cmd) {
      const track = cmd === "READ" ? "TYPE" : cmd;
      if (LEVEL1_COMMANDS.includes(track)) {
        state.commandsUsed.add(track);
      }
      discoverCommand(state, cmd);
      advanceWalkthrough(cmd);
    }

    function parseInput(line) {
      const trimmed = line.trim();
      if (!trimmed) return { cmd: "", args: "" };

      const exeMatch = trimmed.match(/^([A-Z0-9_.\\:-]+)\.EXE(\s+(.*))?$/i);
      if (exeMatch) {
        return { cmd: exeMatch[1].toUpperCase(), args: (exeMatch[3] || "").trim(), raw: trimmed };
      }

      const space = trimmed.indexOf(" ");
      if (space === -1) return { cmd: trimmed.toUpperCase(), args: "", raw: trimmed };
      return { cmd: trimmed.slice(0, space).toUpperCase(), args: trimmed.slice(space + 1).trim(), raw: trimmed };
    }

    function missionsVisible() {
      return true;
    }

    function cmdHelp(args) {
      if (!args) {
        printLine("");
        printLine("Available commands:");
        EXE_COMMANDS.forEach((c) => {
          if (COMMAND_HELP[c]) printLine(`  ${c} — ${COMMAND_HELP[c].summary}`, "dim");
        });
        printLine("");
        printLine("Programs live in A:\\SYSTEM\\ as .EXE files.");
        printLine("Type HELP <command> for details.");
        return;
      }
      const key = args.split(/\s+/)[0].toUpperCase().replace(/\.EXE$/i, "");
      const info = COMMAND_HELP[key];
      if (!info) {
        printLine(`Help not available for ${args}`, "error");
        return;
      }
      printLine("");
      printLine(`${key}: ${info.summary}`);
      printLine(`Usage: ${info.usage}`);
      printLine(`Example: ${info.example}`);
    }

    function cmdDir(args) {
      let path = cwd;
      if (args) {
        path = resolveKidPath(args, cwd);
      }

      const result = listDirectory(path, state);
      if (result.error) {
        printLine(result.error, "error");
        return;
      }
      printLine(result.header);
      result.entries.forEach((entry) => {
        printLine(`  ${entry}`);
        const exeMatch = entry.match(/^([A-Z]+)\.EXE$/i);
        if (exeMatch) discoverCommand(state, exeMatch[1].toUpperCase());
      });
      saveProgress(state);
      renderCommandList();
    }

    function listDirectory(dirPath, st) {
      const resolved = resolveNode(dirPath, FILESYSTEM);
      if (!resolved) return { error: "Invalid path" };
      if (resolved.node.type !== "dir") return { error: "Not a directory" };

      let entries = Object.keys(resolved.node.children || {}).sort();
      if (!missionsVisible() && normalizePath(resolved.path) === "A:\\") {
        entries = entries.filter((e) => e !== "MISSIONS");
      }

      return { header: `\nDIRECTORY OF ${resolved.path}`, entries };
    }

    function cmdCd(args) {
      if (!args) {
        printLine(cwd);
        return;
      }
      const next = resolveKidPath(args, cwd);
      if (isHiddenUnlockPath(next)) {
        grantHiddenDevUnlock();
        return;
      }
      const resolved = resolveNode(next, FILESYSTEM);
      if (!resolved || resolved.node.type !== "dir") {
        printLine("Invalid directory", "error");
        return;
      }
      if (!missionsVisible() && next.includes("MISSIONS")) {
        printLine("Access denied. Hidden folder not yet unlocked.", "error");
        return;
      }
      cwd = resolved.path.endsWith("\\") ? resolved.path : resolved.path + "\\";
      updatePrompt();
      onProgressEvent();
    }

    function cmdType(args) {
      if (!args) {
        printLine("Required parameter missing", "error");
        return;
      }
      let filePath = resolveKidPath(args, cwd);

      if (filePath.includes("MISSIONS") && !missionsVisible()) {
        printLine("Access denied. Hidden folder not yet unlocked.", "error");
        return;
      }
      if (filePath.includes("VAULT\\HINT.TXT") && !state.level2Complete && !state.secretUnlocked) {
        printLine("[LOCKED — FIND MISSIONS FIRST]", "dim");
        return;
      }
      if (filePath.includes("FINAL\\CLUE.TXT") && !state.level2Complete) {
        printLine("[LOCKED — COMPLETE LEVEL 2 FIRST]", "dim");
        return;
      }

      const result = readFile(filePath);
      if (result.error) {
        printLine("File not found", "error");
        return;
      }
      if (result.exe) {
        executeCommand(result.exe, "");
        return;
      }
      printLine("");
      result.lines.forEach((l) => printLine(l));
      onProgressEvent();
    }

    function readFile(filePath) {
      const resolved = resolveNode(filePath, FILESYSTEM);
      if (!resolved) return { error: "File not found" };
      if (resolved.node.type === "file" && resolved.node.exe) {
        return { exe: resolved.node.exe };
      }
      if (resolved.node.type !== "file" || !resolved.node.content) {
        return { error: "File not found" };
      }
      return { lines: resolved.node.content };
    }

    function cmdEcho(args) {
      if (!args) {
        printLine("");
        return;
      }
      printLine(args);

      if (state.level2Complete && !state.level3Complete && args.toUpperCase() === MISSIONS[3].passphrase) {
        state.level3Complete = true;
        state.level = 3;
        saveProgress(state);
        printLines(MISSIONS[3].completeMessage, "success");
        onGameComplete();
      }
    }

    function cmdReboot() {
      saveProgress(state);
      renderCommandList();
      rebooting = true;
      printLine("");
      printLine("Rebooting...", "dim");
      input.disabled = true;
      setTimeout(() => bootSequence(true), 900);
    }

    function cmdLogin(args) {
      if (!args) {
        printLine("Usage: LOGIN <password>", "error");
        return;
      }
      const pass = args.toUpperCase();
      if (pass === MISSIONS[1].cheatCode && !state.level2Complete) {
        printLine("");
        printLine("Code accepted. Search A:\\MISSIONS\\VAULT\\ for the next password.", "success");
        return;
      }
      if (pass === MISSIONS[2].password && !state.level2Complete) {
        state.level2Complete = true;
        state.level = 3;
        saveProgress(state);
        printLines(MISSIONS[2].completeMessage, "success");
        updateStatus();
        printLine(">> Level 3: CD FINAL, then TYPE CLUE.TXT", "dim");
        onProgressEvent();
        return;
      }
      printLine("Access denied.", "error");
    }

    function cmdExit() {
      state.sessionEnded = true;
      input.disabled = true;
      printLine("");
      printLine("Session ended.", "dim");
      printLine("Type RESTART or click the button below to play again.", "dim");
      restartWrap.hidden = false;
    }

    function executeCommand(cmd, args) {
      if (state.sessionEnded && cmd !== "REBOOT") return;

      trackCommand(cmd);

      switch (cmd) {
        case "HELP": cmdHelp(args); break;
        case "DIR": cmdDir(args); break;
        case "CD": cmdCd(args); break;
        case "CLS": clearScreen(); break;
        case "TYPE":
        case "READ": cmdType(args); break;
        case "ECHO": cmdEcho(args); break;
        case "REBOOT": cmdReboot(); return;
        case "LOGIN": cmdLogin(args); break;
        case "EXIT": cmdExit(); break;
        default:
          printLine("Bad command or file name", "error");
          printLine("Type HELP for a list of commands.", "dim");
          return;
      }

      if (cmd !== "REBOOT" && cmd !== "CLS") {
        saveProgress(state);
        renderCommandList();
        updateStatus();
        onProgressEvent();
      } else if (cmd === "CLS") {
        saveProgress(state);
        onProgressEvent();
      }
    }

    function submitInput() {
      if (state.sessionEnded || rebooting) return;
      const line = input.value;
      if (!line.trim()) return;

      pushHistory(line);
      printLine(`${getPrompt(cwd)}${line}`, "input-echo");
      input.value = "";
      historyIndex = commandHistory.length;

      const { cmd, args } = parseInput(line);
      if (!cmd) return;

      if (cmd === "RESTART") {
        state = loadProgress();
        ensureMissionsOpen();
        bootSequence(true);
        return;
      }

      executeCommand(cmd, args);
      focusInput();
    }

    function handleHistoryKey(e) {
      if (commandHistory.length === 0) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex === commandHistory.length) {
          draftInput = input.value;
        }
        if (historyIndex > 0) {
          historyIndex -= 1;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex += 1;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = draftInput;
        }
      }
    }

    function getCommandCompletions(prefix) {
      const upper = prefix.toUpperCase();
      return EXE_COMMANDS.filter(
        (c) => state.discoveredCommands.has(c) && c.startsWith(upper)
      );
    }

    function getPathCompletions(partialArg, dirsOnly) {
      const { baseDir, prefix } = parsePathPrefix(partialArg, cwd);
      const entries = getVisibleEntries(baseDir, state, dirsOnly);
      const prefixWasEmpty = prefix === "";
      let matches;
      if (prefixWasEmpty) {
        matches = entries;
      } else {
        matches = entries.filter((name) => name.toUpperCase().startsWith(prefix));
      }
      return { baseDir, prefixWasEmpty, matches };
    }

    function buildPathCompletion(cmd, argPart, match, prefixWasEmpty) {
      const p = argPart.replace(/\//g, "\\");
      const driveSpace = p.match(/^([A-Z])\s+(.*)$/i);
      if (driveSpace) {
        const drive = driveSpace[1].toUpperCase();
        const rest = driveSpace[2] || "";
        if (rest.includes("\\")) {
          const segs = rest.split("\\");
          segs.pop();
          const base = segs.length ? `${drive}\\${segs.join("\\")}\\` : `${drive}\\`;
          return `${cmd} ${base}${match}`;
        }
        if (rest.includes(" ")) {
          const segs = rest.split(/\s+/);
          segs.pop();
          const base = segs.length ? `${drive} ${segs.join(" ")} ` : `${drive} `;
          return `${cmd} ${base}${match}`;
        }
        return `${cmd} ${drive} ${match}`;
      }
      const driveRest = p.match(/^([A-Z])[:\\](.*)$/i);
      if (driveRest) {
        const drive = driveRest[1].toUpperCase();
        const rest = driveRest[2] || "";
        if (rest.includes("\\")) {
          const segs = rest.split("\\");
          segs.pop();
          const base = segs.length ? `${drive}\\${segs.join("\\")}\\` : `${drive}\\`;
          return `${cmd} ${base}${match}`;
        }
        return `${cmd} ${drive}\\${match}`;
      }
      if (/^[A-Z]$/i.test(p.trim()) && prefixWasEmpty && FILESYSTEM[`${p.trim().toUpperCase()}:\\`]) {
        return `${cmd} ${p.trim().toUpperCase()} ${match}`;
      }
      if (p.includes("\\")) {
        const segs = p.split("\\");
        segs.pop();
        const base = segs.join("\\");
        return `${cmd} ${base}\\${match}`;
      }
      if (p.includes(" ")) {
        const segs = p.split(/\s+/);
        segs.pop();
        const base = segs.join(" ");
        return `${cmd} ${base} ${match}`;
      }
      return `${cmd} ${match}`;
    }

    function handleTabCompletion(e) {
      e.preventDefault();
      const line = input.value;
      const trimmed = line.trimEnd();

      if (!trimmed.includes(" ")) {
        const matches = getCommandCompletions(trimmed);
        if (matches.length === 0) return;

        if (tabLastPrefix === trimmed && tabMatches.length > 0) {
          tabMatchIndex = (tabMatchIndex + 1) % tabMatches.length;
        } else {
          tabMatches = matches;
          tabMatchIndex = 0;
          tabLastPrefix = trimmed;
        }
        input.value = tabMatches[tabMatchIndex];
        return;
      }

      const spaceIdx = trimmed.indexOf(" ");
      const cmd = trimmed.slice(0, spaceIdx).toUpperCase();
      const argPart = trimmed.slice(spaceIdx + 1);

      if (!["CD", "DIR", "TYPE", "READ", "HELP"].includes(cmd)) return;

      let matches = [];
      if (cmd === "HELP") {
        matches = getCommandCompletions(argPart);
        if (matches.length === 0) return;
        const completion = `${cmd} ${matches[0]}`;
        if (tabLastPrefix === trimmed && tabMatches.length > 0) {
          tabMatchIndex = (tabMatchIndex + 1) % tabMatches.length;
          input.value = `${cmd} ${tabMatches[tabMatchIndex]}`;
        } else {
          tabMatches = matches;
          tabMatchIndex = 0;
          tabLastPrefix = trimmed;
          input.value = `${cmd} ${matches[0]}`;
        }
        return;
      }

      const dirsOnly = cmd === "CD";
      const { prefixWasEmpty, matches: pathMatches } = getPathCompletions(argPart, dirsOnly);
      if (pathMatches.length === 0) return;

      if (tabLastPrefix === trimmed && tabMatches.length > 0) {
        tabMatchIndex = (tabMatchIndex + 1) % tabMatches.length;
      } else {
        tabMatches = pathMatches;
        tabMatchIndex = 0;
        tabLastPrefix = trimmed;
      }

      input.value = buildPathCompletion(cmd, argPart, tabMatches[tabMatchIndex], prefixWasEmpty);
    }

    commandList.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-command]");
      if (!btn || state.sessionEnded || rebooting) return;
      const cmd = btn.dataset.command;
      const zeroArg = ["HELP", "DIR", "CLS", "REBOOT", "EXIT"].includes(cmd);
      if (zeroArg) {
        input.value = cmd;
        submitInput();
      } else {
        input.value = cmd === "CD" ? "CD " : cmd === "ECHO" ? "ECHO " : `${cmd} `;
        focusInput();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        tabLastPrefix = "";
        submitInput();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        handleHistoryKey(e);
      } else if (e.key === "Tab") {
        handleTabCompletion(e);
      } else {
        tabLastPrefix = "";
      }
    });

    root.addEventListener("click", () => focusInput());

    restartWrap.querySelector("button").addEventListener("click", () => {
      state = loadProgress();
      state.sessionEnded = false;
      bootSequence(true);
    });

    if (winBanner) {
      winBanner.querySelectorAll("[data-copy-target]").forEach((btn) => {
        btn.addEventListener("click", () => copyWinCode(btn.dataset.copyTarget, btn));
      });
    }

    if (winPlayAgain) {
      winPlayAgain.addEventListener("click", () => {
        hideWinBanner();
        state = loadProgress();
        state.sessionEnded = false;
        bootSequence(true);
      });
    }

    syncWinRewardsFromSave();
    ensureMissionsOpen();
    saveProgress(state);
    populateWinBanner();
    bootSequence(false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIntro(() => {
      const root = document.getElementById("terminal-game");
      if (root) createTerminalGame(root);
    });
  });
})();
