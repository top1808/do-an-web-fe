export interface User {
	_id?: string;
	id?: string;
	username?: string;
	password?: string;
	name?: string;
	email?: string;
	phone?: string;
	roleId?: string;
	image?: string;
	accessToken?: string;
}

export interface UserParams {
	offset?: string;
	limit?: string;
}
