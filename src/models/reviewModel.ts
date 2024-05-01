import { Product, ProductSKU } from './productModels';
import { User } from './userModel';

export interface Review {
	_id?: string;
	content?: string;
	rate?: number;
	orderCode?: string;
	customer?: User | null;
	product?: Product | null;
	productSKU?: ProductSKU | null;
	images?: string[];
	createdAt?: string | Date;
}

export interface ReviewParams {
	offset?: string;
	limit?: string;
}
