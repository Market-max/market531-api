# Mini Scalar Docs Design

## Goal

Build a GitHub Pages friendly Chinese API documentation site for Mini.Game using Scalar for API reference rendering and static pages for guide content.

## Scope

- Source content: Chinese sitemap under `https://docs.mini.game/cc/sitemap-pages.xml`.
- Excluded content: English sitemap under `/cc/1`.
- Output target: static files under `docs/`, deployable by GitHub Pages.
- Authorization: user confirmed Mini.Game content ownership.

## Architecture

The site is a static documentation shell. `docs/index.html` loads local generated metadata, renders a left navigation, displays migrated Markdown pages, and mounts Scalar for `docs/openapi.yaml`.

Content generation is handled by `scripts/fetch-mini-docs.mjs`. The script reads the Chinese sitemap, fetches each page, extracts the main article body, converts it to Markdown, and writes page metadata to `docs/site-data.json`.

`docs/openapi.yaml` is generated as a structured starting point from API-like pages. It is intentionally conservative: pages are grouped and linked first, then endpoint details can be refined if the source pages expose stable method/path/schema data.

## Files

- `docs/index.html`: Static documentation app and Scalar integration.
- `docs/styles.css`: Site styling.
- `docs/app.js`: Client-side navigation, Markdown rendering, and Scalar mounting.
- `docs/site-data.json`: Generated page index.
- `docs/openapi.yaml`: Scalar OpenAPI entry point.
- `docs/pages/*.md`: Generated Chinese page content.
- `scripts/fetch-mini-docs.mjs`: Sitemap crawler and content generator.
- `package.json`: Local scripts and dependencies.

## Constraints

- No Git worktree was created because the current directory is not a Git repository.
- No commits are possible until the directory is initialized or moved into a Git repository.
- Generated content is limited to the current task directory and subdirectories.
