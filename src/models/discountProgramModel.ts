export interface DiscountProgramProduct {
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
}

export interface DiscountProgramParams {
	offset?: string;
	limit?: string;
}
