export interface Customer {
	_id?: string;
	id?: string;
	name?: string;
	password?: string;
	email?: string;
	image?: string;
	birthday?: string | Date;
	address?: string;
	phoneNumber?: string;
}

export interface CustomerParams {
	offset?: string;
	limit?: string;
}
