import "./app.css";

import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { InteractiveView } from "./features/interactive-view";
import { SimpleView } from "./features/simple-view";

const container = document.getElementById("root")!;
const root = createRoot(container);

const page = container.dataset.page ?? "simple";

const pages: Record<string, ReactElement | undefined> = {
	interactive: <InteractiveView />,
	simple: <SimpleView />,
};

root.render(
	pages[page] ?? <div style={{ padding: 12 }}>Unknown page: {page}</div>
);
