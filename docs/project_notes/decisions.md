# Architecture Decision Records

## ADR-001: Convert all PNG images to JPEG

**Date**: 2026-02-09
**Status**: Accepted

**Context**: The images/ folder was 19MB after resizing to 800px max. All PNGs used Zip/deflate compression (PNG's only option) with no actual transparency despite some having alpha channels. Further PNG compression was not possible.

**Decision**: Convert all PNG images to JPEG at quality 85. Re-compress existing bucket hat JPGs to Q85 for consistency. Update all references in index.html, app.js, and styles.css.

**Consequences**:
- Images folder reduced from 19MB to 3.8MB (80% reduction)
- No transparency support — acceptable since none of the images used it
- All new product images must be added as `.jpg` (JPEG Q85, max 800px wide)
- Slightly lossy compression at Q85 — visually indistinguishable for product photos
