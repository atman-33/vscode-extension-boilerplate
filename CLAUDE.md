# vscode-extension-boilerplate

Boilerplate for VS Code extensions with a React 19 + Vite webview UI. The extension host code (`src/`, bundled by esbuild) and the webview UI (`webview-ui/`, a separate npm package bundled by Vite) are two distinct runtimes that communicate only via `postMessage`.

# Commands

- install: `npm run install:all` (installs root **and** `webview-ui/` — plain `npm install` is not enough)
- build: `npm run build` (esbuild extension → `dist/extension.js`, Vite webview → `dist/webview/app/`)
- test: `npm run test` (Vitest; `vscode` module is mocked via `tests/__mocks__/vscode.ts` alias)
- lint / format: `npm run check` / `npm run format` (ultracite = Biome preset)
- typecheck: `npx tsc --noEmit -p tsconfig.json && npx tsc --noEmit -p webview-ui/tsconfig.json`
- package: `npm run package` (`@vscode/vsce` → `.vsix`)
- debug: press `F5` (Extension Development Host, runs the `npm: compile` task first)

# Architecture Notes

- A command must be declared in **both** `package.json` (`contributes.commands`) and registered in `src/extension.ts`.
- Each webview view needs: a provider in `src/providers/`, a view entry in `package.json` (`contributes.views`), and a page entry in `webview-ui/src/index.tsx` (`pages` map keyed by `data-page`).
- The webview UI is a single-entry Vite build; pages are selected at runtime via the `data-page` attribute set in `src/utils/get-webview-content.ts`.

# Code Style

- Biome via ultracite, tab indent, double quotes. `webview-ui/src/components/ui/**` (shadcn/ui) and `*.svg` are excluded from lint.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).

# Workflow

- Husky pre-commit runs `biome check --staged --fix`.
- Releases are tag-driven via GitHub Actions — see `docs/release-process.md`. Never hand-edit `CHANGELOG.md` for the next release; the version-bump workflow generates it.

<important>
- Never edit anything under `dist/` — it is generated output.
- Node.js 22+ and VS Code 1.100+ are the supported baselines (`engines.vscode`, esbuild `--target=node20`).
- When renaming the extension from the boilerplate, update `name`, `displayName`, `publisher`, `repository` in `package.json` **and** the `vscode-extension-boilerplate.*` command/view IDs in both `package.json` and `src/`.
</important>
