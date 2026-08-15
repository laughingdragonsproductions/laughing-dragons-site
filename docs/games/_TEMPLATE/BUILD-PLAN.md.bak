# {Game Title} — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/{slug}/index.html` | Gate + landing + play mount |
| `assets/js/{slug}.js` | `init{Game}()` |
| `assets/css/{slug}.css` | Styles |

## Data

JSON shapes, localStorage keys.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("{requires-unlock-id}")) {
  window.location.replace("/games/");
}
```

## Clear hook

On win: `KIDS_UNLOCKS.markCleared("{slug}")` + grant next if designed.

## v1 checklist

- [ ] Menu / start
- [ ] Core mechanic playable
- [ ] Win screen + reward code display
- [ ] Mobile tap targets
