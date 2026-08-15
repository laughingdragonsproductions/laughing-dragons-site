# Fruit Search — Build plan (Dave)

## Files

| Path | Purpose |
|------|---------|
| `games/fruit-search/index.html` | Gate, landing, `#game-play` mount |
| `assets/js/fruit-search.js` | `initFruitSearch()` — map, spawns, click |
| `assets/css/fruit-search.css` | Map stage, sprites, HUD |
| `assets/kids/games/fruit-search/maps/` | map-1/2/3.png (sync from work folder) |
| `assets/kids/games/fruit-search/sprites/` | Character tiles |

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.isFruitSearchUnlocked?.()) {
  window.location.replace("/games/memory-matching/");
}
```

## Clear hook

On round clear (5 finds): `KIDS_UNLOCKS.markCleared("fruit-search")` — do not auto-grant alphabet-trace; kid uses Terminal LOGIN.

## v1 checklist

- [ ] Map + % positioned sprite hitboxes  
- [ ] Name + letter mode toggle  
- [ ] Correct / wrong feedback  
- [ ] Round clear overlay + reward code  
- [ ] Copy assets from work folder  

## Reference prototype

`G:\Laughing Dragons\Laughing-Dragons.com\Laughing dragons matching game\game.js`
