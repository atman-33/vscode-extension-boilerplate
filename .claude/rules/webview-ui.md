---
paths:
  - "webview-ui/**"
---
# Webview UI Rules

- This is a separate npm package — run npm commands inside `webview-ui/` (or via the root `*:webview` scripts). React 19, Vite, Tailwind CSS 4 (via `@tailwindcss/vite`, no tailwind.config file).
- No browser APIs from the extension side and no `vscode` imports here; talk to the extension only through `webview-ui/src/bridge/vscode.ts` (`vscode.postMessage`) and `window.addEventListener("message", ...)`.
- Message commands are namespaced strings like `"interactive-view.sendMessage"` — keep the `<view>.<action>` convention.
- Style with VS Code theme variables (`var(--vscode-foreground)` etc.) so the UI follows the user's theme; always provide a fallback color for non-VS Code preview.
- New view/page: add a component under `webview-ui/src/features/<name>/`, register it in the `pages` map in `webview-ui/src/index.tsx`, then create the matching provider on the extension side.
- shadcn/ui components live in `webview-ui/src/components/ui/` and are excluded from Biome lint — don't hand-edit them beyond what shadcn generates.
- Biome's `noJsxPropsBind` is enforced: no inline arrow functions in JSX props; wrap handlers in `useCallback`.
- Vite outputs to `../dist/webview/app` with fixed file names (`index.js`) because the extension references them statically — don't change `rollupOptions.output` naming.
