import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Single-entry build for all webviews. Pages are selected at runtime via
// the data-page attribute on #root and the pages map in src/index.tsx.
export default defineConfig({
	base: "./",
	build: {
		emptyOutDir: true,
		outDir: resolve(import.meta.dirname, "../dist/webview/app"),
		rollupOptions: {
			input: resolve(import.meta.dirname, "index.html"),
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "chunks/[name].js",
				entryFileNames: "index.js",
			},
		},
	},
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
		},
	},
});
