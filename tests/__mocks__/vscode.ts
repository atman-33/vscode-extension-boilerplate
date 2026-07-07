const createDisposable = () => ({ dispose: () => undefined });

export const commands = {
	executeCommand: async () => undefined,
	registerCommand: () => createDisposable(),
};

export const window = {
	showInformationMessage: async () => undefined,
};

export const workspace = {
	getConfiguration: () => ({ get: () => undefined }),
};

export type Disposable = ReturnType<typeof createDisposable>;
