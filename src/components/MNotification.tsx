import { NotificationModel } from '@/models/notificationModel';
import { notification } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect } from 'react';

interface MNotificationProps extends NotificationModel {
	isOpen?: boolean;
}

const MNotification = (props: MNotificationProps) => {
	const [api, contextHolder] = notification.useNotification();

	const router = useRouter();

	useEffect(() => {
		api.open({
			message: props.title,
			description: props.body,
			onClick: () => router.push(props.link as string),
		});
	}, [api, props.body, props.isOpen, props.link, props.title, router]);

	return <div>{contextHolder}</div>;
};

export default MNotification;
