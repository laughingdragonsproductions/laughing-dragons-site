# Coloring Page Studio — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/coloring-viewer/index.html` | Gate + landing gallery + `#coloring-viewer-root` |
| `assets/js/coloring-viewer.js` | `initColoringViewer()` — gallery, editor, fill tracking, session, win |
| `assets/js/coloring-viewer-pages.js` | Page manifest: `id`, `title`, `svgUrl`, `thumbnail` |
| `assets/css/coloring-viewer.css` | Gallery, palette, SVG host, print |
| `assets/kids/games/coloring-viewer/*.svg` | 5 outline SVGs with `.color-region` paths |

## SVG contract

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <path class="color-region" data-region="cheek-left" d="…" fill="#fff" stroke="#222"/>
</svg>
```

All colorable shapes use class `color-region`. Inline SVG fetch + inject for DOM fill updates.

## Session state

```javascript
const session = {
  active: false,
  completedPageIds: new Set(),
  undoStacks: {}, // pageId → [{ regionId, prevFill }]
};
```

Persist partial fills in `sessionStorage` key `ldp-coloring-viewer-{pageId}`.

## Fill tracking

On each fill: count regions where `fill !== DEFAULT_FILL` → update `#cv-fill` percent.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("coloring-viewer-unlocked")) {
  window.location.replace("/games/maze-generator/");
}
```

## Clear hook

```javascript
if (session.completedPageIds.size >= 3) {
  window.KIDS_UNLOCKS.markCleared("coloring-viewer");
  showWinOverlay(null); // no reward code
}
```

No further unlock grant — terminal chain ends.

## v1 checklist

- [ ] Gate + initGameChrome gallery landing
- [ ] Page manifest + 5 SVG assets
- [ ] Gallery thumbnails + progress rings
- [ ] Editor load SVG inline
- [ ] Region tap → fill active color
- [ ] Palette + eraser + active swatch persistence
- [ ] Undo stack per page
- [ ] Clear with confirm
- [ ] 80% completion detection
- [ ] Studio Session 3-page tracking
- [ ] Free Color mode
- [ ] Print stylesheet
- [ ] Win overlay (chain complete message)

## Art

- SVG outlines required — black stroke 2px, white fills
- Thumbnails can be raster exports of empty SVG

## Out of scope v1

- Flood fill
- Export PNG download button
