interface DeleteAction {
	payload?: string;
	type?: string;
}

interface CreateAction<T> {
	payload?: T;
	type?: string;
}

interface ReponseState<T> {
	message?: string;
	data?: T;
}

export type { DeleteAction, CreateAction, ReponseState };
