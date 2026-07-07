import sampleGif from "@/assets/sample.gif";

export const SimpleView = () => (
	<div className="px-3 py-0.5">
		<h1 className="font-semibold text-(--vscode-foreground) text-xl leading-tight">
			Simple View
		</h1>
		<p className="text-(--vscode-descriptionForeground,rgba(255,255,255,0.65)) text-sm">
			This is a simple WebView view.
		</p>
		<img
			alt="Animated sample preview"
			height="300"
			src={sampleGif}
			width="300"
		/>
	</div>
);
