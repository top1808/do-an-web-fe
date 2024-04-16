import { ProductSKUOption } from './productModels';

export interface DiscountProgramProduct {
	index?: number | null;
	productCode?: string;
	productName?: string;
	price?: number;
	promotionPrice?: number;
	type?: string;
	value?: number;
	productSKUBarcode?: string;
	option1?: string;
	option2?: string;
	options?: ProductSKUOption[];
	productQuantity?: number;
	quantity?: number;
	totalPrice?: number;
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
