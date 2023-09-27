interface DeleteAction {
	payload?: string;
	type?: string;
}

interface CreateAction<T> {
	payload?: T;
	type?: string;
}

export type { DeleteAction, CreateAction };
