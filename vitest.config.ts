import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
	resolve: {
		alias: {
			vscode: path.resolve(import.meta.dirname, "tests/__mocks__/vscode.ts"),
		},
	},
	test: {
		coverage: { provider: "v8", reporter: ["text", "lcov", "html"] },
		environment: "node",
		include: ["tests/**/*.test.ts", "src/**/*.test.ts"],
		pool: "threads",
		setupFiles: ["./vitest.setup.ts"],
	},
});
