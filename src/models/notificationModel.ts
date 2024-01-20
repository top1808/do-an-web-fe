export interface NotificationModel {
	_id?: string;
	image?: string;
	title?: string;
	body?: string;
	link?: string;
	fromUser?: string;
	toUser?: string;
}

export interface NotificationParams {
	offset?: string;
	limit?: string;
}
