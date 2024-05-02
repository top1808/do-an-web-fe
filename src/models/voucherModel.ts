export interface Voucher {
	_id?: string;
	code?: string;
	name?: string;
	type?: string;
	value?: number | null;
	quantity?: number | null;
	quantityUsed?: number | null;
	quantityLeft?: number | null;
	minOrderValue?: number | null;
	maxDiscountValue?: number | null;
	description?: string;
	dateStart?: string | Date;
	dateEnd?: string | Date;
	date?: Date[];
	status?: string;
}

export interface VoucherParams {
	offset?: string;
	limit?: string;
}
