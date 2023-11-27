import { Product } from './productModels';

export interface Order {
	_id?: string;
	orderCode?: string;
	customerCode?: string;
	customerName?: string;
	customerAddress?: string;
	customerPhone?: string;
	products?: OrderProduct[] | null;
	note?: string;
	status?: string;
	totalProductPrice?: number;
	totalPrice?: number;
	totalPaid?: number;
	paymentMethod?: string;
	deliveryAddress?: string;
	deliveryDate?: Date | string;
	deliveryFee?: number;
	createdAt?: Date | string;
}

export interface OrderProduct {
	productCode?: string;
	productName?: string;
	productQuantity?: number;
	price?: number;
	quantity?: number;
	totalPrice?: number;
}

export interface OrderParams {
	offset?: string;
	limit?: string;
}
