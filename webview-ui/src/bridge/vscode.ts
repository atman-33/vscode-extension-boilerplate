// Minimal wrapper around acquireVsCodeApi with a dev-friendly fallback

interface VsCodeApi {
	getState: () => any;
	postMessage: (message: any) => void;
	setState: (state: any) => void;
}

declare global {
	interface Window {
		acquireVsCodeApi?: () => VsCodeApi;
	}
}

const DEV_ECHO_TIMEOUT_MS = 50;

let vscodeApi: VsCodeApi;
if (
	typeof window !== "undefined" &&
	typeof window.acquireVsCodeApi === "function"
) {
	vscodeApi = window.acquireVsCodeApi!();
} else {
	// Local preview fallback (no-op postMessage)
	vscodeApi = {
		getState: () => ({}),
		postMessage: (msg: any) => {
			// Simulate echo in dev: bounce back the same message shape
			window.setTimeout(() => {
				window.dispatchEvent(
					new MessageEvent("message", {
						data: {
							id: msg.id,
							text: msg.text,
							ts: Date.now(),
							type: "codex.chat/echoResult",
						},
					})
				);
			}, DEV_ECHO_TIMEOUT_MS);
		},
		// In dev mode, state is not persisted
		setState: () => ({}),
	};
}

export const vscode = vscodeApi;
