import { ProductSKUOption } from './productModels';
import { Voucher } from './voucherModel';

export interface OrderStatusModel {
	status?: 'processing' | 'confirmed' | 'delivering' | 'delivered' | 'received' | 'canceled';
}

export interface Address {
	value?: string | number;
	label?: string;
}
export interface Order extends OrderStatusModel {
	_id?: string;
	orderCode?: string;
	customerCode?: string;
	customerName?: string;
	customerProvince?: Address;
	customerWard?: Address;
	customerDistrict?: Address;
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
	receivedDate?: Date | string;
	deliveryFee?: number;
	voucher?: Voucher;
	voucherCode?: string;
	voucherDiscount?: number;
	createdAt?: Date | string;
	date?: Date | string;
}

export interface OrderProduct {
	productCode?: string;
	productName?: string;
	productSKUBarcode?: string;
	option1?: string;
	option2?: string;
	options?: ProductSKUOption[];
	productQuantity?: number;
	price?: number;
	quantity?: number;
	totalPrice?: number;
}

export interface PayloadChangeStatusOrder extends OrderStatusModel {
	id?: string;
	body?: Order;
	reason?: string;
}

export interface OrderParams {
	offset?: string;
	limit?: string;
}
