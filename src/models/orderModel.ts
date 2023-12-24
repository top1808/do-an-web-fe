import { Voucher } from './voucherModel';

export interface OrderStatusModel {
	status?: 'processing' | 'confirmed' | 'delivering' | 'delivered' | 'received' | 'canceled';
}
export interface Order extends OrderStatusModel {
	_id?: string;
	orderCode?: string;
	customerCode?: string;
	customerName?: string;
	customerAddress?: string;
	customerPhone?: string;
	products?: OrderProduct[] | null;
	note?: string;
	totalProductPrice?: number;
	totalPrice?: number;
	totalPaid?: number;
	paymentMethod?: string;
	deliveryAddress?: string;
	deliveryDate?: Date | string;
	deliveryFee?: number;
	voucher?: Voucher;
	voucherCode?: string;
	voucherDiscount?: number;
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

export interface PayloadChangeStatusOrder extends OrderStatusModel {
	id?: string;
	reason?: string;
}

export interface OrderParams {
	offset?: string;
	limit?: string;
}
