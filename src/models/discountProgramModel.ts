export interface DiscountProgramProduct {
	index?: number | null;
	productCode?: string;
	productName?: string;
	price?: number;
	promotionPrice?: number;
	type?: string;
	value?: number;
}

export interface DiscountProgram {
	_id?: string;
	name?: string;
	products?: DiscountProgramProduct[];
	description?: string;
	dateStart?: string | Date;
	dateEnd?: string | Date;
	status?: string;
	date?: Date[];
}

export interface DiscountProgramParams {
	offset?: string;
	limit?: string;
}
