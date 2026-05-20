# Independent Scroll Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement independent sidebar/content scrolling and a compact content-scoped topbar that appears after scrolling content down.

**Architecture:** Keep the app as a static HTML/CSS/JS site. Make `.content-panel` the scroll container, keep `.sidebar` as a sibling scroll container, and drive topbar/floating-header visibility from content scroll position.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing `marked`, `DOMPurify`, and Scalar scripts.

---

### Task 1: Add Compact Header Markup

**Files:**
- Modify: `docs/index.html`

- [ ] Insert a `.compact-topbar` inside `.content-panel` before `#content`.
- [ ] Include compact title text and duplicate tab buttons using existing `.tab-button` plus `data-view`.
- [ ] Keep all controls button-based and accessible with `aria-label`.

### Task 2: Convert Layout To Independent Scroll Containers

**Files:**
- Modify: `docs/styles.css`

- [ ] Set `body` to fixed viewport height and hide document-level overflow.
- [ ] Set `.layout` to a viewport-bound grid with explicit height.
- [ ] Set `.sidebar` and `.content-panel` to independent vertical scroll containers.
- [ ] Keep API reference height compatible with the new scroll container.
- [ ] Add `.compact-topbar` sticky styles and body state selectors.
- [ ] Adjust mobile layout to preserve usable sidebar height and content scrolling.

### Task 3: Wire Content Scroll State

**Files:**
- Modify: `docs/app.js`

- [ ] Query `.topbar`, `.content-panel`, and compact tab buttons through existing tab query.
- [ ] Add `syncTopbarVisibility()` to toggle `body.topbar-collapsed`.
- [ ] Attach scroll listener to `.content-panel`.
- [ ] Reset `.content-panel.scrollTop` when opening guide or market pages.
- [ ] Update anchor scrolling to target the content scroll container.

### Task 4: Verify

**Commands:**
- `npm test`
- Optional manual smoke: `npm run serve`, open local site, scroll content and sidebar separately.

**Expected:**
- Tests exit 0.
- Sidebar scroll position is not affected by content scrolling.
- Full topbar hides after content scroll threshold.
- Compact topbar appears inside content and keeps tab navigation working.
