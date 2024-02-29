export interface NotificationModel {
	_id?: string;
	image?: string;
	title?: string;
	body?: string;
	link?: string;
	fromUser?: string;
	toUser?: string;
	isRead?: boolean;
}

export interface NotificationParams {
	offset?: string;
	limit?: string;
}
