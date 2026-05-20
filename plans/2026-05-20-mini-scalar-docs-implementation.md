# Mini Scalar Docs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development if subagents are available. This workspace is not a Git repository, so worktree and commit steps are not executable until Git is initialized.

**Goal:** Create a static Scalar-based Chinese Mini.Game API documentation site deployable from GitHub Pages.

**Architecture:** A static HTML/CSS/JS app reads generated page metadata and Markdown files. A Node crawler generates Markdown pages and an OpenAPI starter document from the Chinese GitBook sitemap.

**Tech Stack:** Node.js, static HTML/CSS/JS, Scalar API Reference CDN, Marked, DOMPurify.

---

## Task 1: Static Site Shell

**Files:**
- Create: `docs/index.html`
- Create: `docs/styles.css`
- Create: `docs/app.js`

- [ ] Create a two-pane documentation shell with top navigation.
- [ ] Load Scalar from CDN and mount it when the API Reference view is selected.
- [ ] Load Markdown pages from `docs/pages`.
- [ ] Add responsive layout for GitHub Pages use.

## Task 2: Content Fetch Script

**Files:**
- Create: `scripts/fetch-mini-docs.mjs`
- Create: `package.json`

- [ ] Read `https://docs.mini.game/cc/sitemap-pages.xml`.
- [ ] Exclude any URL containing `/cc/1`.
- [ ] Fetch each page independently.
- [ ] Extract the main content area.
- [ ] Convert extracted HTML to Markdown.
- [ ] Write `docs/pages/*.md` and `docs/site-data.json`.

## Task 3: OpenAPI Starter Generation

**Files:**
- Modify: `scripts/fetch-mini-docs.mjs`
- Create: `docs/openapi.yaml`

- [ ] Classify API-like pages from Chinese URL groups.
- [ ] Generate conservative OpenAPI tags and placeholder path entries.
- [ ] Include source page links in endpoint descriptions.
- [ ] Keep the file valid YAML.

## Task 4: Verification

**Commands:**
- `npm install`
- `npm run fetch`
- `node --check scripts/fetch-mini-docs.mjs`
- `npm run serve`

- [ ] Verify generated files exist.
- [ ] Verify `openapi.yaml` is parseable.
- [ ] Verify the static site responds locally.
