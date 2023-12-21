interface ReponseDeleteSuccess {
	id?: string;
	message?: string;
}

interface PaginationModel {
	total?: number;
	offset?: number;
	limit?: number;
	page?: number;
}

export type { ReponseDeleteSuccess, PaginationModel };
